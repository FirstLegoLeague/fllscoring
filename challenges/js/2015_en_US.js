{
    "title": "Trash Trek",
    "missions": [{
        "title": "Using recycled material",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Green Bins  containing at least one matching Yellow or Blue Bar, all  from the other team, is completely in your Safety.</li></ul>",
        "objectives": [{
            "id": "containers",
            "title": "Own containers",
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }],
            "type": "enum"
        }, {
            "id": "containers_other",
            "title": "Other teams' container",
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }],
            "type": "enum"
        }],
        "score": [function(containers) {
            if (containers === '0') {
                return 0
            }
            if (containers === '1') {
                return 60
            }
            if (containers === '2') {
                return 120
            }
        }, function(containers_other) {
            if (containers_other === '0') {
                return 0
            }
            if (containers_other === '1') {
                return 60
            }
            if (containers_other === '2') {
                return 120
            }
        }]
    }, {
        "title": "Methane",
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Methane is in the Truck’s engine compartment,  and/or the Factory’s Power Station.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/Exact nesting is not required.</li></ul>",
        "objectives": [{
            "id": "truck_factory",
            "title": "Methane in the Truck's engine or the Factory's Power Station",
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }],
            "type": "enum"
        }],
        "score": [function(truck_factory) {
            if (truck_factory === '0') {
                return 0
            }
            if (truck_factory === '1') {
                return 40
            }
            if (truck_factory === '2') {
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
        "description": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>BLACK BARS ARE (BARS SCORE INDEPENDENTLY)...:\n<ul><li>part of a scoring Flower Box, or in their original Setup position.</li><li>in their matching Green Bin, or in the Landfill Bin.</li><li>anywhere else.</li></ul></li></ul>\n<b>Method constraints or leniencies:</b><ul><li><b>METHOD CONSTRAINT:</b> Bars must only  enter Green Bins directly from the Sorter’s east chute or CAREERS BONUS.</li></ul>",
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
            "max": "8"
        }, {
            "id": "blackanywhere",
            "title": "Anywhere else (penalty)",
            "type": "number",
            "min": "0",
            "max": "12"
        }],
        "score": [function(inflowerbox, greenbinlandfill, blackanywhere) {
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '0' && blackanywhere === '12') {
                return -96
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '11') {
                return -85
            }
            if (inflowerbox === '0' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '10') {
                return -74
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '9') {
                return -63
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '8') {
                return -52
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '7') {
                return -41
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '6') {
                return -30
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '5') {
                return -19
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '4') {
                return -8
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '0' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '11') {
                return -80
            }
            if (inflowerbox === '1' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '10') {
                return -69
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '9') {
                return -58
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '8') {
                return -47
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '7') {
                return -36
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '6') {
                return -25
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '5') {
                return -14
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '4') {
                return -3
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '3') {
                return 8
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '1' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '10') {
                return -64
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '9') {
                return -53
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '8') {
                return -42
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '7') {
                return -31
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '6') {
                return -20
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '5') {
                return -9
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '4') {
                return 2
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '3') {
                return 13
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '2') {
                return 24
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '2' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '9') {
                return -48
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '8') {
                return -37
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '7') {
                return -26
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '6') {
                return -15
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '5') {
                return -4
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '4') {
                return 7
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '3') {
                return 18
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '2') {
                return 29
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '1') {
                return 40
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '3' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '8') {
                return -32
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '7') {
                return -21
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '6') {
                return -10
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '5') {
                return 1
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '4') {
                return 12
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '3') {
                return 23
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '2') {
                return 34
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '1') {
                return 45
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '0') {
                return 56
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '4' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '7') {
                return -16
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '6') {
                return -5
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '5') {
                return 6
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '4') {
                return 17
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '3') {
                return 28
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '2') {
                return 39
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '1') {
                return 50
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '0') {
                return 61
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '5' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '6') {
                return 0
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '5') {
                return 11
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '4') {
                return 22
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '3') {
                return 33
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '2') {
                return 44
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '1') {
                return 55
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '0') {
                return 66
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '6' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '5') {
                return 16
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '4') {
                return 27
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '3') {
                return 38
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '2') {
                return 49
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '1') {
                return 60
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '0') {
                return 71
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '7' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '4') {
                return 32
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '3') {
                return 43
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '2') {
                return 54
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '1') {
                return 65
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '0') {
                return 76
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '8' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '3') {
                return 48
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '2') {
                return 59
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '1') {
                return 70
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '0') {
                return 81
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '9' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '2') {
                return 64
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '1') {
                return 75
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '0') {
                return 86
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '10' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '1') {
                return 80
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '0') {
                return 91
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '11' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '0') {
                return 96
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '0' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '1' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '2' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '3' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '4' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '5' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '6' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '7' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '0') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '1') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '2') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '3') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '4') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '5') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '6') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '7') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '8') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '9') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '10') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '11') {
                return new Error("sortingblack-error")
            }
            if (inflowerbox === '12' && greenbinlandfill === '8' && blackanywhere === '12') {
                return new Error("sortingblack-error")
            }
        }]
    }, {
        "title": "Careers",
        "description": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\nAt least one Person is completely in the Sorter Area. <font color=\"red\"><b>VALUE:</b> 60 PLUS THIS R10  LENIENCY BONUS:   TEAM TECHNICIAN S AND/OR THE REF (IF NEEDED/ASKED) ARE ALLOWED TO UNCLOG ANY EAST CHUTE BLOCKAGE BY HAND, AND/OR PUT MIS-SORTED BARS INTO THEIR CORRECT BIN, INCLUDING BARS THAT DIDN’T LAND IN ANY BIN.</font></li></ul><p>This is a fun, dynamic Model with a small but real error rate, which will be well understood by Tournament season.  So that we may all enjoy the Model, please use the R10 leniency for Model errors, handle with care when doing so, use “Benefit Of The Doubt” for hand errors, and use common sense and good will the whole time.</p>",
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
        }],
        "score": [function(positioncar) {
            if (positioncar === 'engineinstalled') {
                return 65
            }
            if (positioncar === 'carfolded') {
                return 50
            }
            if (positioncar === 'none') {
                return 0
            }
        }]
    }, {
        "title": "Cleanup",
        "description": "<b>Specific physical requirement, visible at the end of the match (Score any that apply):</b><ul><li>Plastic Bags are completely in Safety.</li><li> (*) Animals are completely in large circles which are completely empty of Plastic Bags.</li><li>The Chicken is completely in the small  circle.</li></ul><p> (*) The fish Food Scrap doesn’t count as an Animal.</p>",
        "objectives": [{
            "id": "bags",
            "title": "Platic Bags completely in Safety",
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }],
            "type": "enum"
        }, {
            "id": "animals",
            "title": "Animals are completely in large circles which are empty of Plaic Bags",
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }, {
                "value": "3",
                "title": "3"
            }],
            "type": "enum"
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
            "title": "The Compost is...",
            "options": [{
                "value": "compostejectedsafety",
                "title": "in Safety"
            }, {
                "value": "compostejected",
                "title": "ejected, but not completely in safety."
            }, {
                "value": "none",
                "title": "not ejected"
            }],
            "type": "enum"
        }],
        "score": [function(compostejected) {
            if (compostejected === 'none') {
                return 0
            }
            if (compostejected === 'compostejected') {
                return 60
            }
            if (compostejected === 'compostejectedsafety') {
                return 80
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
            "options": [{
                "value": "0",
                "title": "0"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "2",
                "title": "2"
            }],
            "type": "enum"
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
        }],
        "score": [function(compostinpackage) {
            if (compostinpackage === 'yes') {
                return 40
            }
            if (compostinpackage === 'no') {
                return 0
            }
        }]
    }],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "usingrecycledmaterial-name": "Using recycled material",
        "usingrecycledmaterial-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Green Bins  containing at least one matching Yellow or Blue Bar, all  from the other team, is completely in your Safety.</li></ul>",
        "containers-desc": "Own containers",
        "containers-other-desc": "Other teams' container",
        "methane-name": "Methane",
        "methane-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>Methane is in the Truck’s engine compartment,  and/or the Factory’s Power Station.</li></ul><b>Method constraints or leniencies:</b><ul><li><b>LENIENCY:</b> Full/Exact nesting is not required.</li></ul>",
        "truck-factory-desc": "Methane in the Truck's engine or the Factory's Power Station",
        "transport-name": "Transport",
        "transport-desc": "<b>Specific physical requirement, visible at the end of the match (Score one or both):</b><ul><li>The Truck supports all of the Yellow Bin’s weight.</li><li>The Yellow Bin is completely east of the Truck’s Guide.</li></ul>",
        "trucksupport-desc": "Truck supports all of the Yellow Bin’s weight",
        "truckeast-desc": "The Yellow Bin is completely east of the Truck’s Guide",
        "sortingblueyellow-name": "Sorting yellow/blue bars",
        "sortingblueyellow-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>YELLOW/BLUE BARS ARE IN THEIR MATCHING GREEN BIN AND THE BIN (BINS SCORE INDEPENDENTLY) ...<ul><li> (*) Per Bin (See M01) is completely in the other team’s Safety, by way of your West Transfer.</li><li>is completely in your West Transfer Area and/or completely on your West Transfer.</li><li> (*) was never  completely in your West Transfer Area (all “Areas” are defined below).</li></ul></li></ul><b>Method constraints or leniencies:</b><ul><li><b>METHOD CONTRAINTS:</b> These require sequence/path as described, in addition to final positions.</li></ul>",
        "inwesttransfer-desc": "Bar in West Transfer Area",
        "anywhereelese-desc": "Never in West Transfer Area",
        "sortingblack-name": "Sorting black bars",
        "sortingblack-desc": "<b>Specific physical requirement, visible at the end of the match:</b><ul><li>BLACK BARS ARE (BARS SCORE INDEPENDENTLY)...:\n<ul><li>part of a scoring Flower Box, or in their original Setup position.</li><li>in their matching Green Bin, or in the Landfill Bin.</li><li>anywhere else.</li></ul></li></ul>\n<b>Method constraints or leniencies:</b><ul><li><b>METHOD CONSTRAINT:</b> Bars must only  enter Green Bins directly from the Sorter’s east chute or CAREERS BONUS.</li></ul>",
        "inflowerbox-desc": "Part of scoring Flower Box",
        "greenbinlandfill-desc": "In their matching Green Bin or in the Landfill Bin",
        "blackanywhere-desc": "Anywhere else (penalty)",
        "career-name": "Careers",
        "career-desc": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\nAt least one Person is completely in the Sorter Area. <font color=\"red\"><b>VALUE:</b> 60 PLUS THIS R10  LENIENCY BONUS:   TEAM TECHNICIAN S AND/OR THE REF (IF NEEDED/ASKED) ARE ALLOWED TO UNCLOG ANY EAST CHUTE BLOCKAGE BY HAND, AND/OR PUT MIS-SORTED BARS INTO THEIR CORRECT BIN, INCLUDING BARS THAT DIDN’T LAND IN ANY BIN.</font></li></ul><p>This is a fun, dynamic Model with a small but real error rate, which will be well understood by Tournament season.  So that we may all enjoy the Model, please use the R10 leniency for Model errors, handle with care when doing so, use “Benefit Of The Doubt” for hand errors, and use common sense and good will the whole time.</p>",
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
        "compostingmission-desc": "The Compost is...",
        "compostejected-desc": "ejected, but not completely in safety.",
        "compostejectedsafety-desc": "in Safety",
        "nonecompostejected-desc": "not ejected",
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
