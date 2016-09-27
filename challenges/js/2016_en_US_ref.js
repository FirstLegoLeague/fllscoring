{
    "title": "TRASH TREK",
    "missions": [{
        "title": "M01 Shark Shipment",
        "description": "Move the Shark to her new home not touching her tank's walls.",
        "objectives": [{
            "id": "target",
            "title": "After launch, nothing touced the Shark but the Tank. Tank and Shark are ...",
            "options": [{
                "value": "2",
                "title": "in Target 2"
            }, {
                "value": "1",
                "title": "in Target 1"
            }, {
                "value": "0",
                "title": "elsewhere"
            }],
            "type": "enum"
        }, {
            "id": "bonus",
            "title": "Shark is touching only Tank floor",
            "type": "yesno"
        }],
        "score": [function(target, bonus) {
            if (target === '0' && bonus === 'no') {
                return 0
            }
            if (target === '1' && bonus === 'no') {
                return 7
            }
            if (target === '2' && bonus === 'no') {
                return 10
            }
            if (target === '0' && bonus === 'yes') {
                return 0
            }
            if (target === '1' && bonus === 'yes') {
                return 27
            }
            if (target === '2' && bonus === 'yes') {
                return 30
            }
        }]
    }, {
        "title": "M02 Service Dog Action",
        "description": "Drive past the visually impaired man, and the dog will do her job.",
        "objectives": [{
            "id": "dog",
            "title": "The Warning Fence is down",
            "type": "yesno"
        }],
        "score": [function(dog) {
            if (dog === 'no') {
                return 0
            }
            if (dog === 'yes') {
                return 15
            }
        }]
    }, {
        "title": "M03 Conservation",
        "description": "During the Match, participating Robots make the trays switch places.  A switch is officially successful when the red axle causes the system to stop.  Robots then have the option of removing the received animal and replacing it with a different animal for switching.  The Referee resets the red axle.",
        "objectives": [{
            "id": "conservation",
            "title": "Two identical animals are completely on the same Side (of either Field, through rotation)",
            "type": "number",
            "min": "0",
            "max": "10"
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
            if (conservation === '7') {
                return 140
            }
            if (conservation === '8') {
                return 160
            }
            if (conservation === '9') {
                return 180
            }
            if (conservation === '10') {
                return 200
            }
        }]
    }, {
        "title": "M04 Feeding",
        "description": "Deliver food from the Refrigerator to Target Animal Areas.",
        "objectives": [{
            "id": "feeding",
            "title": "Pieces of Food that are completely in a Target Area (only matching ones in an Area)",
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
    }, {
        "title": "M05 Biomimicry",
        "description": "Test our ability to mimic the Gecko's �stickiness� by placing the White (mechanical) Gecko on the Biomimicry Wall, and/or by seeing if the Robot itself can get onto the wall.",
        "objectives": [{
            "id": "gecko",
            "title": "The Biomimicry Wall completely supports all the weight of the White Gecko",
            "type": "yesno"
        }, {
            "id": "robot",
            "title": "The Biomimicry Wall completely supports all the weight of the Robot",
            "type": "yesno"
        }],
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
    }, {
        "title": "M06-M13-M14 Milk",
        "description": "Guide the cow into the machine, then spin the machine until Milk comes out. If you spin too far, Manure also comes out!",
        "objectives": [{
            "id": "milk",
            "title": "Milk and Manure... (only by the red lever)",
            "options": [{
                "value": "2",
                "title": "Milk has rolled out, but not Manure"
            }, {
                "value": "1",
                "title": "have all rolled out"
            }, {
                "value": "0",
                "title": "other"
            }],
            "type": "enum"
        }, {
            "id": "milk_ramp",
            "title": "All three Milk are...",
            "options": [{
                "value": "3",
                "title": "supported by Ramp, touching Ramp as only things and standing"
            }, {
                "value": "2",
                "title": "supported by Ramp and touching Ramp as only things"
            }, {
                "value": "1",
                "title": "supported by Ramp"
            }, {
                "value": "0",
                "title": "not supported by Ramp"
            }],
            "type": "enum"
        }, {
            "id": "milk_base",
            "title": "All three Milk are completely in Base",
            "type": "yesno"
        }],
        "score": [function(milk, milk_base, milk_ramp) {
            if (milk === '0' && milk_base === 'no' && milk_ramp === '0') {
                return 0
            }
            if (milk === '1' && milk_base === 'no' && milk_ramp === '0') {
                return 15
            }
            if (milk === '2' && milk_base === 'no' && milk_ramp === '0') {
                return 20
            }
            if (milk === '0' && milk_base === 'yes' && milk_ramp === '0') {
                return 1
            }
            if (milk === '1' && milk_base === 'yes' && milk_ramp === '0') {
                return 16
            }
            if (milk === '2' && milk_base === 'yes' && milk_ramp === '0') {
                return 21
            }
            if (milk === '0' && milk_base === 'no' && milk_ramp === '1') {
                return 2
            }
            if (milk === '1' && milk_base === 'no' && milk_ramp === '1') {
                return 17
            }
            if (milk === '2' && milk_base === 'no' && milk_ramp === '1') {
                return 22
            }
            if (milk === '0' && milk_base === 'yes' && milk_ramp === '1') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '1' && milk_base === 'yes' && milk_ramp === '1') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '2' && milk_base === 'yes' && milk_ramp === '1') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '0' && milk_base === 'no' && milk_ramp === '2') {
                return 3
            }
            if (milk === '1' && milk_base === 'no' && milk_ramp === '2') {
                return 18
            }
            if (milk === '2' && milk_base === 'no' && milk_ramp === '2') {
                return 23
            }
            if (milk === '0' && milk_base === 'yes' && milk_ramp === '2') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '1' && milk_base === 'yes' && milk_ramp === '2') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '2' && milk_base === 'yes' && milk_ramp === '2') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '0' && milk_base === 'no' && milk_ramp === '3') {
                return 4
            }
            if (milk === '1' && milk_base === 'no' && milk_ramp === '3') {
                return 19
            }
            if (milk === '2' && milk_base === 'no' && milk_ramp === '3') {
                return 24
            }
            if (milk === '0' && milk_base === 'yes' && milk_ramp === '3') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '1' && milk_base === 'yes' && milk_ramp === '3') {
                return new Error("The three Milk cannot be in multiple places")
            }
            if (milk === '2' && milk_base === 'yes' && milk_ramp === '3') {
                return new Error("The three Milk cannot be in multiple places")
            }
        }]
    }, {
        "title": "M07 Panda Release",
        "description": "Convert the Panda�s scene from facility care and observation to open wilderness.",
        "objectives": [{
            "id": "panda",
            "title": "The slider looks fully open clockwise",
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
    }, {
        "title": "M08 Camera Recovery",
        "description": "Go get the camera and bring it to Base.",
        "objectives": [{
            "id": "camera",
            "title": "The Camera is completely in Base",
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
    }, {
        "title": "M09-M15 Training and Research",
        "description": "Move the Dog & Trainer, Zoologist, and/or Manure Samples to the Training & Research Area.",
        "objectives": [{
            "id": "training1",
            "title": "The Dog & Trainer are completely in the Training & Research Area",
            "type": "yesno"
        }, {
            "id": "training2",
            "title": "The Zoologist is completely in the Training & Research Area",
            "type": "yesno"
        }, {
            "id": "training3",
            "title": "Disk-shaped Manure Samples completely in the Training & Research Area",
            "type": "number",
            "min": "0",
            "max": "7"
        }],
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
                return 40
            }
        }]
    }, {
        "title": "M10 Bee Keeping",
        "description": "Place the Bee on the Beehive and get the Honey out.",
        "objectives": [{
            "id": "bee",
            "title": "The Bee and the Honey are...",
            "options": [{
                "value": "2",
                "title": "on the Beehive and in Base"
            }, {
                "value": "1",
                "title": "on and outside the Beehive"
            }, {
                "value": "0",
                "title": "elsewhere"
            }],
            "type": "enum"
        }],
        "score": [function(bee) {
            if (bee === '0') {
                return 0
            }
            if (bee === '1') {
                return 12
            }
            if (bee === '2') {
                return 15
            }
        }]
    }, {
        "title": "M11 Prosthesis",
        "description": "Fit the Prosthesis where the legs of the Pet (Our Little Friend) should be, and send the Pet to its place on the farm.",
        "objectives": [{
            "id": "prosthesis",
            "title": "The Prosthesis is...",
            "options": [{
                "value": "2",
                "title": "fitted and in Farm Area"
            }, {
                "value": "1",
                "title": "fitted"
            }, {
                "value": "0",
                "title": "not fitted"
            }],
            "type": "enum"
        }],
        "score": [function(prosthesis) {
            if (prosthesis === '0') {
                return 0
            }
            if (prosthesis === '1') {
                return 9
            }
            if (prosthesis === '2') {
                return 15
            }
        }]
    }, {
        "title": "M12 Seal in Base",
        "description": "The Seal is completely in Base and not broken",
        "objectives": [{
            "id": "seal",
            "title": "The Seal is completely in Base and not broken",
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
    }, {
        "title": "Penalties",
        "description": "Penalties given",
        "objectives": [{
            "id": "penalties",
            "title": "Penalties given",
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
    }],
    "strings": {
        "yes": "Yes",
        "no": "No",
        "sharkshipment-name": "M01 Shark Shipment",
        "sharkshipment-desc": "Move the Shark to her new home not touching her tank's walls.",
        "sharkshipment-scoring": "After launch, nothing touced the Shark but the Tank. Tank and Shark are ...",
        "sharkshipment-scoring-target0": "elsewhere",
        "sharkshipment-scoring-target1": "in Target 1",
        "sharkshipment-scoring-target2": "in Target 2",
        "sharkshipment-scoring2": "Shark is touching only Tank floor",
        "dog-name": "M02 Service Dog Action",
        "dog-desc": "Drive past the visually impaired man, and the dog will do her job.",
        "dog-scoring": "The Warning Fence is down",
        "conservation-name": "M03 Conservation",
        "conservation-desc": "During the Match, participating Robots make the trays switch places.  A switch is officially successful when the red axle causes the system to stop.  Robots then have the option of removing the received animal and replacing it with a different animal for switching.  The Referee resets the red axle.",
        "conservation-scoring": "Two identical animals are completely on the same Side (of either Field, through rotation)",
        "feeding-name": "M04 Feeding",
        "feeding-desc": "Deliver food from the Refrigerator to Target Animal Areas.",
        "feeding-scoring": "Pieces of Food that are completely in a Target Area (only matching ones in an Area)",
        "biomimicry-name": "M05 Biomimicry",
        "biomimicry-desc": "Test our ability to mimic the Gecko's �stickiness� by placing the White (mechanical) Gecko on the Biomimicry Wall, and/or by seeing if the Robot itself can get onto the wall.",
        "biomimicry-scoring1": "The Biomimicry Wall completely supports all the weight of the White Gecko",
        "biomimicry-scoring2": "The Biomimicry Wall completely supports all the weight of the Robot",
        "milk-name": "M06-M13-M14 Milk",
        "milk-desc": "Guide the cow into the machine, then spin the machine until Milk comes out. If you spin too far, Manure also comes out!",
        "milk-scoring": "Milk and Manure... (only by the red lever)",
        "milk-scoring-milkmanure": "have all rolled out",
        "milk-scoring-milk": "Milk has rolled out, but not Manure",
        "milk-scoring-nothing": "other",
        "milk-base-scoring": "All three Milk are completely in Base",
        "milk-ramp-scoring": "All three Milk are...",
        "milk-ramp-scoring-0": "not supported by Ramp",
        "milk-ramp-scoring-1": "supported by Ramp",
        "milk-ramp-scoring-2": "supported by Ramp and touching Ramp as only things",
        "milk-ramp-scoring-3": "supported by Ramp, touching Ramp as only things and standing",
        "milk-error": "The three Milk cannot be in multiple places",
        "panda-name": "M07 Panda Release",
        "panda-desc": "Convert the Panda�s scene from facility care and observation to open wilderness.",
        "panda-scoring": "The slider looks fully open clockwise",
        "camera-name": "M08 Camera Recovery",
        "camera-desc": "Go get the camera and bring it to Base.",
        "camera-scoring": "The Camera is completely in Base",
        "training-name": "M09-M15 Training and Research",
        "training-desc": "Move the Dog & Trainer, Zoologist, and/or Manure Samples to the Training & Research Area.",
        "training-scoring-1": "The Dog & Trainer are completely in the Training & Research Area",
        "training-scoring-2": "The Zoologist is completely in the Training & Research Area",
        "training-scoring-3": "Disk-shaped Manure Samples completely in the Training & Research Area",
        "bee-name": "M10 Bee Keeping",
        "bee-desc": "Place the Bee on the Beehive and get the Honey out.",
        "bee-scoring": "The Bee and the Honey are...",
        "bee-scoring-0": "elsewhere",
        "bee-scoring-1": "on and outside the Beehive",
        "bee-scoring-2": "on the Beehive and in Base",
        "prosthesis-name": "M11 Prosthesis",
        "prosthesis-desc": "Fit the Prosthesis where the legs of the Pet (Our Little Friend) should be, and send the Pet to its place on the farm.",
        "prosthesis-scoring": "The Prosthesis is...",
        "prosthesis-scoring-0": "not fitted",
        "prosthesis-scoring-1": "fitted",
        "prosthesis-scoring-2": "fitted and in Farm Area",
        "seal-name": "M12 Seal in Base",
        "seal-desc": "The Seal is completely in Base and not broken",
        "seal-scoring": "The Seal is completely in Base and not broken",
        "penalties-name": "Penalties",
        "penalties-desc": "Penalties given",
        "penalties-scoring": "Penalties given"
    }
}
