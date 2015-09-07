{
    "title": "Trash Trek",
    "missions": [{
        "title": "Using recycled material",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Green Bins  containing at least one matching Yellow or Blue Bar, all  from the other team, is completely in your Safety.</li></ul>",
        "objectives": [{
            "id": "containersself",
            "title": "Own containers",
            "type": "number",
            "min": "0",
            "max": "3"
        }, {
            "id": "containersother",
            "title": "Other teams' container",
            "type": "number",
            "min": "0",
            "max": "3"
        }],
        "score": [function(containersself) {
            if (containersself === '0') {
                return 0
            }
            if (containersself === '1') {
                return 60
            }
            if (containersself === '2') {
                return 120
            }
            if (containersself === '3') {
                return 180
            }
        }, function(containersother) {
            if (containersother === '0') {
                return 0
            }
            if (containersother === '1') {
                return 60
            }
            if (containersother === '2') {
                return 120
            }
            if (containersother === '3') {
                return 180
            }
        }]
    }, {
        "title": "Methane",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Methane is in the Truck’s engine compartment,  and/or the Factory’s Power Station.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/Exact nesting is not required.</li></ul>",
        "objectives": [{
            "id": "truck",
            "title": "A methane is in the Truck's engine",
            "type": "yesno"
        }, {
            "id": "factory",
            "title": "A methane is in the Factory's Power Station",
            "type": "yesno"
        }],
        "score": [function(truck, factory) {
            if (truck === 'no' && factory === 'no') {
                return 0
            }
            if (truck === 'no' && factory === 'yes') {
                return 40
            }
            if (truck === 'yes' && factory === 'no') {
                return 40
            }
            if (truck === 'yes' && factory === 'yes') {
                return 80
            }
        }]
    }, {
        "title": "Transport",
        "description": "<b>Specific physical requirement, visible at the end of the match (Score one or both):</b><ul><li>The Truck supports all of the Yellow Bin’s weight.</li><li>The Yellow Bin is completely east of the Truck’s Guide.</li></ul>",
        "objectives": [{
            "id": "trucksupport",
            "title": "Truck supports all of the Yellow Bin’s weight",
            "type": "yesno"
        }, {
            "id": "truckeast",
            "title": "The Yellow Bin is completely east of the Truck’s Guide",
            "type": "yesno"
        }],
        "score": [function(trucksupport, truckeast) {
            if (trucksupport === 'no' && truckeast === 'no') {
                return 0
            }
            if (trucksupport === 'no' && truckeast === 'yes') {
                return 60
            }
            if (trucksupport === 'yes' && truckeast === 'no') {
                return 50
            }
            if (trucksupport === 'yes' && truckeast === 'yes') {
                return 110
            }
        }]
    }, {
        "title": "Sorting yellow/blue bars",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>YELLOW/BLUE BARS ARE IN THEIR MATCHING GREEN BIN AND THE BIN (BINS SCORE INDEPENDENTLY) ...<ul><li> (*) Per Bin (See M01) is completely in the other team’s Safety, by way of your West Transfer.</li><li>is completely in your West Transfer Area and/or completely on your West Transfer.</li><li> (*) was never  completely in your West Transfer Area (all “Areas” are defined below).</li></ul></li></ul><b>Method constraints or leniencies:</b><ul><li><b>METHOD CONTRAINTS:</b> These require sequence/path as described, in addition to final positions.</li></ul>",
        "objectives": [{
            "id": "inwesttransfer",
            "title": "Bar in West Transfer Area",
            "type": "number",
            "min": "0",
            "max": "15"
        }, {
            "id": "anywhereelese",
            "title": "Never in West Transfer Area",
            "type": "number",
            "min": "0",
            "max": "15"
        }],
        "score": [function(inwesttransfer) {
            if (inwesttransfer === '0') {
                return 0
            }
            if (inwesttransfer === '1') {
                return 7
            }
            if (inwesttransfer === '2') {
                return 14
            }
            if (inwesttransfer === '3') {
                return 21
            }
            if (inwesttransfer === '4') {
                return 28
            }
            if (inwesttransfer === '5') {
                return 35
            }
            if (inwesttransfer === '6') {
                return 42
            }
            if (inwesttransfer === '7') {
                return 49
            }
            if (inwesttransfer === '8') {
                return 56
            }
            if (inwesttransfer === '9') {
                return 63
            }
            if (inwesttransfer === '10') {
                return 70
            }
            if (inwesttransfer === '11') {
                return 77
            }
            if (inwesttransfer === '12') {
                return 84
            }
            if (inwesttransfer === '13') {
                return 91
            }
            if (inwesttransfer === '14') {
                return 98
            }
            if (inwesttransfer === '15') {
                return 105
            }
        }, function(anywhereelese) {
            if (anywhereelese === '0') {
                return 0
            }
            if (anywhereelese === '1') {
                return 6
            }
            if (anywhereelese === '2') {
                return 12
            }
            if (anywhereelese === '3') {
                return 18
            }
            if (anywhereelese === '4') {
                return 24
            }
            if (anywhereelese === '5') {
                return 30
            }
            if (anywhereelese === '6') {
                return 36
            }
            if (anywhereelese === '7') {
                return 42
            }
            if (anywhereelese === '8') {
                return 48
            }
            if (anywhereelese === '9') {
                return 54
            }
            if (anywhereelese === '10') {
                return 60
            }
            if (anywhereelese === '11') {
                return 66
            }
            if (anywhereelese === '12') {
                return 72
            }
            if (anywhereelese === '13') {
                return 78
            }
            if (anywhereelese === '14') {
                return 84
            }
            if (anywhereelese === '15') {
                return 90
            }
        }]
    }, {
        "title": "Sorting black bars",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>BLACK BARS ARE (BARS SCORE INDEPENDENTLY)...:\r\n<ul><li>part of a scoring Flower Box, or in their original Setup position.</li><li>in their matching Green Bin, or in the Landfill Bin.</li><li>anywhere else.</li></ul></li></ul>\r\n<b>Method constraints or leniencies:</b><ul><li><b>METHOD CONSTRAINT:</b> Bars must only  enter Green Bins directly from the Sorter’s east chute or CAREERS BONUS.</li></ul>",
        "objectives": [{
            "id": "inflowerbox",
            "title": "Part of scoring Flower Box",
            "type": "number",
            "min": "0",
            "max": "12"
        }, {
            "id": "greenbinlandfill",
            "title": "In their matching Green Bin or in the Landfill Bin",
            "type": "number",
            "min": "0",
            "max": "12"
        }, {
            "id": "blackanywhere",
            "title": "Anywhere else (penalty)",
            "type": "number",
            "min": "0",
            "max": "12"
        }],
        "score": [function(inflowerbox) {
            if (inflowerbox === '0') {
                return 0
            }
            if (inflowerbox === '1') {
                return 7
            }
            if (inflowerbox === '2') {
                return 14
            }
            if (inflowerbox === '3') {
                return 21
            }
            if (inflowerbox === '4') {
                return 28
            }
            if (inflowerbox === '5') {
                return 35
            }
            if (inflowerbox === '6') {
                return 42
            }
            if (inflowerbox === '7') {
                return 49
            }
            if (inflowerbox === '8') {
                return 56
            }
            if (inflowerbox === '9') {
                return 63
            }
            if (inflowerbox === '10') {
                return 70
            }
            if (inflowerbox === '11') {
                return 77
            }
            if (inflowerbox === '12') {
                return 84
            }
        }, function(greenbinlandfill) {
            if (greenbinlandfill === '0') {
                return 0
            }
            if (greenbinlandfill === '1') {
                return 6
            }
            if (greenbinlandfill === '2') {
                return 12
            }
            if (greenbinlandfill === '3') {
                return 18
            }
            if (greenbinlandfill === '4') {
                return 24
            }
            if (greenbinlandfill === '5') {
                return 30
            }
            if (greenbinlandfill === '6') {
                return 36
            }
            if (greenbinlandfill === '7') {
                return 42
            }
            if (greenbinlandfill === '8') {
                return 48
            }
            if (greenbinlandfill === '9') {
                return 54
            }
            if (greenbinlandfill === '10') {
                return 60
            }
            if (greenbinlandfill === '11') {
                return 66
            }
            if (greenbinlandfill === '12') {
                return 72
            }
        }, function(blackanywhere) {
            if (blackanywhere === '0') {
                return 0
            }
            if (blackanywhere === '1') {
                return -8
            }
            if (blackanywhere === '2') {
                return -16
            }
            if (blackanywhere === '3') {
                return -24
            }
            if (blackanywhere === '4') {
                return -32
            }
            if (blackanywhere === '5') {
                return -40
            }
            if (blackanywhere === '6') {
                return -48
            }
            if (blackanywhere === '7') {
                return -56
            }
            if (blackanywhere === '8') {
                return -64
            }
            if (blackanywhere === '9') {
                return -72
            }
            if (blackanywhere === '10') {
                return -80
            }
            if (blackanywhere === '11') {
                return -88
            }
            if (blackanywhere === '12') {
                return -96
            }
        }]
    }, {
        "title": "Careers",
        "description": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\r\nAt least one Person is completely in the Sorter Area. <font color=\"red\"><b>VALUE:</b> 60 PLUS THIS R10  LENIENCY BONUS:   TEAM TECHNICIAN S AND/OR THE REF (IF NEEDED/ASKED) ARE ALLOWED TO UNCLOG ANY EAST CHUTE BLOCKAGE BY HAND, AND/OR PUT MIS-SORTED BARS INTO THEIR CORRECT BIN, INCLUDING BARS THAT DIDN’T LAND IN ANY BIN.</font></li></ul><p>This is a fun, dynamic Model with a small but real error rate, which will be well understood by Tournament season.  So that we may all enjoy the Model, please use the R10 leniency for Model errors, handle with care when doing so, use “Benefit Of The Doubt” for hand errors, and use common sense and good will the whole time.</p>",
        "objectives": [{
            "id": "career",
            "title": "At least one Person is in the Sorter Area",
            "type": "yesno"
        }],
        "score": [function(career) {
            if (career === 'no') {
                return 0
            }
            if (career === 'yes') {
                return 60
            }
        }]
    }, {
        "title": "Scrap Cars",
        "description": "<b>Specific physical requirement, visible at the end of the match (Score only one way):</b><ul><li> (*) The Engine/Windshield unit is  installed in the unfolded Car in the proper space and direction</li><li>The Car is completely folded and completely in the East  Transfer Area.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/exact nesting is not required.</li><li><b>METHOD CONSTRAINT:</b> The Car must never cross into Safety, even partly.</li></ul>",
        "objectives": [{
            "id": "positioncar",
            "title": "The car is in the safety-zone",
            "options": [{
                "value": "engineinstalled",
                "title": "The engine is installed in the unfolded car in the proper space and direction"
            }, {
                "value": "carfolded",
                "title": "The car is completely folded and and completely in the East Transfer Area"
            }, {
                "value": "none",
                "title": "The car was never in the safety zone"
            }],
            "type": "enum"
        }, {
            "id": "scrapcarsyesno",
            "title": "The car is folded and in East Transfer Area",
            "type": "yesno"
        }],
        "score": [function(positioncar, scrapcarsyesno) {
            if (positioncar === 'engineinstalled' && scrapcarsyesno === 'no') {
                return 65
            }
            if (positioncar === 'engineinstalled' && scrapcarsyesno === 'yes') {
                return 0
            }
            if (positioncar === 'carfolded' && scrapcarsyesno === 'no') {
                return 50
            }
            if (positioncar === 'carfolded' && scrapcarsyesno === 'yes') {
                return 0
            }
            if (positioncar === 'none' && scrapcarsyesno === 'no') {
                return 0
            }
            if (positioncar === 'none' && scrapcarsyesno === 'yes') {
                return 0
            }
        }]
    }, {
        "title": "Cleanup",
        "description": "<b>Specific physical requirement, visible at the end of the match (Score any that apply):</b><ul><li>Plastic Bags are completely in Safety.</li><li> (*) Animals are completely in large circles which are completely empty of Plastic Bags.</li><li>The Chicken is completely in the small  circle.</li></ul><p> (*) The fish Food Scrap doesn’t count as an Animal.</p>",
        "objectives": [{
            "id": "bags",
            "title": "Platic Bags completely in Safety",
            "type": "number",
            "min": "0",
            "max": "2"
        }, {
            "id": "animals",
            "title": "Animals are completely in large circles which are empty of Plaic Bags",
            "type": "number",
            "min": "0",
            "max": "3"
        }, {
            "id": "chicken",
            "title": "The Chicken is completely in the small circle",
            "type": "yesno"
        }],
        "score": [function(bags) {
            if (bags === '0') {
                return 0
            }
            if (bags === '1') {
                return 30
            }
            if (bags === '2') {
                return 60
            }
        }, function(animals) {
            if (animals === '0') {
                return 0
            }
            if (animals === '1') {
                return 20
            }
            if (animals === '2') {
                return 40
            }
            if (animals === '3') {
                return 60
            }
        }, function(chicken) {
            if (chicken === 'yes') {
                return 35
            }
            if (chicken === 'no') {
                return 0
            }
        }]
    }, {
        "title": "Composting",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Compost is ejected, but not completely in Safety.</li><li>The Compost is completely in Safety.</li></ul>",
        "objectives": [{
            "id": "compostejected",
            "title": "The Compost is ejected, but not completely in safety.",
            "type": "yesno"
        }, {
            "id": "compostinsafety",
            "title": "The Compost is in Safety",
            "type": "yesno"
        }],
        "score": [function(compostejected, compostinsafety) {
            if (compostejected === 'yes' && compostinsafety === 'yes') {
                return 80
            }
            if (compostejected === 'no' && compostinsafety === 'yes') {
                return new Error("compost-error")
            }
            if (compostejected === 'yes' && compostinsafety === 'no') {
                return 60
            }
            if (compostejected === 'no' && compostinsafety === 'no') {
                return 0
            }
        }]
    }, {
        "title": "Salvage",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Valuables are completely in Safety.</li></ul>",
        "objectives": [{
            "id": "valuablesinsafety",
            "title": "The Valuables are completely in Safety",
            "type": "yesno"
        }],
        "score": [function(valuablesinsafety) {
            if (valuablesinsafety === 'yes') {
                return 60
            }
            if (valuablesinsafety === 'no') {
                return 0
            }
        }]
    }, {
        "title": "Demolition",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>None of the Building’s twelve beams is left standing in Setup position.</li></ul>",
        "objectives": [{
            "id": "nobeamsstanding",
            "title": "None of the Building’s twelve beams is left standing in Setup position",
            "type": "yesno"
        }],
        "score": [function(nobeamsstanding) {
            if (nobeamsstanding === 'yes') {
                return 85
            }
            if (nobeamsstanding === 'no') {
                return 0
            }
        }]
    }, {
        "title": "Purchasing descisions",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Toy Planes are completely in Safety.</li></ul>",
        "objectives": [{
            "id": "purchasing",
            "title": "Toy Planes are completely in Safety",
            "type": "number",
            "min": "0",
            "max": "2"
        }],
        "score": [function(purchasing) {
            if (purchasing === '0') {
                return 0
            }
            if (purchasing === '1') {
                return 40
            }
            if (purchasing === '2') {
                return 80
            }
        }]
    }, {
        "title": "Repurposing",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Compost is perfectly nested inside one of the Packages from which a Toy Plane has been removed.  The Package is in original condition.</li></ul>",
        "objectives": [{
            "id": "compostinpackage",
            "title": "The Compost is perfectly nested inside one of the Packages",
            "type": "yesno"
        }, {
            "id": "originalcondition",
            "title": "The Package is in original condition",
            "type": "yesno"
        }],
        "score": [function(compostinpackage, originalcondition) {
            if (compostinpackage === 'yes' && originalcondition === 'yes') {
                return 40
            }
            if (compostinpackage === 'no' && originalcondition === 'yes') {
                return 0
            }
            if (compostinpackage === 'yes' && originalcondition === 'no') {
                return 0
            }
            if (compostinpackage === 'no' && originalcondition === 'no') {
                return 0
            }
        }]
    }],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "usingrecycledmaterial-name": "Using recycled material",
        "usingrecycledmaterial-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Green Bins  containing at least one matching Yellow or Blue Bar, all  from the other team, is completely in your Safety.</li></ul>",
        "containersself-desc": "Own containers",
        "containersother-desc": "Other teams' container",
        "methane-name": "Methane",
        "methane-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Methane is in the Truck’s engine compartment,  and/or the Factory’s Power Station.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/Exact nesting is not required.</li></ul>",
        "truck-desc": "A methane is in the Truck's engine",
        "factory-desc": "A methane is in the Factory's Power Station",
        "transport-name": "Transport",
        "transport-desc": "<b>Specific physical requirement, visible at the end of the match (Score one or both):</b><ul><li>The Truck supports all of the Yellow Bin’s weight.</li><li>The Yellow Bin is completely east of the Truck’s Guide.</li></ul>",
        "trucksupport-desc": "Truck supports all of the Yellow Bin’s weight",
        "truckeast-desc": "The Yellow Bin is completely east of the Truck’s Guide",
        "sortingblueyellow-name": "Sorting yellow/blue bars",
        "sortingblueyellow-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>YELLOW/BLUE BARS ARE IN THEIR MATCHING GREEN BIN AND THE BIN (BINS SCORE INDEPENDENTLY) ...<ul><li> (*) Per Bin (See M01) is completely in the other team’s Safety, by way of your West Transfer.</li><li>is completely in your West Transfer Area and/or completely on your West Transfer.</li><li> (*) was never  completely in your West Transfer Area (all “Areas” are defined below).</li></ul></li></ul><b>Method constraints or leniencies:</b><ul><li><b>METHOD CONTRAINTS:</b> These require sequence/path as described, in addition to final positions.</li></ul>",
        "inwesttransfer-desc": "Bar in West Transfer Area",
        "anywhereelese-desc": "Never in West Transfer Area",
        "sortingblack-name": "Sorting black bars",
        "sortingblack-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>BLACK BARS ARE (BARS SCORE INDEPENDENTLY)...:\r\n<ul><li>part of a scoring Flower Box, or in their original Setup position.</li><li>in their matching Green Bin, or in the Landfill Bin.</li><li>anywhere else.</li></ul></li></ul>\r\n<b>Method constraints or leniencies:</b><ul><li><b>METHOD CONSTRAINT:</b> Bars must only  enter Green Bins directly from the Sorter’s east chute or CAREERS BONUS.</li></ul>",
        "inflowerbox-desc": "Part of scoring Flower Box",
        "greenbinlandfill-desc": "In their matching Green Bin or in the Landfill Bin",
        "blackanywhere-desc": "Anywhere else (penalty)",
        "career-name": "Careers",
        "career-desc": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\r\nAt least one Person is completely in the Sorter Area. <font color=\"red\"><b>VALUE:</b> 60 PLUS THIS R10  LENIENCY BONUS:   TEAM TECHNICIAN S AND/OR THE REF (IF NEEDED/ASKED) ARE ALLOWED TO UNCLOG ANY EAST CHUTE BLOCKAGE BY HAND, AND/OR PUT MIS-SORTED BARS INTO THEIR CORRECT BIN, INCLUDING BARS THAT DIDN’T LAND IN ANY BIN.</font></li></ul><p>This is a fun, dynamic Model with a small but real error rate, which will be well understood by Tournament season.  So that we may all enjoy the Model, please use the R10 leniency for Model errors, handle with care when doing so, use “Benefit Of The Doubt” for hand errors, and use common sense and good will the whole time.</p>",
        "careeryesno-desc": "At least one Person is in the Sorter Area",
        "scrapcars-name": "Scrap Cars",
        "scrapcars-desc": "<b>Specific physical requirement, visible at the end of the match (Score only one way):</b><ul><li> (*) The Engine/Windshield unit is  installed in the unfolded Car in the proper space and direction</li><li>The Car is completely folded and completely in the East  Transfer Area.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/exact nesting is not required.</li><li><b>METHOD CONSTRAINT:</b> The Car must never cross into Safety, even partly.</li></ul>",
        "positioncar-desc": "The car is in the safety-zone",
        "scrapcarsyesno-desc": "The car is folded and in East Transfer Area",
        "engineinstalled-desc": "The engine is installed in the unfolded car in the proper space and direction",
        "carfolded-desc": "The car is completely folded and and completely in the East Transfer Area",
        "nonecarscrap": "The car was never in the safety zone",
        "cleanup-name": "Cleanup",
        "cleanup-desc": "<b>Specific physical requirement, visible at the end of the match (Score any that apply):</b><ul><li>Plastic Bags are completely in Safety.</li><li> (*) Animals are completely in large circles which are completely empty of Plastic Bags.</li><li>The Chicken is completely in the small  circle.</li></ul><p> (*) The fish Food Scrap doesn’t count as an Animal.</p>",
        "bags-desc": "Platic Bags completely in Safety",
        "animals-desc": "Animals are completely in large circles which are empty of Plaic Bags",
        "chicken-desc": "The Chicken is completely in the small circle",
        "composting-name": "Composting",
        "composting-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Compost is ejected, but not completely in Safety.</li><li>The Compost is completely in Safety.</li></ul>",
        "compostejected-desc": "The Compost is ejected, but not completely in safety.",
        "compostinsafety-desc": "The Compost is in Safety",
        "salvage-name": "Salvage",
        "salvage-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Valuables are completely in Safety.</li></ul>",
        "valuablesinsafety-desc": "The Valuables are completely in Safety",
        "demolition-name": "Demolition",
        "demolition-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>None of the Building’s twelve beams is left standing in Setup position.</li></ul>",
        "nobeamsstanding-desc": "None of the Building’s twelve beams is left standing in Setup position",
        "purchase-name": "Purchasing descisions",
        "purchase-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Toy Planes are completely in Safety.</li></ul>",
        "purchasing-desc": "Toy Planes are completely in Safety",
        "repurposing-name": "Repurposing",
        "repurposing-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>The Compost is perfectly nested inside one of the Packages from which a Toy Plane has been removed.  The Package is in original condition.</li></ul>",
        "compostinpackage-desc": "The Compost is perfectly nested inside one of the Packages",
        "originalcondition-desc": "The Package is in original condition"
    }
}
