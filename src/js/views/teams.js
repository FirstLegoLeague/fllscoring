define([
    'services/log',
    'services/ng-fs',
    'angular'
], function(log) {
    var moduleName = 'teams';

    var dummyTeams = [
        {
            "number": "19610",
            "name": "fringilla ornare placerat, orci"
        }, {
            "number": "48523",
            "name": "adipiscing non, luctus sit"
        }, {
            "number": "34970",
            "name": "erat nonummy ultricies ornare,"
        }, {
            "number": "35141",
            "name": "Cras vehicula aliquet libero."
        }, {
            "number": "48966",
            "name": "sagittis augue, eu tempor"
        }, {
            "number": "97768",
            "name": "Aliquam erat volutpat. Nulla"
        }, {
            "number": "22785",
            "name": "Aliquam ultrices iaculis odio."
        }, {
            "number": "39526",
            "name": "tempor arcu. Vestibulum ut"
        }, {
            "number": "00114",
            "name": "id risus quis diam"
        }, {
            "number": "69055",
            "name": "tincidunt congue turpis. In"
        }, {
            "number": "35411",
            "name": "pede. Cum sociis natoque"
        }, {
            "number": "04673",
            "name": "dictum eu, eleifend nec,"
        }, {
            "number": "86138",
            "name": "feugiat. Sed nec metus"
        }, {
            "number": "98800",
            "name": "massa. Quisque porttitor eros"
        }, {
            "number": "26231",
            "name": "lacus. Quisque imperdiet, erat"
        }, {
            "number": "05356",
            "name": "nisi. Cum sociis natoque"
        }, {
            "number": "86944",
            "name": "ad litora torquent per"
        }, {
            "number": "62876",
            "name": "nibh lacinia orci, consectetuer"
        }, {
            "number": "55535",
            "name": "massa non ante bibendum"
        }, {
            "number": "68282",
            "name": "nunc risus varius orci,"
        }, {
            "number": "63908",
            "name": "eu dui. Cum sociis"
        }, {
            "number": "57352",
            "name": "nunc interdum feugiat. Sed"
        }, {
            "number": "79067",
            "name": "consectetuer mauris id sapien."
        }, {
            "number": "32196",
            "name": "nulla vulputate dui, nec"
        }, {
            "number": "52671",
            "name": "purus. Nullam scelerisque neque"
        }, {
            "number": "28118",
            "name": "Quisque nonummy ipsum non"
        }, {
            "number": "84819",
            "name": "Donec fringilla. Donec feugiat"
        }, {
            "number": "97093",
            "name": "nulla vulputate dui, nec"
        }, {
            "number": "56076",
            "name": "erat, eget tincidunt dui"
        }, {
            "number": "51819",
            "name": "accumsan sed, facilisis vitae,"
        }, {
            "number": "91813",
            "name": "nunc interdum feugiat. Sed"
        }, {
            "number": "21113",
            "name": "dolor vitae dolor. Donec"
        }, {
            "number": "22831",
            "name": "eu, odio. Phasellus at"
        }, {
            "number": "07805",
            "name": "sit amet orci. Ut"
        }, {
            "number": "60651",
            "name": "Etiam gravida molestie arcu."
        }, {
            "number": "61653",
            "name": "consectetuer adipiscing elit. Aliquam"
        }, {
            "number": "25147",
            "name": "Duis elementum, dui quis"
        }, {
            "number": "69642",
            "name": "tempor lorem, eget mollis"
        }, {
            "number": "63643",
            "name": "consequat purus. Maecenas libero"
        }, {
            "number": "90156",
            "name": "Quisque ac libero nec"
        }, {
            "number": "02478",
            "name": "id nunc interdum feugiat."
        }, {
            "number": "71385",
            "name": "quam, elementum at, egestas"
        }, {
            "number": "31906",
            "name": "ad litora torquent per"
        }, {
            "number": "92556",
            "name": "eu, euismod ac, fermentum"
        }, {
            "number": "76091",
            "name": "venenatis lacus. Etiam bibendum"
        }, {
            "number": "22970",
            "name": "scelerisque scelerisque dui. Suspendisse"
        }, {
            "number": "57886",
            "name": "Nunc laoreet lectus quis"
        }, {
            "number": "80680",
            "name": "arcu. Vestibulum ante ipsum"
        }, {
            "number": "10475",
            "name": "feugiat metus sit amet"
        }, {
            "number": "63762",
            "name": "diam nunc, ullamcorper eu,"
        }, {
            "number": "35222",
            "name": "tempus risus. Donec egestas."
        }, {
            "number": "08086",
            "name": "Donec tincidunt. Donec vitae"
        }, {
            "number": "25794",
            "name": "pharetra, felis eget varius"
        }, {
            "number": "15852",
            "name": "sed leo. Cras vehicula"
        }, {
            "number": "69746",
            "name": "Quisque tincidunt pede ac"
        }, {
            "number": "49562",
            "name": "adipiscing, enim mi tempor"
        }, {
            "number": "92691",
            "name": "eu odio tristique pharetra."
        }, {
            "number": "74843",
            "name": "litora torquent per conubia"
        }, {
            "number": "24810",
            "name": "Nullam ut nisi a"
        }, {
            "number": "57021",
            "name": "montes, nascetur ridiculus mus."
        }, {
            "number": "35682",
            "name": "et risus. Quisque libero"
        }, {
            "number": "71141",
            "name": "ornare, facilisis eget, ipsum."
        }, {
            "number": "88762",
            "name": "nisi. Aenean eget metus."
        }, {
            "number": "95576",
            "name": "porttitor tellus non magna."
        }, {
            "number": "82285",
            "name": "Cras eu tellus eu"
        }, {
            "number": "48017",
            "name": "arcu. Vestibulum ante ipsum"
        }, {
            "number": "95319",
            "name": "nulla. Cras eu tellus"
        }, {
            "number": "47224",
            "name": "egestas nunc sed libero."
        }, {
            "number": "33181",
            "name": "felis eget varius ultrices,"
        }, {
            "number": "49077",
            "name": "mauris sapien, cursus in,"
        }, {
            "number": "12413",
            "name": "elementum sem, vitae aliquam"
        }, {
            "number": "43674",
            "name": "montes, nascetur ridiculus mus."
        }, {
            "number": "29442",
            "name": "at, libero. Morbi accumsan"
        }, {
            "number": "05213",
            "name": "Nulla tincidunt, neque vitae"
        }, {
            "number": "98305",
            "name": "eget metus. In nec"
        }, {
            "number": "67309",
            "name": "Aenean eget magna. Suspendisse"
        }, {
            "number": "13981",
            "name": "lorem ipsum sodales purus,"
        }, {
            "number": "53498",
            "name": "fermentum metus. Aenean sed"
        }, {
            "number": "88110",
            "name": "magna. Praesent interdum ligula"
        }, {
            "number": "50480",
            "name": "Curabitur sed tortor. Integer"
        }, {
            "number": "97727",
            "name": "arcu vel quam dignissim"
        }, {
            "number": "99098",
            "name": "sem, consequat nec, mollis"
        }, {
            "number": "33683",
            "name": "ipsum sodales purus, in"
        }, {
            "number": "41362",
            "name": "est. Nunc laoreet lectus"
        }, {
            "number": "28466",
            "name": "et ipsum cursus vestibulum."
        }, {
            "number": "66248",
            "name": "Pellentesque habitant morbi tristique"
        }, {
            "number": "18027",
            "name": "volutpat. Nulla facilisis. Suspendisse"
        }, {
            "number": "50219",
            "name": "molestie arcu. Sed eu"
        }, {
            "number": "53690",
            "name": "Sed et libero. Proin"
        }, {
            "number": "33780",
            "name": "Duis elementum, dui quis"
        }, {
            "number": "46071",
            "name": "in, dolor. Fusce feugiat."
        }, {
            "number": "73875",
            "name": "montes, nascetur ridiculus mus."
        }, {
            "number": "60681",
            "name": "Quisque fringilla euismod enim."
        }, {
            "number": "47917",
            "name": "nec, leo. Morbi neque"
        }, {
            "number": "01289",
            "name": "amet ornare lectus justo"
        }, {
            "number": "33940",
            "name": "Aenean massa. Integer vitae"
        }, {
            "number": "38416",
            "name": "Quisque purus sapien, gravida"
        }, {
            "number": "73032",
            "name": "ornare. In faucibus. Morbi"
        }, {
            "number": "86077",
            "name": "venenatis a, magna. Lorem"
        }, {
            "number": "78807",
            "name": "malesuada vel, convallis in,"
        }
    ];

    return angular.module(moduleName, []).config(['$httpProvider', function($httpProvider) {
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        }]).controller(moduleName + 'Ctrl', [
        '$scope','$fs','$http',
        function($scope,$fs,$http) {
            console.log($fs);

            log('init teams ctrl');
            $scope.log = log.get();
            $scope.teams = [];
            $scope.newTeam = {};
            $scope.editMode = false;
            $scope.teamNumberPattern = /\d+/;

            $fs.read('teams.json').then(function(teams) {
                $scope.status = '';
                $scope.teams = teams;
            },function() {
                log('error getting teams');
                $scope.status = 'No stored teams found, you may add them by hand';
                $scope.editMode = true;
            });

            $scope.load = function() {
                var url = 'http://fll.mobilesorcery.nl/api/public/teams/';
                $http.get(url).success(function(res) {
                    $scope.teams = res.map(function(team) {
                        return {
                            number: team.id,
                            name: team.name
                        };
                    });
                    $scope.saveTeams();
                });
            };

            $scope.addTeam = function() {
                $scope.teams.push(angular.copy($scope.newTeam));
                $scope.newTeam = {};
                $scope.saveTeams();
            };

            $scope.removeTeam = function(index) {
                $scope.teams.splice(index, 1);
                $scope.saveTeams();
            };

            $scope.saveTeams = function() {
                $scope.saving = true;
                return $fs.write('teams.json', $scope.teams).then(function() {
                    log('saved teams');
                },function() {
                    log('error writing teams');
                }).then(function() {
                    $scope.saving = false;
                });
            };
        }
    ]);
});
