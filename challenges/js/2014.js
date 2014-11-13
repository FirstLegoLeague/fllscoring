{
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
        "score": [
            function(basket, identical) {
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
            }
        ]
    }, {
        "title": "Opening Doors",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "dooropen",
            "title": "Door opened by pushing handle down",
            "type": "yesno"
        }],
        "score": [
            function(dooropen) {
                if (dooropen === 'no') {
                    return 0
                }
                if (dooropen === 'yes') {
                    return 15
                }
            }
        ]
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
        "score": [
            function(loops) {
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
            }
        ]
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
        "score": [
            function(modelshown, touchingcicrle) {
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
            }
        ]
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
        "score": [
            function(wheelspin, searchloop) {
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
            }
        ]
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
        "score": [
            function(ballshot, ballscored) {
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
            }
        ]
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
        "score": [
            function(roboticsinsert, competitionloop) {
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
            }
        ]
    }, {
        "title": "Using the Right Senses",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "sensesloop",
            "title": "Loop no longer touching model",
            "type": "yesno"
        }],
        "score": [
            function(sensesloop) {
                if (sensesloop === 'no') {
                    return 0
                }
                if (sensesloop === 'yes') {
                    return 40
                }
            }
        ]
    }, {
        "title": "Remote Communication / Learning",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "pullslider",
            "title": "Referee saw robot pull slider west",
            "type": "yesno"
        }],
        "score": [
            function(pullslider) {
                if (pullslider === 'no') {
                    return 0
                }
                if (pullslider === 'yes') {
                    return 40
                }
            }
        ]
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
        "score": [
            function(bulbup, bulbdown) {
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
            }
        ]
    }, {
        "title": "Community Learning",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "communityloop",
            "title": "Loop no longer touching model",
            "type": "yesno"
        }],
        "score": [
            function(communityloop) {
                if (communityloop === 'no') {
                    return 0
                }
                if (communityloop === 'yes') {
                    return 25
                }
            }
        ]
    }, {
        "title": "Cloud Access",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "sdcardup",
            "title": "SD card is UP due to inserted \"key\"",
            "type": "yesno"
        }],
        "score": [
            function(sdcardup) {
                if (sdcardup === 'no') {
                    return 0
                }
                if (sdcardup === 'yes') {
                    return 30
                }
            }
        ]
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
        "score": [
            function(yellow_moved) {
                if (yellow_moved === 'no') {
                    return 0
                }
                if (yellow_moved === 'yes') {
                    return 20
                }
            },
            function(yellow_moved, dial_major_color, ticks_past_major) {
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
            }
        ]
    }, {
        "title": "Adapting to changing conditions",
        "description": "Todo: Kenny",
        "objectives": [{
            "id": "model_rotated",
            "title": "Model rotated 90-ish degrees CCW",
            "type": "yesno"
        }],
        "score": [
            function(model_rotated) {
                if (model_rotated === 'no') {
                    return 0
                }
                if (model_rotated === 'yes') {
                    return 15
                }
            }
        ]
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
        "score": [
            function(penalties_objective) {
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
            }
        ]
    }]
}
