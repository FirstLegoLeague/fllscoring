define('services/ng-challenge',[
    'services/log',
    'services/ng-services',
    'services/fs'
],function(log,module,fs) {
    return module.factory('$challenge',['$fs',function($fs) {
        var mission;

        var field = {
            "title": "Senior Solutions",
            "missions": [{
                "title": "Flexibility",
                "description": "Robot gets yellow loops to Base.",
                "objectives": [{
                    "id": "yellowloops",
                    "title": "Yellow Loops in Base",
                    "type": "number",
                    "min": "0",
                    "max": "2"
                }],
                "score": [
                    function(yellowloops) {
                        if (yellowloops === '0') {
                            return 0
                        }
                        if (yellowloops === '1') {
                            return 20
                        }
                        if (yellowloops === '2') {
                            return 40
                        }
                    }
                ]
            }, {
                "title": "Medicine",
                "description": "The bottles are arranged randomly before the start of each match (See Field Setup). Robot gets the green medicine bottle to Base without disturbing orange ones.",
                "objectives": [{
                    "id": "meds",
                    "title": "Green in Base, Orange Not Moved",
                    "type": "yesno"
                }],
                "score": [
                    function(meds) {
                        if (meds === 'no') {
                            return 0
                        }
                        if (meds === 'yes') {
                            return 25
                        }
                    }
                ]
            }, {
                "title": "Service Animals",
                "description": "Robot applies force to gray disc, causing dog with phone to move toward Base.",
                "objectives": [{
                    "id": "dog",
                    "title": "Dog in Base",
                    "type": "yesno"
                }],
                "score": [
                    function(dog) {
                        if (dog === 'no') {
                            return 0
                        }
                        if (dog === 'yes') {
                            return 20
                        }
                    }
                ]
            }, {
                "title": "Wood Working",
                "description": "Robot gets the chair to Base. You fix the chair by hand. Robot brings the chair to the table.",
                "objectives": [{
                    "id": "chairbase",
                    "title": "Chair Repaired and in Base",
                    "type": "yesno"
                }, {
                    "id": "chairtable",
                    "title": "Chair Repaired and under Table",
                    "type": "yesno"
                }],
                "score": [
                    function(chairbase, chairtable) {
                        if (chairbase === 'no' && chairtable === 'no') {
                            return 0
                        }
                        if (chairbase === 'no' && chairtable === 'yes') {
                            return 25
                        }
                        if (chairbase === 'yes' && chairtable === 'no') {
                            return 15
                        }
                        if (chairbase === 'yes' && chairtable === 'yes') {
                            return new Error("Chair cannot be in base AND under the table.")
                        }
                    }
                ]
            }, {
                "title": "Video Call",
                "description": "Robot gets the flags to rise.",
                "objectives": [{
                    "id": "flags",
                    "title": "Flags Fully Upright",
                    "type": "number",
                    "min": "0",
                    "max": "2"
                }],
                "score": [
                    function(flags) {
                        if (flags === '0') {
                            return 0
                        }
                        if (flags === '1') {
                            return 20
                        }
                        if (flags === '2') {
                            return 40
                        }
                    }
                ]
            }, {
                "title": "Quilts",
                "description": "Robot adds squares to quilts.",
                "objectives": [{
                    "id": "quiltsblue",
                    "title": "Blue Squares Touch Target",
                    "type": "number",
                    "min": "0",
                    "max": "2"
                }, {
                    "id": "quiltsorange",
                    "title": "Orange Squares Touch Target",
                    "type": "number",
                    "min": "0",
                    "max": "2"
                }],
                "score": [
                    function(quiltsblue) {
                        if (quiltsblue === '0') {
                            return 0
                        }
                        if (quiltsblue === '1') {
                            return 15
                        }
                        if (quiltsblue === '2') {
                            return 30
                        }
                    },
                    function(quiltsorange) {
                        if (quiltsorange === '0') {
                            return 0
                        }
                        if (quiltsorange === '1') {
                            return 30
                        }
                        if (quiltsorange === '2') {
                            return 60
                        }
                    }
                ]
            }, {
                "title": "Similarity Recognition and Cooperation",
                "description": "Robot aligns your pointer with the other team’s pointer.",
                "objectives": [{
                    "id": "coop",
                    "title": "Dials on Both Fields are Parallel",
                    "type": "yesno"
                }],
                "score": [
                    function(coop) {
                        if (coop === 'no') {
                            return 0
                        }
                        if (coop === 'yes') {
                            return 45
                        }
                    }
                ]
            }, {
                "title": "Ball Game",
                "description": "Both teams get points for the total number of balls on the racks at the end of the match, but only one team gets points when their color is at the center.",
                "objectives": [{
                    "id": "ballcount",
                    "title": "Balls on Rack",
                    "type": "number",
                    "min": "0",
                    "max": "7"
                }, {
                    "id": "ballmiddle",
                    "title": "Middle Ball",
                    "options": [{
                        "value": "your",
                        "title": "Yours"
                    }, {
                        "value": "them",
                        "title": "Theirs"
                    }, {
                        "value": "none",
                        "title": "Neither"
                    }],
                    "type": "enum"
                }],
                "score": [
                    function(ballmiddle, ballcount) {
                        if (ballmiddle === 'your' && ballcount === '0') {
                            return new Error("When no balls are left, the middle ball must be 'Neither'.")
                        }
                        if (ballmiddle === 'your' && ballcount === '1') {
                            return 70
                        }
                        if (ballmiddle === 'your' && ballcount === '2') {
                            return 80
                        }
                        if (ballmiddle === 'your' && ballcount === '3') {
                            return 90
                        }
                        if (ballmiddle === 'your' && ballcount === '4') {
                            return 100
                        }
                        if (ballmiddle === 'your' && ballcount === '5') {
                            return 110
                        }
                        if (ballmiddle === 'your' && ballcount === '6') {
                            return 120
                        }
                        if (ballmiddle === 'your' && ballcount === '7') {
                            return new Error("When all balls are left, the middle ball must be 'Neither'.")
                        }
                        if (ballmiddle === 'them' && ballcount === '0') {
                            return new Error("When no balls are left, the middle ball must be 'Neither'.")
                        }
                        if (ballmiddle === 'them' && ballcount === '1') {
                            return 10
                        }
                        if (ballmiddle === 'them' && ballcount === '2') {
                            return 20
                        }
                        if (ballmiddle === 'them' && ballcount === '3') {
                            return 30
                        }
                        if (ballmiddle === 'them' && ballcount === '4') {
                            return 40
                        }
                        if (ballmiddle === 'them' && ballcount === '5') {
                            return 50
                        }
                        if (ballmiddle === 'them' && ballcount === '6') {
                            return 60
                        }
                        if (ballmiddle === 'them' && ballcount === '7') {
                            return new Error("When all balls are left, the middle ball must be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '0') {
                            return 0
                        }
                        if (ballmiddle === 'none' && ballcount === '1') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '2') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '3') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '4') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '5') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '6') {
                            return new Error("When some, but not all, balls are left, the middle ball cannot be 'Neither'.")
                        }
                        if (ballmiddle === 'none' && ballcount === '7') {
                            return 70
                        }
                    }
                ]
            }, {
                "title": "Gardening",
                "description": "Robot adds to the garden.",
                "objectives": [{
                    "id": "plants",
                    "title": "Base of Plants Touch Target",
                    "type": "yesno"
                }],
                "score": [
                    function(plants) {
                        if (plants === 'no') {
                            return 0
                        }
                        if (plants === 'yes') {
                            return 25
                        }
                    }
                ]
            }, {
                "title": "Stove",
                "description": "Robot gets all burners to show black.",
                "objectives": [{
                    "id": "burners",
                    "title": "All Burners are Black",
                    "type": "yesno"
                }],
                "score": [
                    function(burners) {
                        if (burners === 'no') {
                            return 0
                        }
                        if (burners === 'yes') {
                            return 25
                        }
                    }
                ]
            }, {
                "title": "Bowling",
                "description": "Robot sends balls to knock pins down. If the pins are not all down after the first try using a yellow ball, the referee returns that ball to Base for a second try (this can only happen once per match).",
                "objectives": [{
                    "id": "pins",
                    "title": "Pins Hit",
                    "type": "number",
                    "min": "0",
                    "max": "6"
                }],
                "score": [
                    function(pins) {
                        if (pins === '0') {
                            return 0
                        }
                        if (pins === '1') {
                            return 7
                        }
                        if (pins === '2') {
                            return 14
                        }
                        if (pins === '3') {
                            return 21
                        }
                        if (pins === '4') {
                            return 28
                        }
                        if (pins === '5') {
                            return 35
                        }
                        if (pins === '6') {
                            return 60
                        }
                    }
                ]
            }, {
                "title": "Transitions",
                "description": "Robot gets onto the center platform and is there when the match ends.",
                "objectives": [{
                    "id": "platslant",
                    "title": "Robot Only Touches Slanted Platform",
                    "type": "yesno"
                }, {
                    "id": "platbalan",
                    "title": "Robot Only Touches Balanced Platform",
                    "type": "yesno"
                }, {
                    "id": "platclear",
                    "title": "Platform Only Touches Robot and Mat",
                    "type": "yesno"
                }],
                "score": [
                    function(platslant, platbalan, platclear) {
                        if (platslant === 'no' && platbalan === 'no' && platclear === 'no') {
                            return 0
                        }
                        if (platslant === 'no' && platbalan === 'no' && platclear === 'yes') {
                            return 0
                        }
                        if (platslant === 'no' && platbalan === 'yes' && platclear === 'no') {
                            return 0
                        }
                        if (platslant === 'no' && platbalan === 'yes' && platclear === 'yes') {
                            return 65
                        }
                        if (platslant === 'yes' && platbalan === 'no' && platclear === 'no') {
                            return 0
                        }
                        if (platslant === 'yes' && platbalan === 'no' && platclear === 'yes') {
                            return 45
                        }
                        if (platslant === 'yes' && platbalan === 'yes' && platclear === 'no') {
                            return new Error("Platform cannot be slanted AND balanced.")
                        }
                        if (platslant === 'yes' && platbalan === 'yes' && platclear === 'yes') {
                            return new Error("Platform cannot be slanted AND balanced.")
                        }
                    }
                ]
            }, {
                "title": "Strength Exercise",
                "description": "Robot lifts the west bar to make the weight rise.",
                "objectives": [{
                    "id": "strength",
                    "title": "Weight raised",
                    "options": [{
                        "value": "lo",
                        "title": "Low"
                    }, {
                        "value": "hi",
                        "title": "High"
                    }, {
                        "value": "no",
                        "title": "Not Done"
                    }],
                    "type": "enum"
                }],
                "score": [
                    function(strength) {
                        if (strength === 'no') {
                            return 0
                        }
                        if (strength === 'lo') {
                            return 15
                        }
                        if (strength === 'hi') {
                            return 25
                        }
                    }
                ]
            }, {
                "title": "Cardio Training",
                "description": "Robot turns the pinwheel 90° at a time.",
                "objectives": [{
                    "id": "dialbig",
                    "title": "Dial Big Step",
                    "type": "number",
                    "min": "1",
                    "max": "9"
                }, {
                    "id": "dialsmall",
                    "title": "Dial Small Step",
                    "type": "number",
                    "min": "0",
                    "max": "5"
                }],
                "score": [
                    function(dialbig, dialsmall) {
                        if (dialbig === '1' && dialsmall === '0') {
                            return -60
                        }
                        if (dialbig === '1' && dialsmall === '1') {
                            return -55
                        }
                        if (dialbig === '1' && dialsmall === '2') {
                            return -50
                        }
                        if (dialbig === '1' && dialsmall === '3') {
                            return -45
                        }
                        if (dialbig === '1' && dialsmall === '4') {
                            return -40
                        }
                        if (dialbig === '1' && dialsmall === '5') {
                            return -35
                        }
                        if (dialbig === '2' && dialsmall === '0') {
                            return -30
                        }
                        if (dialbig === '2' && dialsmall === '1') {
                            return -25
                        }
                        if (dialbig === '2' && dialsmall === '2') {
                            return -20
                        }
                        if (dialbig === '2' && dialsmall === '3') {
                            return -15
                        }
                        if (dialbig === '2' && dialsmall === '4') {
                            return -10
                        }
                        if (dialbig === '2' && dialsmall === '5') {
                            return -5
                        }
                        if (dialbig === '3' && dialsmall === '0') {
                            return 0
                        }
                        if (dialbig === '3' && dialsmall === '1') {
                            return 5
                        }
                        if (dialbig === '3' && dialsmall === '2') {
                            return 10
                        }
                        if (dialbig === '3' && dialsmall === '3') {
                            return 15
                        }
                        if (dialbig === '3' && dialsmall === '4') {
                            return 20
                        }
                        if (dialbig === '3' && dialsmall === '5') {
                            return 25
                        }
                        if (dialbig === '4' && dialsmall === '0') {
                            return 30
                        }
                        if (dialbig === '4' && dialsmall === '1') {
                            return 35
                        }
                        if (dialbig === '4' && dialsmall === '2') {
                            return 40
                        }
                        if (dialbig === '4' && dialsmall === '3') {
                            return 45
                        }
                        if (dialbig === '4' && dialsmall === '4') {
                            return 50
                        }
                        if (dialbig === '4' && dialsmall === '5') {
                            return 55
                        }
                        if (dialbig === '5' && dialsmall === '0') {
                            return 60
                        }
                        if (dialbig === '5' && dialsmall === '1') {
                            return 63
                        }
                        if (dialbig === '5' && dialsmall === '2') {
                            return 66
                        }
                        if (dialbig === '5' && dialsmall === '3') {
                            return 69
                        }
                        if (dialbig === '5' && dialsmall === '4') {
                            return 72
                        }
                        if (dialbig === '5' && dialsmall === '5') {
                            return 75
                        }
                        if (dialbig === '6' && dialsmall === '0') {
                            return 78
                        }
                        if (dialbig === '6' && dialsmall === '1') {
                            return 91
                        }
                        if (dialbig === '6' && dialsmall === '2') {
                            return 94
                        }
                        if (dialbig === '6' && dialsmall === '3') {
                            return 97
                        }
                        if (dialbig === '6' && dialsmall === '4') {
                            return 100
                        }
                        if (dialbig === '6' && dialsmall === '5') {
                            return 103
                        }
                        if (dialbig === '7' && dialsmall === '0') {
                            return 106
                        }
                        if (dialbig === '7' && dialsmall === '1') {
                            return 107
                        }
                        if (dialbig === '7' && dialsmall === '2') {
                            return 108
                        }
                        if (dialbig === '7' && dialsmall === '3') {
                            return 109
                        }
                        if (dialbig === '7' && dialsmall === '4') {
                            return 110
                        }
                        if (dialbig === '7' && dialsmall === '5') {
                            return 111
                        }
                        if (dialbig === '8' && dialsmall === '0') {
                            return 112
                        }
                        if (dialbig === '8' && dialsmall === '1') {
                            return 113
                        }
                        if (dialbig === '8' && dialsmall === '2') {
                            return 114
                        }
                        if (dialbig === '8' && dialsmall === '3') {
                            return 115
                        }
                        if (dialbig === '8' && dialsmall === '4') {
                            return 116
                        }
                        if (dialbig === '8' && dialsmall === '5') {
                            return 117
                        }
                        if (dialbig === '9' && dialsmall === '0') {
                            return 118
                        }
                        if (dialbig === '9' && dialsmall === '1') {
                            return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                        }
                        if (dialbig === '9' && dialsmall === '2') {
                            return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                        }
                        if (dialbig === '9' && dialsmall === '3') {
                            return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                        }
                        if (dialbig === '9' && dialsmall === '4') {
                            return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                        }
                        if (dialbig === '9' && dialsmall === '5') {
                            return new Error("When Big Dial is on 9, Small Dial must be on 0.")
                        }
                    }
                ]
            }]
        };

        var field = {
            "title": "World Class",
            "missions": [{
                "title": "Reverse Engineering",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "basket",
                    "title": "Basket in Base",
                    "type": "yesno"
                }, {
                    "id": "identical",
                    "title": "Your model is in Base and is identical",
                    "type": "yesno"
                }],
                "score": [function(basket, identical) {
                    if (basket === 'no' && identical === 'no') {
                        return 0
                    }
                    if (basket === 'no' && identical === 'yes') {
                        return 0
                    }
                    if (basket === 'yes' && identical === 'no') {
                        return 30
                    }
                    if (basket === 'yes' && identical === 'yes') {
                        return 45
                    }
                }]
            }, {
                "title": "Opening Doors",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "dooropen",
                    "title": "Door opened by pushing handle down",
                    "type": "yesno"
                }],
                "score": [function(dooropen) {
                    if (dooropen === 'no') {
                        return 0
                    }
                    if (dooropen === 'yes') {
                        return 15
                    }
                }]
            }, {
                "title": "Project-Based Learning",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "loops",
                    "title": "Loops on scale",
                    "type": "number",
                    "min": "0",
                    "max": "8"
                }],
                "score": [function(loops) {
                    if (loops === '0') {
                        return 0
                    }
                    if (loops === '1') {
                        return 20
                    }
                    if (loops === '2') {
                        return 30
                    }
                    if (loops === '3') {
                        return 40
                    }
                    if (loops === '4') {
                        return 50
                    }
                    if (loops === '5') {
                        return 60
                    }
                    if (loops === '6') {
                        return 70
                    }
                    if (loops === '7') {
                        return 80
                    }
                    if (loops === '8') {
                        return 90
                    }
                }]
            }, {
                "title": "Apprenticeship",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "modelshown",
                    "title": "Model presented to Referee",
                    "type": "yesno"
                }, {
                    "id": "touchingcicrle",
                    "title": "Touching circle, not in Base, people Bound",
                    "type": "yesno"
                }],
                "score": [function(modelshown, touchingcicrle) {
                    if (modelshown === 'no' && touchingcicrle === 'no') {
                        return 0
                    }
                    if (modelshown === 'no' && touchingcicrle === 'yes') {
                        return new Error("Model must have been presented for it to be touching the circle")
                    }
                    if (modelshown === 'yes' && touchingcicrle === 'no') {
                        return 20
                    }
                    if (modelshown === 'yes' && touchingcicrle === 'yes') {
                        return 35
                    }
                }]
            }, {
                "title": "Search Engine",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "wheelspin",
                    "title": "Only Slider caused wheel to spin 1+ times",
                    "type": "yesno"
                }, {
                    "id": "searchloop",
                    "title": "Only correct loop removed",
                    "type": "yesno"
                }],
                "score": [function(wheelspin, searchloop) {
                    if (wheelspin === 'no' && searchloop === 'no') {
                        return 0
                    }
                    if (wheelspin === 'no' && searchloop === 'yes') {
                        return 0
                    }
                    if (wheelspin === 'yes' && searchloop === 'no') {
                        return 15
                    }
                    if (wheelspin === 'yes' && searchloop === 'yes') {
                        return 60
                    }
                }]
            }, {
                "title": "Sports",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "ballshot",
                    "title": "Ball shot from east/north of \"Shot Lines\" toward Net",
                    "type": "yesno"
                }, {
                    "id": "ballscored",
                    "title": "Ball touching mat in Net at end of match",
                    "type": "yesno"
                }],
                "score": [function(ballshot, ballscored) {
                    if (ballshot === 'no' && ballscored === 'no') {
                        return 0
                    }
                    if (ballshot === 'no' && ballscored === 'yes') {
                        return 0
                    }
                    if (ballshot === 'yes' && ballscored === 'no') {
                        return 30
                    }
                    if (ballshot === 'yes' && ballscored === 'yes') {
                        return 60
                    }
                }]
            }, {
                "title": "Robotics Competition",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "roboticsinsert",
                    "title": "Only Robotics Insert installed",
                    "type": "yesno"
                }, {
                    "id": "competitionloop",
                    "title": "Loop no longer touching model",
                    "type": "yesno"
                }],
                "score": [function(roboticsinsert, competitionloop) {
                    if (roboticsinsert === 'no' && competitionloop === 'no') {
                        return 0
                    }
                    if (roboticsinsert === 'no' && competitionloop === 'yes') {
                        return 0
                    }
                    if (roboticsinsert === 'yes' && competitionloop === 'no') {
                        return 25
                    }
                    if (roboticsinsert === 'yes' && competitionloop === 'yes') {
                        return 55
                    }
                }]
            }, {
                "title": "Using the Right Senses",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "sensesloop",
                    "title": "Loop no longer touching model",
                    "type": "yesno"
                }],
                "score": [function(sensesloop) {
                    if (sensesloop === 'no') {
                        return 0
                    }
                    if (sensesloop === 'yes') {
                        return 40
                    }
                }]
            }, {
                "title": "Remote Communication / Learning",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "pullslider",
                    "title": "Referee saw robot pull slider west",
                    "type": "yesno"
                }],
                "score": [function(pullslider) {
                    if (pullslider === 'no') {
                        return 0
                    }
                    if (pullslider === 'yes') {
                        return 40
                    }
                }]
            }, {
                "title": "Thinking Outside the Box",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "bulbup",
                    "title": "Idea model not touching Box, Box never in Base, Bulb faces UP",
                    "type": "yesno"
                }, {
                    "id": "bulbdown",
                    "title": "Idea model not touching Box, Box never in Base, Bulb faces DOWN",
                    "type": "yesno"
                }],
                "score": [function(bulbup, bulbdown) {
                    if (bulbup === 'no' && bulbdown === 'no') {
                        return 0
                    }
                    if (bulbup === 'no' && bulbdown === 'yes') {
                        return 25
                    }
                    if (bulbup === 'yes' && bulbdown === 'no') {
                        return 40
                    }
                    if (bulbup === 'yes' && bulbdown === 'yes') {
                        return new Error("Bulb cannot face UP and DOWN at the same time")
                    }
                }]
            }, {
                "title": "Community Learning",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "communityloop",
                    "title": "Loop no longer touching model",
                    "type": "yesno"
                }],
                "score": [function(communityloop) {
                    if (communityloop === 'no') {
                        return 0
                    }
                    if (communityloop === 'yes') {
                        return 25
                    }
                }]
            }, {
                "title": "Cloud Access",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "sdcardup",
                    "title": "SD card is UP due to inserted \"key\"",
                    "type": "yesno"
                }],
                "score": [function(sdcardup) {
                    if (sdcardup === 'no') {
                        return 0
                    }
                    if (sdcardup === 'yes') {
                        return 30
                    }
                }]
            }, {
                "title": "Engagement",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "yellow_moved",
                    "title": "Yellow section moved south",
                    "type": "yesno"
                }, {
                    "id": "dial_major_color",
                    "title": "Dial major marker color",
                    "options": [{
                        "value": "na",
                        "title": "N/A"
                    }, {
                        "value": "red10",
                        "title": "Red 10%"
                    }, {
                        "value": "orange16",
                        "title": "Orange 16%"
                    }, {
                        "value": "green22",
                        "title": "Green 22%"
                    }, {
                        "value": "blue28",
                        "title": "Blue 28%"
                    }, {
                        "value": "red34",
                        "title": "Red 34%"
                    }, {
                        "value": "blue40",
                        "title": "Blue 40%"
                    }, {
                        "value": "green46",
                        "title": "Green 46%"
                    }, {
                        "value": "orange52",
                        "title": "Orange 52%"
                    }, {
                        "value": "red58",
                        "title": "Red 58%"
                    }],
                    "type": "enum"
                }, {
                    "id": "ticks_past_major",
                    "title": "Ticks past major marker",
                    "options": [{
                        "value": "na",
                        "title": "N/A"
                    }, {
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
                    }, {
                        "value": "4",
                        "title": "4"
                    }, {
                        "value": "5",
                        "title": "5"
                    }],
                    "type": "enum"
                }],
                "score": [function(yellow_moved) {
                    if (yellow_moved === 'no') {
                        return 0
                    }
                    if (yellow_moved === 'yes') {
                        return 20
                    }
                }, function(yellow_moved, dial_major_color, ticks_past_major) {
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === 'na') {
                        return 0
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '0') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '0') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '1') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '1') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '2') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '2') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '3') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '3') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '4') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '4') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '5') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '5') {
                        return new Error("Dial must remain on \"N/A\" until yellow section has moved")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === 'na') {
                        return 0
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === 'na') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '0') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '0') {
                        return 0.1
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '0') {
                        return 0.16
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '0') {
                        return 0.22
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '0') {
                        return 0.28
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '0') {
                        return 0.34
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '0') {
                        return 0.4
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '0') {
                        return 0.46
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '0') {
                        return 0.52
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '0') {
                        return 0.58
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '1') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '1') {
                        return 0.11
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '1') {
                        return 0.17
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '1') {
                        return 0.23
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '1') {
                        return 0.29
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '1') {
                        return 0.35
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '1') {
                        return 0.41
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '1') {
                        return 0.47
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '1') {
                        return 0.53
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '1') {
                        return 0.58
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '2') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '2') {
                        return 0.12
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '2') {
                        return 0.18
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '2') {
                        return 0.24
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '2') {
                        return 0.3
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '2') {
                        return 0.36
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '2') {
                        return 0.42
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '2') {
                        return 0.48
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '2') {
                        return 0.54
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '2') {
                        return new Error("Dial cannot turn that far")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '3') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '3') {
                        return 0.13
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '3') {
                        return 0.19
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '3') {
                        return 0.25
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '3') {
                        return 0.31
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '3') {
                        return 0.37
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '3') {
                        return 0.43
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '3') {
                        return 0.49
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '3') {
                        return 0.55
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '3') {
                        return new Error("Dial cannot turn that far")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '4') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '4') {
                        return 0.14
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '4') {
                        return 0.2
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '4') {
                        return 0.26
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '4') {
                        return 0.32
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '4') {
                        return 0.38
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '4') {
                        return 0.44
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '4') {
                        return 0.5
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '4') {
                        return 0.56
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '4') {
                        return new Error("Dial cannot turn that far")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '5') {
                        return new Error("Either none or both questions should be answered with \"N/A\"")
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === '5') {
                        return 0.15
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === '5') {
                        return 0.21
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === '5') {
                        return 0.27
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === '5') {
                        return 0.33
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === '5') {
                        return 0.39
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === '5') {
                        return 0.45
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === '5') {
                        return 0.51
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === '5') {
                        return 0.57
                    }
                    if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === '5') {
                        return new Error("Dial cannot turn that far")
                    }
                }]
            }, {
                "title": "Adapting to changing conditions",
                "description": "Todo: Kenny",
                "objectives": [{
                    "id": "model_rotated",
                    "title": "Model rotated 90-ish degrees CCW",
                    "type": "yesno"
                }],
                "score": [function(model_rotated) {
                    if (model_rotated === 'no') {
                        return 0
                    }
                    if (model_rotated === 'yes') {
                        return 15
                    }
                }]
            }, {
                "title": "Penalties",
                "description": "training-desc",
                "objectives": [{
                    "id": "penalties_objective",
                    "title": "Robot, Sprawl, Junk penalties",
                    "type": "number",
                    "min": "0",
                    "max": "8"
                }],
                "score": [function(penalties_objective) {
                    if (penalties_objective === '0') {
                        return 0
                    }
                    if (penalties_objective === '1') {
                        return -10
                    }
                    if (penalties_objective === '2') {
                        return -20
                    }
                    if (penalties_objective === '3') {
                        return -30
                    }
                    if (penalties_objective === '4') {
                        return -40
                    }
                    if (penalties_objective === '5') {
                        return -50
                    }
                    if (penalties_objective === '6') {
                        return -60
                    }
                    if (penalties_objective === '7') {
                        return -70
                    }
                    if (penalties_objective === '8') {
                        return -80
                    }
                }]
            }]
        };



        function indexObjectives(missions) {
            objs = {};
            angular.forEach(missions,function(mission) {
                angular.forEach(mission.objectives,function(obj) {
                    objs[obj.id] = obj;
                });
            });
            return objs;
        }

        return {
            getDependencies: function(fn) {
                var deps = fn.toString().match(/^function\s*\((.*?)\)/)[1];
                return deps?deps.split(/\s*,\s*/):[];
            },
            load: function(challenge) {
                var self = this;
                //use non-angular fs to load plain javascript instead of json
                    // var field = field2;
                return fs.read(challenge).then(function(defs) {
                    return self.init(eval('('+defs+')'));
                }).fail(function() {
                    log('error getting field');
                    return self.init(field);
                });
            },
            init: function(field) {
                return {
                    field: field,
                    missions: field.missions,
                    objectiveIndex: indexObjectives(field.missions)
                };
            }
        };
    }]);
});
