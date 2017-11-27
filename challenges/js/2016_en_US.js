{
    "title": "ANIMAL ALLIES",
    "missions": [{
            "title": "M01 Shark Shipment",
            "description": "Move the Shark to her new home not touching her tank's walls.",
            "objectives": [{
                    "id": "target",
                    "title": "Shark and take are completely in Target",
                    "options": [{
                            "value": "2",
                            "title": "T2"
                        },
                        {
                            "value": "1",
                            "title": "T1"
                        },
                        {
                            "value": "0",
                            "title": "None"
                        }
                    ],
                    "type": "enum"
                },
                {
                    "id": "bonus",
                    "title": "Shark touching only tank floor (NOT wall)",
                    "type": "yesno"
                },
                {
                    "id": "malus",
                    "title": "Nothing touched the Shark except the tank",
                    "type": "yesno"
                }
            ],
            "score": [function(target, bonus, malus) {
                if (target === '0' && bonus === 'no' && malus === 'yes') {
                    return 0
                }
                if (target === '1' && bonus === 'no' && malus === 'yes') {
                    return 7
                }
                if (target === '2' && bonus === 'no' && malus === 'yes') {
                    return 10
                }
                if (target === '0' && bonus === 'yes' && malus === 'yes') {
                    return 0
                }
                if (target === '1' && bonus === 'yes' && malus === 'yes') {
                    return 27
                }
                if (target === '2' && bonus === 'yes' && malus === 'yes') {
                    return 30
                }
                if (target === '0' && bonus === 'no' && malus === 'no') {
                    return 0
                }
                if (target === '1' && bonus === 'no' && malus === 'no') {
                    return 0
                }
                if (target === '2' && bonus === 'no' && malus === 'no') {
                    return 0
                }
                if (target === '0' && bonus === 'yes' && malus === 'no') {
                    return 0
                }
                if (target === '1' && bonus === 'yes' && malus === 'no') {
                    return 0
                }
                if (target === '2' && bonus === 'yes' && malus === 'no') {
                    return 0
                }
            }]
        },
        {
            "title": "M02 Service Dog Action",
            "description": "Drive past the visually impaired man, and the dog will do her job.",
            "objectives": [{
                    "id": "dog",
                    "title": "Warning Fence is down",
                    "type": "yesno"
                },
                {
                    "id": "dog_malus",
                    "title": "Robot completely crossed fence from West, between barriers",
                    "type": "yesno"
                }
            ],
            "score": [function(dog, dog_malus) {
                if (dog === 'no' && dog_malus === 'yes') {
                    return 0
                }
                if (dog === 'yes' && dog_malus === 'yes') {
                    return 15
                }
                if (dog === 'no' && dog_malus === 'no') {
                    return 0
                }
                if (dog === 'yes' && dog_malus === 'no') {
                    return 0
                }
            }]
        },
        {
            "title": "M03 Conservation",
            "description": "During the Match, participating Robots make the trays switch places.  A switch is officially successful when the red axle causes the system to stop.  Robots then have the option of removing the received animal and replacing it with a different animal for switching.  The Referee resets the red axle.",
            "objectives": [{
                "id": "conservation",
                "title": "Pairs of Identical Animals completely on same side",
                "type": "number",
                "min": "0",
                "max": "6"
            }],
            "score": [function(conservation) {
                if (conservation === '0') {
                    return 0
                }
                if (conservation === '1') {
                    return 20
                }
                if (conservation === '2') {
                    return 40
                }
                if (conservation === '3') {
                    return 60
                }
                if (conservation === '4') {
                    return 80
                }
                if (conservation === '5') {
                    return 100
                }
                if (conservation === '6') {
                    return 120
                }
            }]
        },
        {
            "title": "M04 Feeding",
            "description": "Deliver food from the Refrigerator to Target Animal Areas.",
            "objectives": [{
                "id": "feeding",
                "title": "Pieces of food completely in Animal Areas (only one colour per Area)",
                "type": "number",
                "min": "0",
                "max": "8"
            }],
            "score": [function(feeding) {
                if (feeding === '0') {
                    return 0
                }
                if (feeding === '1') {
                    return 10
                }
                if (feeding === '2') {
                    return 20
                }
                if (feeding === '3') {
                    return 30
                }
                if (feeding === '4') {
                    return 40
                }
                if (feeding === '5') {
                    return 50
                }
                if (feeding === '6') {
                    return 60
                }
                if (feeding === '7') {
                    return 70
                }
                if (feeding === '8') {
                    return 80
                }
            }]
        },
        {
            "title": "M05 Biomimicry",
            "description": "Test our ability to mimic the Gecko's �stickiness� by placing the White (mechanical) Gecko on the Biomimicry Wall, and/or by seeing if the Robot itself can get onto the wall.",
            "objectives": [{
                    "id": "gecko",
                    "title": "Wall supports complete weight of White Gecko",
                    "type": "yesno"
                },
                {
                    "id": "robot",
                    "title": "Wall supports complete weight of Robot",
                    "type": "yesno"
                }
            ],
            "score": [function(gecko) {
                if (gecko === 'no') {
                    return 0
                }
                if (gecko === 'yes') {
                    return 15
                }
            }, function(robot) {
                if (robot === 'no') {
                    return 0
                }
                if (robot === 'yes') {
                    return 32
                }
            }]
        },
        {
            "title": "M06 Milking Automation",
            "description": "Guide the cow into the machine, then spin the machine until Milk comes out. If you spin too far, Manure also comes out!",
            "objectives": [{
                    "id": "milk1",
                    "title": "All Milk has rolled out",
                    "type": "yesno"
                },
                {
                    "id": "milk2",
                    "title": "All Manure has rolled out",
                    "type": "yesno"
                }
            ],
            "score": [function(milk1, milk2) {
                if (milk1 === 'no' && milk2 === 'no') {
                    return 0
                }
                if (milk1 === 'no' && milk2 === 'yes') {
                    return 0
                }
                if (milk1 === 'yes' && milk2 === 'no') {
                    return 20
                }
                if (milk1 === 'yes' && milk2 === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M07 Panda Release",
            "description": "Convert the Panda�s scene from facility care and observation to open wilderness.",
            "objectives": [{
                "id": "panda",
                "title": "Slider appears fully opened clockwise",
                "type": "yesno"
            }],
            "score": [function(panda) {
                if (panda === 'no') {
                    return 0
                }
                if (panda === 'yes') {
                    return 10
                }
            }]
        },
        {
            "title": "M08 Camera Recovery",
            "description": "Go get the camera and bring it to Base.",
            "objectives": [{
                "id": "camera",
                "title": "Camera is completely in Base",
                "type": "yesno"
            }],
            "score": [function(camera) {
                if (camera === 'no') {
                    return 0
                }
                if (camera === 'yes') {
                    return 15
                }
            }]
        },
        {
            "title": "M09-M15 Training and Research",
            "description": "Move the Dog & Trainer, Zoologist, and/or Manure Samples to the Training & Research Area.",
            "objectives": [{
                    "id": "training1",
                    "title": "Dog & Trainer completely in Training/Research Area",
                    "type": "yesno"
                },
                {
                    "id": "training2",
                    "title": "Zoologist completely in Training/Research Area",
                    "type": "yesno"
                },
                {
                    "id": "training3",
                    "title": "Manure completely in Training/Research Area",
                    "type": "number",
                    "min": "0",
                    "max": "7"
                }
            ],
            "score": [function(training1) {
                if (training1 === 'no') {
                    return 0
                }
                if (training1 === 'yes') {
                    return 12
                }
            }, function(training2) {
                if (training2 === 'no') {
                    return 0
                }
                if (training2 === 'yes') {
                    return 15
                }
            }, function(training3) {
                if (training3 === '0') {
                    return 0
                }
                if (training3 === '1') {
                    return 5
                }
                if (training3 === '2') {
                    return 10
                }
                if (training3 === '3') {
                    return 15
                }
                if (training3 === '4') {
                    return 20
                }
                if (training3 === '5') {
                    return 25
                }
                if (training3 === '6') {
                    return 30
                }
                if (training3 === '7') {
                    return 35
                }
            }]
        },
        {
            "title": "M10 Bee Keeping",
            "description": "Place the Bee on the Beehive and get the Honey out.",
            "objectives": [{
                    "id": "bee",
                    "title": "Bee is on Beehive with NO Honey in Beehive",
                    "type": "yesno"
                },
                {
                    "id": "bee1",
                    "title": "Bee is on Beehive and Honey is completely in Base",
                    "type": "yesno"
                }
            ],
            "score": [function(bee, bee1) {
                if (bee === 'no' && bee1 === 'no') {
                    return 0
                }
                if (bee === 'yes' && bee1 === 'no') {
                    return 12
                }
                if (bee === 'no' && bee1 === 'yes') {
                    return 15
                }
                if (bee === 'yes' && bee1 === 'yes') {
                    return new Error("Choose one of the two options")
                }
            }]
        },
        {
            "title": "M11 Prosthesis",
            "description": "Fit the Prosthesis where the legs of the Pet (Our Little Friend) should be, and send the Pet to its place on the farm.",
            "objectives": [{
                    "id": "prosthesis",
                    "title": "Prosthesis fitted to Pet, NOT held by Ref",
                    "type": "yesno"
                },
                {
                    "id": "prosthesis0",
                    "title": "Prosthesis fitted to Pet and completely in Farm Target",
                    "type": "yesno"
                }
            ],
            "score": [function(prosthesis, prosthesis0) {
                if (prosthesis === 'no' && prosthesis0 === 'no') {
                    return 0
                }
                if (prosthesis === 'no' && prosthesis0 === 'yes') {
                    return 9
                }
                if (prosthesis === 'yes' && prosthesis0 === 'no') {
                    return 15
                }
                if (prosthesis === 'yes' && prosthesis0 === 'yes') {
                    return new Error("Choose one of the two options")
                }
            }]
        },
        {
            "title": "M12 Seal in Base",
            "description": "The Seal is completely in Base and not broken",
            "objectives": [{
                "id": "seal",
                "title": "Seal is completely in Base, NOT broken",
                "type": "yesno"
            }],
            "score": [function(seal) {
                if (seal === 'no') {
                    return 0
                }
                if (seal === 'yes') {
                    return 1
                }
            }]
        },
        {
            "title": "M13 Milk in Base",
            "description": "-",
            "objectives": [{
                "id": "milkBase",
                "title": "All three Milk are completely in Base",
                "type": "yesno"
            }],
            "score": [function(milkBase) {
                if (milkBase === 'no') {
                    return 0
                }
                if (milkBase === 'yes') {
                    return 1
                }
            }]
        },
        {
            "title": "M14 Milk on Ramp",
            "description": "-",
            "objectives": [{
                "id": "milkRamp",
                "title": "Select option that best fits",
                "options": [{
                        "value": "0",
                        "title": "None"
                    },
                    {
                        "value": "1",
                        "title": "All three milk supported by Ramp"
                    },
                    {
                        "value": "2",
                        "title": "+ only things supported by & touching Ramp"
                    },
                    {
                        "value": "3",
                        "title": "+ standing"
                    }
                ],
                "type": "enum"
            }],
            "score": [function(milkRamp) {
                if (milkRamp === '0') {
                    return 0
                }
                if (milkRamp === '1') {
                    return 2
                }
                if (milkRamp === '2') {
                    return 3
                }
                if (milkRamp === '3') {
                    return 4
                }
            }]
        },
        {
            "title": "M15 All Samples",
            "description": "-",
            "objectives": [{
                "id": "samples",
                "title": "All seven Manure Samples completely in Training/Research Area",
                "type": "yesno"
            }],
            "score": [function(samples) {
                if (samples === 'no') {
                    return 0
                }
                if (samples === 'yes') {
                    return 5
                }
            }]
        },
        {
            "title": "Penalties",
            "description": "Penalties given",
            "objectives": [{
                "id": "penalties",
                "title": "Number of Manure samples in the white triangle area",
                "options": [{
                        "value": "0",
                        "title": "0"
                    },
                    {
                        "value": "1",
                        "title": "1"
                    },
                    {
                        "value": "2",
                        "title": "2"
                    },
                    {
                        "value": "3",
                        "title": "3"
                    },
                    {
                        "value": "4",
                        "title": "4"
                    },
                    {
                        "value": "5",
                        "title": "5"
                    }
                ],
                "type": "enum"
            }],
            "score": [function(penalties) {
                if (penalties === '0') {
                    return 0
                }
                if (penalties === '1') {
                    return -6
                }
                if (penalties === '2') {
                    return -12
                }
                if (penalties === '3') {
                    return -18
                }
                if (penalties === '4') {
                    return -24
                }
                if (penalties === '5') {
                    return -30
                }
            }]
        }
    ],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "sharkshipment-name": "M01 Shark Shipment",
        "sharkshipment-desc": "Move the Shark to her new home not touching her tank's walls.",
        "sharkshipment-scoring": "Shark and take are completely in Target",
        "sharkshipment-scoring-target0": "None",
        "sharkshipment-scoring-target1": "T1",
        "sharkshipment-scoring-target2": "T2",
        "sharkshipment-scoring2": "Shark touching only tank floor (NOT wall)",
        "sharkshipment-scoring3": "Nothing touched the Shark except the tank",
        "dog-name": "M02 Service Dog Action",
        "dog-desc": "Drive past the visually impaired man, and the dog will do her job.",
        "dog-scoring": "Warning Fence is down",
        "dog-scoring2": "Robot completely crossed fence from West, between barriers",
        "conservation-name": "M03 Conservation",
        "conservation-desc": "During the Match, participating Robots make the trays switch places.  A switch is officially successful when the red axle causes the system to stop.  Robots then have the option of removing the received animal and replacing it with a different animal for switching.  The Referee resets the red axle.",
        "conservation-scoring": "Pairs of Identical Animals completely on same side",
        "feeding-name": "M04 Feeding",
        "feeding-desc": "Deliver food from the Refrigerator to Target Animal Areas.",
        "feeding-scoring": "Pieces of food completely in Animal Areas (only one colour per Area)",
        "biomimicry-name": "M05 Biomimicry",
        "biomimicry-desc": "Test our ability to mimic the Gecko's �stickiness� by placing the White (mechanical) Gecko on the Biomimicry Wall, and/or by seeing if the Robot itself can get onto the wall.",
        "biomimicry-scoring1": "Wall supports complete weight of White Gecko",
        "biomimicry-scoring2": "Wall supports complete weight of Robot",
        "milk-name": "M06 Milking Automation",
        "milk-desc": "Guide the cow into the machine, then spin the machine until Milk comes out. If you spin too far, Manure also comes out!",
        "milk-scoring": "All Milk has rolled out",
        "milk-scoring2": "All Manure has rolled out",
        "panda-name": "M07 Panda Release",
        "panda-desc": "Convert the Panda�s scene from facility care and observation to open wilderness.",
        "panda-scoring": "Slider appears fully opened clockwise",
        "camera-name": "M08 Camera Recovery",
        "camera-desc": "Go get the camera and bring it to Base.",
        "camera-scoring": "Camera is completely in Base",
        "training-name": "M09-M15 Training and Research",
        "training-desc": "Move the Dog & Trainer, Zoologist, and/or Manure Samples to the Training & Research Area.",
        "training-scoring-1": "Dog & Trainer completely in Training/Research Area",
        "training-scoring-2": "Zoologist completely in Training/Research Area",
        "training-scoring-3": "Manure completely in Training/Research Area",
        "bee-name": "M10 Bee Keeping",
        "bee-desc": "Place the Bee on the Beehive and get the Honey out.",
        "bee-scoring": "Bee is on Beehive with NO Honey in Beehive",
        "bee-scoring1": "Bee is on Beehive and Honey is completely in Base",
        "bee-error": "Choose one of the two options",
        "prosthesis-name": "M11 Prosthesis",
        "prosthesis-desc": "Fit the Prosthesis where the legs of the Pet (Our Little Friend) should be, and send the Pet to its place on the farm.",
        "prosthesis-scoring": "Prosthesis fitted to Pet, NOT held by Ref",
        "prosthesis-scoring-0": "Prosthesis fitted to Pet and completely in Farm Target",
        "prosthesis-error": "Choose one of the two options",
        "seal-name": "M12 Seal in Base",
        "seal-desc": "The Seal is completely in Base and not broken",
        "seal-scoring": "Seal is completely in Base, NOT broken",
        "milkBase-name": "M13 Milk in Base",
        "milkBase-desc": "-",
        "milkBase-scoring": "All three Milk are completely in Base",
        "milkRamp-name": "M14 Milk on Ramp",
        "milkRamp-desc": "-",
        "milkRamp-scoring": "Select option that best fits",
        "milkRamp-scoring-0": "None",
        "milkRamp-scoring-1": "All three milk supported by Ramp",
        "milkRamp-scoring-2": "+ only things supported by & touching Ramp",
        "milkRamp-scoring-3": "+ standing",
        "samples-name": "M15 All Samples",
        "samples-desc": "-",
        "samples-scoring": "All seven Manure Samples completely in Training/Research Area",
        "penalties-name": "Penalties",
        "penalties-desc": "Penalties given",
        "penalties-scoring": "Number of Manure samples in the white triangle area"
    }
}
