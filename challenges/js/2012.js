{
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
        "score": [function(yellowloops) {
            if (yellowloops === '0') {
                return 0
            }
            if (yellowloops === '1') {
                return 20
            }
            if (yellowloops === '2') {
                return 40
            }
        }]
    }, {
        "title": "Medicine",
        "description": "The bottles are arranged randomly before the start of each match (See Field Setup). Robot gets the green medicine bottle to Base without disturbing orange ones.",
        "objectives": [{
            "id": "meds",
            "title": "Green in Base, Orange Not Moved",
            "type": "yesno"
        }],
        "score": [function(meds) {
            if (meds === 'no') {
                return 0
            }
            if (meds === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "Service Animals",
        "description": "Robot applies force to gray disc, causing dog with phone to move toward Base.",
        "objectives": [{
            "id": "dog",
            "title": "Dog in Base",
            "type": "yesno"
        }],
        "score": [function(dog) {
            if (dog === 'no') {
                return 0
            }
            if (dog === 'yes') {
                return 20
            }
        }]
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
        "score": [function(chairbase, chairtable) {
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
        }]
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
        "score": [function(flags) {
            if (flags === '0') {
                return 0
            }
            if (flags === '1') {
                return 20
            }
            if (flags === '2') {
                return 40
            }
        }]
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
        "score": [function(quiltsblue) {
            if (quiltsblue === '0') {
                return 0
            }
            if (quiltsblue === '1') {
                return 15
            }
            if (quiltsblue === '2') {
                return 30
            }
        }, function(quiltsorange) {
            if (quiltsorange === '0') {
                return 0
            }
            if (quiltsorange === '1') {
                return 30
            }
            if (quiltsorange === '2') {
                return 60
            }
        }]
    }, {
        "title": "Similarity Recognition and Cooperation",
        "description": "Robot aligns your pointer with the other team’s pointer.",
        "objectives": [{
            "id": "coop",
            "title": "Dials on Both Fields are Parallel",
            "type": "yesno"
        }],
        "score": [function(coop) {
            if (coop === 'no') {
                return 0
            }
            if (coop === 'yes') {
                return 45
            }
        }]
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
        "score": [function(ballmiddle, ballcount) {
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
        }]
    }, {
        "title": "Gardening",
        "description": "Robot adds to the garden.",
        "objectives": [{
            "id": "plants",
            "title": "Base of Plants Touch Target",
            "type": "yesno"
        }],
        "score": [function(plants) {
            if (plants === 'no') {
                return 0
            }
            if (plants === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "Stove",
        "description": "Robot gets all burners to show black.",
        "objectives": [{
            "id": "burners",
            "title": "All Burners are Black",
            "type": "yesno"
        }],
        "score": [function(burners) {
            if (burners === 'no') {
                return 0
            }
            if (burners === 'yes') {
                return 25
            }
        }]
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
        "score": [function(pins) {
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
        }]
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
        "score": [function(platslant, platbalan, platclear) {
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
        }]
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
        "score": [function(strength) {
            if (strength === 'no') {
                return 0
            }
            if (strength === 'lo') {
                return 15
            }
            if (strength === 'hi') {
                return 25
            }
        }]
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
        "score": [function(dialbig, dialsmall) {
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
        }]
    }],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "flexibility-name": "Flexibility",
        "flexibility-desc": "Robot gets yellow loops to Base.",
        "yellowloops-desc": "Yellow Loops in Base",
        "medicine-name": "Medicine",
        "medicine-desc": "The bottles are arranged randomly before the start of each match (See Field Setup). Robot gets the green medicine bottle to Base without disturbing orange ones.",
        "meds-desc": "Green in Base, Orange Not Moved",
        "animals-name": "Service Animals",
        "animals-desc": "Robot applies force to gray disc, causing dog with phone to move toward Base.",
        "dog-desc": "Dog in Base",
        "woodwork-name": "Wood Working",
        "woodwork-desc": "Robot gets the chair to Base. You fix the chair by hand. Robot brings the chair to the table.",
        "chairbase-desc": "Chair Repaired and in Base",
        "chairtable-desc": "Chair Repaired and under Table",
        "chairposition-error": "Chair cannot be in base AND under the table.",
        "videocall-name": "Video Call",
        "videocall-desc": "Robot gets the flags to rise.",
        "flags-desc": "Flags Fully Upright",
        "quilts-name": "Quilts",
        "quilts-desc": "Robot adds squares to quilts.",
        "quiltsblue-desc": "Blue Squares Touch Target",
        "quiltsorange-desc": "Orange Squares Touch Target",
        "similarity-name": "Similarity Recognition and Cooperation",
        "similarity-desc": "Robot aligns your pointer with the other team’s pointer.",
        "coop-desc": "Dials on Both Fields are Parallel",
        "ballgame-name": "Ball Game",
        "ballgame-desc": "Both teams get points for the total number of balls on the racks at the end of the match, but only one team gets points when their color is at the center.",
        "ballcount-desc": "Balls on Rack",
        "ballmiddle-desc": "Middle Ball",
        "yours": "Yours",
        "theirs": "Theirs",
        "neither": "Neither",
        "noballs-error": "When no balls are left, the middle ball must be 'Neither'.",
        "someballs-error": "When some, but not all, balls are left, the middle ball cannot be 'Neither'.",
        "allballs-error": "When all balls are left, the middle ball must be 'Neither'.",
        "gardening-name": "Gardening",
        "gardening-desc": "Robot adds to the garden.",
        "plants-desc": "Base of Plants Touch Target",
        "stove-name": "Stove",
        "stove-desc": "Robot gets all burners to show black.",
        "burners-desc": "All Burners are Black",
        "bowling-name": "Bowling",
        "bowling-desc": "Robot sends balls to knock pins down. If the pins are not all down after the first try using a yellow ball, the referee returns that ball to Base for a second try (this can only happen once per match).",
        "pins-desc": "Pins Hit",
        "transitions-name": "Transitions",
        "transitions-desc": "Robot gets onto the center platform and is there when the match ends.",
        "platformslanted-desc": "Robot Only Touches Slanted Platform",
        "platformbalanced-desc": "Robot Only Touches Balanced Platform",
        "platformclear-desc": "Platform Only Touches Robot and Mat",
        "platformstate-error": "Platform cannot be slanted AND balanced.",
        "exercise-name": "Strength Exercise",
        "exercise-desc": "Robot lifts the west bar to make the weight rise.",
        "strength-desc": "Weight raised",
        "low": "Low",
        "high": "High",
        "none": "Not Done",
        "training-name": "Cardio Training",
        "training-desc": "Robot turns the pinwheel 90° at a time.",
        "dialbig-desc": "Dial Big Step",
        "dialsmall-desc": "Dial Small Step",
        "dialcombination-error": "When Big Dial is on 9, Small Dial must be on 0."
    }
}
