{
    "title": "HYDRO DYNAMICS",
    "missions": [{
        "title": "M01 Pipe Removal",
        "description": "Move the Broken Pipe so it is completely in Base.",
        "objectives": [{
            "id": "M01",
            "title": "Broken Pipe is completely in Base",
            "type": "yesno"
        }],
        "score": [function(M01) {
            if (M01 === 'no') {
                return 0
            }
            if (M01 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M02 Flow",
        "description": "Move a Big Water (one time maximum) to the other team’s field *only by turning the Pump System’s valve(s).",
        "objectives": [{
            "id": "M02",
            "title": "Big Water is on other team's Field (only by turning Pump System's valves(s))",
            "type": "yesno"
        }],
        "score": [function(M02) {
            if (M02 === 'no') {
                return 0
            }
            if (M02 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "M03 Pump Addition",
        "description": "Move the Pump Addition so it has contact with the mat and that contact is completely in the Pump Addition target.",
        "objectives": [{
            "id": "M03",
            "title": "Pump Addition has contact with the mat completely inside the target area",
            "type": "yesno"
        }],
        "score": [function(M03) {
            if (M03 === 'no') {
                return 0
            }
            if (M03 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M04 Rain",
        "description": "Make at least one Rain come out of the Rain Cloud.",
        "objectives": [{
            "id": "M04",
            "title": "At least one Rain is out of the Rain Cloud",
            "type": "yesno"
        }],
        "score": [function(M04) {
            if (M04 === 'no') {
                return 0
            }
            if (M04 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M05 Filter",
        "description": "Move the Filter north until the lock latch drops.",
        "objectives": [{
            "id": "M05",
            "title": "Lock latch is in dropped position",
            "type": "yesno"
        }],
        "score": [function(M05) {
            if (M05 === 'no') {
                return 0
            }
            if (M05 === 'yes') {
                return 30
            }
        }]
    }, {
        "title": "M06 Water Treatment",
        "description": "Make the Water Treatment model eject its Big Water, *only by moving the Toilet’s lever.",
        "objectives": [{
            "id": "M06",
            "title": "Big Water is ejected from Water Treatment model (only by Toilet's lever)",
            "type": "yesno"
        }],
        "score": [function(M06) {
            if (M06 === 'no') {
                return 0
            }
            if (M06 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M07 Fountain",
        "description": "Make the Fountain’s middle layer rise some obvious height and stay there, due only to a Big Water in the gray tub.",
        "objectives": [{
            "id": "M07",
            "title": "Middle layer is raised (due only to a Big Water in gray tub)",
            "type": "yesno"
        }],
        "score": [function(M07) {
            if (M07 === 'no') {
                return 0
            }
            if (M07 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M08 Manhole Covers",
        "description": "Flip Manhole cover(s) over, obviously past vertical *without it/them ever reaching Base.",
        "objectives": [{
            "id": "M08_1",
            "title": "Manhole cover(s) that are flipped over past vertical (and never reached Base)",
            "options": [{
                "value": "2",
                "title": "2"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "0",
                "title": "0"
            }],
            "type": "enum"
        }, {
            "id": "M08_2",
            "title": "Both covers are flipped over and completely in separate Tripod targets",
            "type": "yesno"
        }],
        "score": [function(M08_1, M08_2) {
            if (M08_1 === '0' && M08_2 === 'no') {
                return 0
            }
            if (M08_1 === '1' && M08_2 === 'no') {
                return 15
            }
            if (M08_1 === '2' && M08_2 === 'no') {
                return 30
            }
            if (M08_1 === '0' && M08_2 === 'yes') {
                return 0
            }
            if (M08_1 === '1' && M08_2 === 'yes') {
                return 15
            }
            if (M08_1 === '2' && M08_2 === 'yes') {
                return 60
            }
        }]
    }, {
        "title": "M09 Tripod",
        "description": "Move the inspection camera Tripod.",
        "objectives": [{
            "id": "M09_1",
            "title": "All the Tripod’s feet are touching the mat",
            "type": "yesno"
        }, {
            "id": "M09_2",
            "title": "Tripod is partially in a Tripod target",
            "type": "yesno"
        }, {
            "id": "M09_3",
            "title": "OR Tripod is completely in a Tripod target",
            "type": "yesno"
        }],
        "score": [function(M09_1, M09_2, M09_3) {
            if (M09_1 === 'no' && M09_2 === 'no' && M09_3 === 'no') {
                return 0
            }
            if (M09_1 === 'no' && M09_2 === 'no' && M09_3 === 'yes') {
                return 0
            }
            if (M09_1 === 'no' && M09_2 === 'yes' && M09_3 === 'no') {
                return 0
            }
            if (M09_1 === 'no' && M09_2 === 'yes' && M09_3 === 'yes') {
                return new Error("Choose one of the two options")
            }
            if (M09_1 === 'yes' && M09_2 === 'no' && M09_3 === 'no') {
                return 0
            }
            if (M09_1 === 'yes' && M09_2 === 'no' && M09_3 === 'yes') {
                return 20
            }
            if (M09_1 === 'yes' && M09_2 === 'yes' && M09_3 === 'no') {
                return 15
            }
            if (M09_1 === 'yes' && M09_2 === 'yes' && M09_3 === 'yes') {
                return new Error("Choose one of the two options")
            }
        }]
    }, {
        "title": "M10 Pipe Replacement",
        "description": "Move a New Pipe so it is where the broken one started, in full/flat contact with the mat.",
        "objectives": [{
            "id": "M10_1",
            "title": "New Pipe is installed where Broken Pipe was",
            "type": "yesno"
        }, {
            "id": "M10_2",
            "title": "This New Pipe has full/flat contact with the mat",
            "type": "yesno"
        }],
        "score": [function(M10_1, M10_2) {
            if (M10_1 === 'no' && M10_2 === 'no') {
                return 0
            }
            if (M10_1 === 'no' && M10_2 === 'yes') {
                return 0
            }
            if (M10_1 === 'yes' && M10_2 === 'no') {
                return 0
            }
            if (M10_1 === 'yes' && M10_2 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M11 Pipe Construction",
        "description": "Move a New Pipe.",
        "objectives": [{
            "id": "M11_1",
            "title": "New Pipe has full/flat contact with the mat",
            "type": "yesno"
        }, {
            "id": "M11_2",
            "title": "This New Pipe is partially in its target",
            "type": "yesno"
        }, {
            "id": "M11_3",
            "title": "OR this New Pipe is completely in its target",
            "type": "yesno"
        }],
        "score": [function(M11_1, M11_2, M11_3) {
            if (M11_1 === 'no' && M11_2 === 'no' && M11_3 === 'no') {
                return 0
            }
            if (M11_1 === 'no' && M11_2 === 'no' && M11_3 === 'yes') {
                return 0
            }
            if (M11_1 === 'no' && M11_2 === 'yes' && M11_3 === 'no') {
                return 0
            }
            if (M11_1 === 'no' && M11_2 === 'yes' && M11_3 === 'yes') {
                return new Error("Choose one of the two options")
            }
            if (M11_1 === 'yes' && M11_2 === 'no' && M11_3 === 'no') {
                return 0
            }
            if (M11_1 === 'yes' && M11_2 === 'no' && M11_3 === 'yes') {
                return 20
            }
            if (M11_1 === 'yes' && M11_2 === 'yes' && M11_3 === 'no') {
                return 15
            }
            if (M11_1 === 'yes' && M11_2 === 'yes' && M11_3 === 'yes') {
                return new Error("Choose one of the two options")
            }
        }]
    }, {
        "title": "M12 Sludge",
        "description": "Move the Sludge so it is touching the visible wood of any of the six drawn garden boxes.",
        "objectives": [{
            "id": "M12",
            "title": "Sludge is touching the visible wood of a drawn garden box",
            "type": "yesno"
        }],
        "score": [function(M12) {
            if (M12 === 'no') {
                return 0
            }
            if (M12 === 'yes') {
                return 30
            }
        }]
    }, {
        "title": "M13 Flower",
        "description": "Make the Flower rise some obvious height and stay there, due only to a Big Water in the brown pot.",
        "objectives": [{
            "id": "M13_1",
            "title": "Flower is raised (due only to a Big Water in brown pot)",
            "type": "yesno"
        }, {
            "id": "M13_2",
            "title": "At least one rain is in the purple part, touching nothing but Flower model",
            "type": "yesno"
        }],
        "score": [function(M13_1, M13_2) {
            if (M13_1 === 'no' && M13_2 === 'no') {
                return 0
            }
            if (M13_1 === 'no' && M13_2 === 'yes') {
                return 0
            }
            if (M13_1 === 'yes' && M13_2 === 'no') {
                return 30
            }
            if (M13_1 === 'yes' && M13_2 === 'yes') {
                return 60
            }
        }]
    }, {
        "title": "M14 Water Well",
        "description": "Move the Water Well so it has contact with the mat.",
        "objectives": [{
            "id": "M14_1",
            "title": "Water Well has contact with the mat partially inside the target area",
            "type": "yesno"
        }, {
            "id": "M14_2",
            "title": "Water Well has contact with the mat completely inside the target area",
            "type": "yesno"
        }],
        "score": [function(M14_1, M14_2) {
            if (M14_1 === 'no' && M14_2 === 'no') {
                return 0
            }
            if (M14_1 === 'no' && M14_2 === 'yes') {
                return 25
            }
            if (M14_1 === 'yes' && M14_2 === 'no') {
                return 15
            }
            if (M14_1 === 'yes' && M14_2 === 'yes') {
                return new Error("Choose one of the two options")
            }
        }]
    }, {
        "title": "M15 Fire",
        "description": "ake the fire drop *only by making the Firetruck apply direct force to the House’s lever.",
        "objectives": [{
            "id": "M15",
            "title": "Fire is dropped (due only to Firetruck applying direct force to House’s lever)",
            "type": "yesno"
        }],
        "score": [function(M15) {
            if (M15 === 'no') {
                return 0
            }
            if (M15 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "M16 Water Collection",
        "description": "Move or catch Big Water and/or Rain water (one Rain maximum; no Dirty Water) so it is touching the mat in the Water Target, *without the target ever reaching the white Off-Limits Line shown below.  Water may be touching the target, and/or other water, but not be touching nor guided by anything else.  Each water model is scored as an individual.",
        "objectives": [{
            "id": "M16_1",
            "title": "Water Target is East of Off-Limits line (and never reached Off-Limit line)",
            "type": "yesno"
        }, {
            "id": "M16_2",
            "title": "At least one Rain is touching mat in Water Target",
            "type": "yesno"
        }, {
            "id": "M16_4",
            "title": "At least one pair of Big Waters are stacked in Water Target",
            "type": "yesno"
        }, {
            "id": "M16_3",
            "title": "Big Water touching mat in Water Target",
            "options": [{
                "value": "5",
                "title": "5"
            }, {
                "value": "4",
                "title": "4"
            }, {
                "value": "3",
                "title": "3"
            }, {
                "value": "2",
                "title": "2"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "0",
                "title": "0"
            }],
            "type": "enum"
        }],
        "score": [function(M16_1, M16_2, M16_3, M16_4) {
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'no') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'yes') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'no') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'yes') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'no') {
                return 30
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'yes') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'no') {
                return 40
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'yes') {
                return 70
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'no') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'yes') {
                return 80
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'no') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'yes') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'no') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'yes') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'no') {
                return 30
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'yes') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'no') {
                return 40
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'yes') {
                return 70
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'no') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'yes') {
                return 80
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'no') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'yes') {
                return 90
            }
        }]
    }, {
        "title": "M17 Slingshot",
        "description": "Move the Slingshot so it is completely in its target.",
        "objectives": [{
            "id": "M17_1",
            "title": "Slingshot is completely in the Slingshot target",
            "type": "yesno"
        }, {
            "id": "M17_2",
            "title": "Rain AND Dirty Water are completely in the Slingshot target",
            "type": "yesno"
        }],
        "score": [function(M17_1, M17_2) {
            if (M17_1 === 'no' && M17_2 === 'no') {
                return 0
            }
            if (M17_1 === 'no' && M17_2 === 'yes') {
                return 0
            }
            if (M17_1 === 'yes' && M17_2 === 'no') {
                return 20
            }
            if (M17_1 === 'yes' && M17_2 === 'yes') {
                return 35
            }
        }]
    }, {
        "title": "M18 Faucet",
        "description": "Make the water level obviously more blue than white as seen from above the cup, *only by turning the Faucet handle.",
        "objectives": [{
            "id": "M18",
            "title": "Water level is more blue than white (only by turning Faucet handle)",
            "type": "yesno"
        }],
        "score": [function(M18) {
            if (M18 === 'no') {
                return 0
            }
            if (M18 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "Penalties",
        "description": "Penalties given",
        "objectives": [{
            "id": "penalties",
            "title": "Number of Penalty discs in the white triangle area",
            "options": [{
                "value": "6",
                "title": "6"
            }, {
                "value": "5",
                "title": "5"
            }, {
                "value": "4",
                "title": "4"
            }, {
                "value": "3",
                "title": "3"
            }, {
                "value": "2",
                "title": "2"
            }, {
                "value": "1",
                "title": "1"
            }, {
                "value": "0",
                "title": "0"
            }],
            "type": "enum"
        }],
        "score": [function(penalties) {
            if (penalties === '0') {
                return 0
            }
            if (penalties === '1') {
                return -5
            }
            if (penalties === '2') {
                return -10
            }
            if (penalties === '3') {
                return -15
            }
            if (penalties === '4') {
                return -20
            }
            if (penalties === '5') {
                return -25
            }
            if (penalties === '6') {
                return -30
            }
        }]
    }],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "M01-name": "M01 Pipe Removal",
        "M01-desc": "Move the Broken Pipe so it is completely in Base.",
        "M01-scoring": "Broken Pipe is completely in Base",
        "M02-name": "M02 Flow",
        "M02-desc": "Move a Big Water (one time maximum) to the other team’s field *only by turning the Pump System’s valve(s).",
        "M02-scoring": "Big Water is on other team's Field (only by turning Pump System's valves(s))",
        "M03-name": "M03 Pump Addition",
        "M03-desc": "Move the Pump Addition so it has contact with the mat and that contact is completely in the Pump Addition target.",
        "M03-scoring": "Pump Addition has contact with the mat completely inside the target area",
        "M04-name": "M04 Rain",
        "M04-desc": "Make at least one Rain come out of the Rain Cloud.",
        "M04-scoring": "At least one Rain is out of the Rain Cloud",
        "M05-name": "M05 Filter",
        "M05-desc": "Move the Filter north until the lock latch drops.",
        "M05-scoring": "Lock latch is in dropped position",
        "M06-name": "M06 Water Treatment",
        "M06-desc": "Make the Water Treatment model eject its Big Water, *only by moving the Toilet’s lever.",
        "M06-scoring": "Big Water is ejected from Water Treatment model (only by Toilet's lever)",
        "M07-name": "M07 Fountain",
        "M07-desc": "Make the Fountain’s middle layer rise some obvious height and stay there, due only to a Big Water in the gray tub.",
        "M07-scoring": "Middle layer is raised (due only to a Big Water in gray tub)",
        "M08-name": "M08 Manhole Covers",
        "M08-desc": "Flip Manhole cover(s) over, obviously past vertical *without it/them ever reaching Base.",
        "M08-scoring1": "Manhole cover(s) that are flipped over past vertical (and never reached Base)",
        "M08-scoring2": "2 in separate Tripod targets",
        "M08-scoring3": "Both covers are flipped over and completely in separate Tripod targets",
        "M09-name": "M09 Tripod",
        "M09-desc": "Move the inspection camera Tripod.",
        "M09-scoring1": "All the Tripod’s feet are touching the mat",
        "M09-scoring2": "Tripod is partially in a Tripod target",
        "M09-scoring3": "OR Tripod is completely in a Tripod target",
        "M09-error": "Choose one of the two options",
        "M10-name": "M10 Pipe Replacement",
        "M10-desc": "Move a New Pipe so it is where the broken one started, in full/flat contact with the mat.",
        "M10-scoring1": "New Pipe is installed where Broken Pipe was",
        "M10-scoring2": "This New Pipe has full/flat contact with the mat",
        "M10-scoring3": "New Pipe is installed where Broken Pipe was, in full/flat contact with the mat",
        "M11-name": "M11 Pipe Construction",
        "M11-desc": "Move a New Pipe.",
        "M11-scoring1": "New Pipe has full/flat contact with the mat",
        "M11-scoring2": "This New Pipe is partially in its target",
        "M11-scoring3": "OR this New Pipe is completely in its target",
        "M12-name": "M12 Sludge",
        "M12-desc": "Move the Sludge so it is touching the visible wood of any of the six drawn garden boxes.",
        "M12-scoring": "Sludge is touching the visible wood of a drawn garden box",
        "M13-name": "M13 Flower",
        "M13-desc": "Make the Flower rise some obvious height and stay there, due only to a Big Water in the brown pot.",
        "M13-scoring1": "Flower is raised (due only to a Big Water in brown pot)",
        "M13-scoring2": "At least one rain is in the purple part, touching nothing but Flower model",
        "M14-name": "M14 Water Well",
        "M14-desc": "Move the Water Well so it has contact with the mat.",
        "M14-scoring1": "Water Well has contact with the mat partially inside the target area",
        "M14-scoring2": "Water Well has contact with the mat completely inside the target area",
        "M15-name": "M15 Fire",
        "M15-desc": "ake the fire drop *only by making the Firetruck apply direct force to the House’s lever.",
        "M15-scoring": "Fire is dropped (due only to Firetruck applying direct force to House’s lever)",
        "M16-name": "M16 Water Collection",
        "M16-desc": "Move or catch Big Water and/or Rain water (one Rain maximum; no Dirty Water) so it is touching the mat in the Water Target, *without the target ever reaching the white Off-Limits Line shown below.  Water may be touching the target, and/or other water, but not be touching nor guided by anything else.  Each water model is scored as an individual.",
        "M16-scoring1": "Water Target is East of Off-Limits line (and never reached Off-Limit line)",
        "M16-scoring2": "At least one Rain is touching mat in Water Target",
        "M16-scoring3": "Big Water touching mat in Water Target",
        "M16-scoring4": "At least one pair of Big Waters are stacked in Water Target",
        "M17-name": "M17 Slingshot",
        "M17-desc": "Move the Slingshot so it is completely in its target.",
        "M17-scoring1": "Slingshot is completely in the Slingshot target",
        "M17-scoring2": "Rain AND Dirty Water are completely in the Slingshot target",
        "M18-name": "M18 Faucet",
        "M18-desc": "Make the water level obviously more blue than white as seen from above the cup, *only by turning the Faucet handle.",
        "M18-scoring": "Water level is more blue than white (only by turning Faucet handle)",
        "penalties-name": "Penalties",
        "penalties-desc": "Penalties given",
        "penalties-scoring": "Number of Penalty discs in the white triangle area"
    }
}
