{
    "title": "ANIMAL ALLIES",
    "missions": [{
        "title": "M01 Haaienvervoer",
        "description": "Verplaats de haai naar haar nieuwe thuis, zonder dat ze de wanden van de tank aanraakt.",
        "objectives": [{
            "id": "target",
            "title": "Na een (her)start heeft niets de haai meer aangeraakt, behalve de tank. De tank en de haai zijn...",
            "options": [{
                "value": "2",
                "title": "in gebied 2"
            }, {
                "value": "1",
                "title": "in gebied 1"
            }, {
                "value": "0",
                "title": "anders"
            }],
            "type": "enum"
        }, {
            "id": "bonus",
            "title": "De haai raakt alleen de bodem van de tank aan",
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
        "title": "M02 Hulphond in actie",
        "description": "Rijd langs de visueel beperkte man, zodat de hond haar werk doet.",
        "objectives": [{
            "id": "dog",
            "title": "Het waarschuwingshek is omlaag (door robot uit het westen, tussen de barri�res)",
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
        "title": "M03 Dierenbescherming",
        "description": "Werk samen met het andere team om dezelfde dieren te herenigen. Elk paar\r\ndieren levert voor BEIDE teams punten op, ongeacht wie er aan de hereniging\r\nheeft bijgedragen.",
        "objectives": [{
            "id": "conservation",
            "title": "Aantal paren gelijke dieren  volledig aan dezelfde kant (door draaiing)",
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
        "title": "M04 Voeren",
        "description": "Breng voedsel van de Koelkast naar de Dierengebieden.",
        "objectives": [{
            "id": "feeding",
            "title": "Aantal stukken voedsel volledig in een Dierengebied (in een gebied hetzelfde)",
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
        "description": "TTest of wij de �plakkerigheid� van de gekko kunnen namaken door de witte (mechanische) gekko aan de biomimicry muur te hangen en/of te onderzoeken of de robot zelf aan de muur kan hangen.",
        "objectives": [{
            "id": "gecko",
            "title": "De biomimicry muur draagt het volledige gewicht van de witte gekko",
            "type": "yesno"
        }, {
            "id": "robot",
            "title": "De biomimicry muur draagt het volledige gewicht van de robot",
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
        "title": "M06-M13-M14 Melk",
        "description": "Leid de koe in de melkmachine en draai dan de melkmachine rond totdat de melk eruit komt. Als je de machine te ver draait, komt er ook mest uit!",
        "objectives": [{
            "id": "milk",
            "title": "Melk en mest zijn... (alleen met de rode hendel)",
            "options": [{
                "value": "2",
                "title": "Melk is er uitgerold, maar geen mest"
            }, {
                "value": "1",
                "title": "allemaal er uitgerold"
            }, {
                "value": "0",
                "title": "anders"
            }],
            "type": "enum"
        }, {
            "id": "milk_ramp",
            "title": "Alle drie de melk zijn...",
            "options": [{
                "value": "0",
                "title": "anders"
            }, {
                "value": "1",
                "title": "volledig in de basis"
            }, {
                "value": "2",
                "title": "volledig gedragen door de oprit"
            }, {
                "value": "3",
                "title": "+ raken de oprit als enigen"
            }, {
                "value": "4",
                "title": "+ staan rechtop"
            }],
            "type": "enum"
        }],
        "score": [function(milk, milk_ramp) {
            if (milk === '0' && milk_ramp === '0') {
                return 0
            }
            if (milk === '1' && milk_ramp === '0') {
                return 15
            }
            if (milk === '2' && milk_ramp === '0') {
                return 20
            }
            if (milk === '0' && milk_ramp === '1') {
                return 1
            }
            if (milk === '1' && milk_ramp === '1') {
                return 16
            }
            if (milk === '2' && milk_ramp === '1') {
                return 21
            }
            if (milk === '0' && milk_ramp === '2') {
                return 2
            }
            if (milk === '1' && milk_ramp === '2') {
                return 17
            }
            if (milk === '2' && milk_ramp === '2') {
                return 22
            }
            if (milk === '0' && milk_ramp === '3') {
                return 3
            }
            if (milk === '1' && milk_ramp === '3') {
                return 18
            }
            if (milk === '2' && milk_ramp === '3') {
                return 23
            }
            if (milk === '0' && milk_ramp === '4') {
                return 4
            }
            if (milk === '1' && milk_ramp === '4') {
                return 19
            }
            if (milk === '2' && milk_ramp === '4') {
                return 24
            }
        }]
    }, {
        "title": "M07 Pandaobservatie en vrijlating",
        "description": "Verander het pandaverblijf van het observatie- en verzorgingsverblijf naar open wildernis.",
        "objectives": [{
            "id": "panda",
            "title": "De schuif ziet er volledig open uit, met de klok mee",
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
        "title": "M08 Camera terughalen",
        "description": "Haal de camera op en breng hem naar de basis.",
        "objectives": [{
            "id": "camera",
            "title": "De camera is volledig in de basis",
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
        "title": "M09-M15 Training en onderzoek",
        "description": "Breng de hond en de trainer, de dierkundige en/of mestmonsters naar het Trainings- en onderzoeksgebied.",
        "objectives": [{
            "id": "training1",
            "title": "Hond en trainer zijn volledig in het Trainings- en onderzoeksgebied",
            "type": "yesno"
        }, {
            "id": "training2",
            "title": "De dierkundige is volledig in het Trainings- en onderzoeksgebied",
            "type": "yesno"
        }, {
            "id": "training3",
            "title": "Aantal mestmonsters  volledig in het Trainings- en onderzoeksgebied (een tegelijk vervoerd)",
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
        "title": "M10 Bijen houden",
        "description": "Zet de bij op de bijenkorf en haal de honing eruit.",
        "objectives": [{
            "id": "bee",
            "title": "De bij en de honing zijn respectievelijk...",
            "options": [{
                "value": "2",
                "title": "op en volledig in de basis"
            }, {
                "value": "1",
                "title": "op en buiten de bijenkorf"
            }, {
                "value": "0",
                "title": "anders"
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
        "title": "M11 Prothese",
        "description": "Bevestig de prothese waar de poten van het huisdier (onze kleine vriend) zouden moeten zitten, en verplaats het huisdier naar zijn plaats op de boerderij.",
        "objectives": [{
            "id": "prosthesis",
            "title": "De prothese is...",
            "options": [{
                "value": "2",
                "title": "bevestigd en in het Boerderijgebied"
            }, {
                "value": "1",
                "title": "bevestigd"
            }, {
                "value": "0",
                "title": "niet bevestigd"
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
        "title": "M12 Zeehond in de basis",
        "description": "De zeehond is volledig in de basis en is niet beschadigd.",
        "objectives": [{
            "id": "seal",
            "title": "De zeehond is volledig in de basis en is niet beschadigd",
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
        "title": "Monsters",
        "description": "Gegeven strafpunten",
        "objectives": [{
            "id": "penalties",
            "title": "Gegeven strafpunten",
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
        "yes": "Ja",
        "no": "Nee",
        "sharkshipment-name": "M01 Haaienvervoer",
        "sharkshipment-desc": "Verplaats de haai naar haar nieuwe thuis, zonder dat ze de wanden van de tank aanraakt.",
        "sharkshipment-scoring": "Na een (her)start heeft niets de haai meer aangeraakt, behalve de tank. De tank en de haai zijn...",
        "sharkshipment-scoring-target0": "anders",
        "sharkshipment-scoring-target1": "in gebied 1",
        "sharkshipment-scoring-target2": "in gebied 2",
        "sharkshipment-scoring2": "De haai raakt alleen de bodem van de tank aan",
        "dog-name": "M02 Hulphond in actie",
        "dog-desc": "Rijd langs de visueel beperkte man, zodat de hond haar werk doet.",
        "dog-scoring": "Het waarschuwingshek is omlaag (door robot uit het westen, tussen de barri�res)",
        "conservation-name": "M03 Dierenbescherming",
        "conservation-desc": "Werk samen met het andere team om dezelfde dieren te herenigen. Elk paar\r\ndieren levert voor BEIDE teams punten op, ongeacht wie er aan de hereniging\r\nheeft bijgedragen.",
        "conservation-scoring": "Aantal paren gelijke dieren  volledig aan dezelfde kant (door draaiing)",
        "feeding-name": "M04 Voeren",
        "feeding-desc": "Breng voedsel van de Koelkast naar de Dierengebieden.",
        "feeding-scoring": "Aantal stukken voedsel volledig in een Dierengebied (in een gebied hetzelfde)",
        "biomimicry-name": "M05 Biomimicry",
        "biomimicry-desc": "TTest of wij de �plakkerigheid� van de gekko kunnen namaken door de witte (mechanische) gekko aan de biomimicry muur te hangen en/of te onderzoeken of de robot zelf aan de muur kan hangen.",
        "biomimicry-scoring1": "De biomimicry muur draagt het volledige gewicht van de witte gekko",
        "biomimicry-scoring2": "De biomimicry muur draagt het volledige gewicht van de robot",
        "milk-name": "M06-M13-M14 Melk",
        "milk-desc": "Leid de koe in de melkmachine en draai dan de melkmachine rond totdat de melk eruit komt. Als je de machine te ver draait, komt er ook mest uit!",
        "milk-scoring": "Melk en mest zijn... (alleen met de rode hendel)",
        "milk-scoring-milkmanure": "allemaal er uitgerold",
        "milk-scoring-milk": "Melk is er uitgerold, maar geen mest",
        "milk-scoring-nothing": "anders",
        "milk-ramp-scoring": "Alle drie de melk zijn...",
        "milk-ramp-scoring-0": "anders",
        "milk-ramp-scoring-1": "volledig in de basis",
        "milk-ramp-scoring-2": "volledig gedragen door de oprit",
        "milk-ramp-scoring-3": "+ raken de oprit als enigen",
        "milk-ramp-scoring-4": "+ staan rechtop",
        "panda-name": "M07 Pandaobservatie en vrijlating",
        "panda-desc": "Verander het pandaverblijf van het observatie- en verzorgingsverblijf naar open wildernis.",
        "panda-scoring": "De schuif ziet er volledig open uit, met de klok mee",
        "camera-name": "M08 Camera terughalen",
        "camera-desc": "Haal de camera op en breng hem naar de basis.",
        "camera-scoring": "De camera is volledig in de basis",
        "training-name": "M09-M15 Training en onderzoek",
        "training-desc": "Breng de hond en de trainer, de dierkundige en/of mestmonsters naar het Trainings- en onderzoeksgebied.",
        "training-scoring-1": "Hond en trainer zijn volledig in het Trainings- en onderzoeksgebied",
        "training-scoring-2": "De dierkundige is volledig in het Trainings- en onderzoeksgebied",
        "training-scoring-3": "Aantal mestmonsters  volledig in het Trainings- en onderzoeksgebied (een tegelijk vervoerd)",
        "bee-name": "M10 Bijen houden",
        "bee-desc": "Zet de bij op de bijenkorf en haal de honing eruit.",
        "bee-scoring": "De bij en de honing zijn respectievelijk...",
        "bee-scoring-0": "anders",
        "bee-scoring-1": "op en buiten de bijenkorf",
        "bee-scoring-2": "op en volledig in de basis",
        "prosthesis-name": "M11 Prothese",
        "prosthesis-desc": "Bevestig de prothese waar de poten van het huisdier (onze kleine vriend) zouden moeten zitten, en verplaats het huisdier naar zijn plaats op de boerderij.",
        "prosthesis-scoring": "De prothese is...",
        "prosthesis-scoring-0": "niet bevestigd",
        "prosthesis-scoring-1": "bevestigd",
        "prosthesis-scoring-2": "bevestigd en in het Boerderijgebied",
        "seal-name": "M12 Zeehond in de basis",
        "seal-desc": "De zeehond is volledig in de basis en is niet beschadigd.",
        "seal-scoring": "De zeehond is volledig in de basis en is niet beschadigd",
        "penalties-name": "Monsters",
        "penalties-desc": "Gegeven strafpunten",
        "penalties-scoring": "Gegeven strafpunten"
    }
}
