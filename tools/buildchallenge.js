var fs = require('fs');
var parse = require('xml2js').parseString;
var beautify = require('js-beautify').js_beautify;
var fn = process.argv[2];
var fnMap = {};
var strings;

processFile(fn);

function getString(key) {
    return strings[key]||key;
}

/* parse the case element */
function parseCondition(xml) {
    var obj = {
        values: xml['index-ref'].map(function(index) {
            return index.$.value;
        })
    };
    if (xml.points) {
        obj.points = xml.points[0].$.amount;
        obj.returnValue = obj.points;
    }
    if (xml.percentage) {
        obj.percentage = xml.percentage[0].$.amount;
        obj.returnValue = obj.percentage/100;
    }
    if (xml.error) {
        obj.error = getString(xml.error[0].$.message);
        obj.returnValue = 'new Error("'+jsEscape(obj.error)+'")';
    }
    return obj;
}

function parseScore(xml) {
    var deps = xml.indexes[0].index.map(function(index) {
        return jsName(index.$.objective);
    });
    var lines = xml.cases[0].case.map(parseCondition).map(function(line) {
        var conditions = line.values.map(function(value,index) {
            return deps[index] + ' === \'' + value + '\'';
        }).join(' && ');

        return 'if ('+conditions+') {return '+line.returnValue+'}';
    }).join('\n');
    var args = unique(deps).join(',');
    return 'function('+args+') {'+lines+'}';
}

function parseObjective(xml) {
    var obj = {};
    obj.id = jsName(xml.$.id);
    obj.title = getString(xml.$.description);
    if (xml.option) {
        obj.options = xml.option.map(function(opt) {
            return {
                value: jsName(opt.$.name),
                title: getString(opt.$.description)
            };
        });
    }
    if (obj.title.length===1) {obj.title = obj.title[0];}
    obj.type = xml.$.type;
    if (xml.$.min!==undefined) {obj.min = xml.$.min;}
    if (xml.$.max!==undefined) {obj.max = xml.$.max;}
    return obj;
}

function parseMission(xml,index) {
    var score = xml.score.map(parseScore);
    var scoreKey = '@@@'+index+'@@@';
    fnMap[scoreKey] = '['+score.join(',')+']';

    //only return elements starting with 'objective-''
    var objectives = Object.keys(xml).filter(function(key) {
        return (key.indexOf('objective-') === 0);
    }).reduce(function(all,key) {
        return all.concat(xml[key].map(function(objective) {
            objective.$.type = key.replace('objective-','');
            return objective;
        }));
    },[]);
    return {
        title: getString(xml.$.name),
        description: getString(xml.$.description),
        objectives: objectives.map(parseObjective),
        score: scoreKey
    };
}

function parseString(obj,xml) {
    obj[xml.$.id] = xml._.trim();
    return obj;
}

function jsEscape(str) {
    return JSON.stringify(str).replace(/^"|"$/g,'');
}

function jsName(str) {
    return str.replace(/[^0-9a-z$_]/gi,'_');
}

function unique(arr) {
    var map = {};
    arr.forEach(function(item) {
        map[item] = 1;
    });
    return Object.keys(map);
}

function toObj(arr,key) {
    var res = {};
    arr.forEach(function(item) {
        res[item[key]] = item;
        delete item[key];
    });
    return res;
}

function processFile(fn) {
    var xml = fs.readFileSync(fn,'utf8');
    parse(xml,function(err,def) {
        strings = def['fll:challenge'].strings[0].string.reduce(parseString,{});
    // console.log(strings);
    // return;
        var missions = def['fll:challenge'].mission;
        // console.log(missions);
        var jsm = {
            title: def['fll:challenge'].$.name,
            missions: missions.map(parseMission),
            strings: strings
        };
        var json = JSON.stringify(jsm,null,4);
        //replace funtion keys with actual function body
        json = json.replace(/"(@@@.*?@@@)"/g,function($0,$1) {
            return fnMap[$1];
        });

        //beautify
        json = beautify(json, { indent_size: 4 });
        console.log(json);
    return;

        // var fn = 'missions/'+def.fll.season[0].$.year+'.js';
        // fs.writeFileSync(fn,json);

        // console.log(json);
    });
}
