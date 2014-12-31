{
    "title": "World Class",
    "missions": [{
        "title": "Reverse Engineering",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Jullie mand is in de basis.</li><li>Het model raakt de witte cirkel rond het projectonderwijs-model aan.</li><li>Jullie hebben een model gemaakt ‘identiek’ aan het model dat het andere team in jullie mand heeft gedaan. De verbindingen tussen de elementen moeten hetzelfde zijn, maar elementen mogen wel ‘gedraaid’ zitten.</li><li>Het model is in de basis.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "objectives": [{
            "id": "basket",
            "title": "Mand in de basis",
            "type": "yesno"
        }, {
            "id": "identical",
            "title": "Jullie model ligt in de basis en is ‘identiek’",
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
        "title": "Deuren openen",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li> De deur moet ver genoeg geopend zijn zodat de scheidsrechter dit kan zien.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De hendel moet omlaag gedrukt zijn.</li></ul>",
        "objectives": [{
            "id": "dooropen",
            "title": "Deur geopend door de hendel omlaag te drukken",
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
        "title": "Projectonderwijs",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De lussen (welke symbool staan voor kennis en vaardigheden) hangen aan de weegschaal zoals getoond.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "objectives": [{
            "id": "loops",
            "title": "Lussen aan de weegschaal",
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
        "title": "Stagelopen",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De LEGO-poppetjes zijn beiden verbonden (op een manier naar keuze) aan een model dat jullie ontwerpen en meenemen. Dit model stelt een vaardigheid, prestatie, carrière of hobby voor dat een speciale betekenis voor jullie team heeft.</li><li>Het model raakt de witte cirkel rond het projectonderwijs-model aan.</li><li>Het model is niet in de basis.</li><li>Het vastmaken van missiemodellen is normaal niet toegestaan vanwege regel 39.4, deze missie is daar een uitzondering op.</li><li>Het eigen model mag simpel, of complex zijn, het mag primitief of realistisch zijn, de keuze is aan jullie. De keuze wat voor model jullie bouwen, heeft geen invloed op de score.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "objectives": [{
            "id": "modelshown",
            "title": "Model getoond aan de scheidsrechter",
            "type": "yesno"
        }, {
            "id": "touchingcicrle",
            "title": "Raakt de cirkel, niet in de basis en poppetjes verbonden",
            "type": "yesno"
        }],
        "score": [function(modelshown, touchingcicrle) {
            if (modelshown === 'no' && touchingcicrle === 'no') {
                return 0
            }
            if (modelshown === 'no' && touchingcicrle === 'yes') {
                return new Error("Model moet getoond zijn voordat het de cirkel kan aanraken")
            }
            if (modelshown === 'yes' && touchingcicrle === 'no') {
                return 20
            }
            if (modelshown === 'yes' && touchingcicrle === 'yes') {
                return 35
            }
        }]
    }, {
        "title": "Zoekmachine",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het kleurenwiel heeft minimaal een keer gedraaid.</li><li>Als één kleur verschijnt in het witte frame, dan raakt de lus van de zichtbare kleur het model niet meer aan.</li><li>Als twee kleuren verschijnen in het witte venster, dan is de lus van de kleur die niet zichtbaar is in het venster, de lus die het model niet meer raakt.</li><li>Beide lussen die niet verwijderd dienen te worden raken via ‘hun’ gaten het model aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Alleen de beweging van de schuif heeft het kleurenwiel in beweging gebracht.</li></ul>",
        "objectives": [{
            "id": "wheelspin",
            "title": "Alleen de schuif heeft het wiel 1+ keer rondgedraaid",
            "type": "yesno"
        }, {
            "id": "searchloop",
            "title": "Alleen de juiste lus is verwijderd",
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
        "title": "Sport",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De bal raakt de mat in het doel.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Alle onderdelen die met het schot te maken hebben waren volledig ten noordoosten van de ‘schietlijn’ op het moment dat de bal werd losgelaten richting het doel.</li></ul>",
        "objectives": [{
            "id": "ballshot",
            "title": "Schot genomen vanuit positie Noord-Oost van de lijn",
            "type": "yesno"
        }, {
            "id": "ballscored",
            "title": "Bal raakt de mat in het doel aan het eind van de wedstrijd",
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
        "title": "Robotwedstrijden",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het blauw-geel-rode robotelement (model) is geïnstalleerd in de robotarm zoals zichtbaar op de afbeelding.</li><li>De lus raakt niet langer de robotarm aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen strategisch object raakt de robotarm aan.</li><li>De lus werd alleen door het gebruik van de zwarte schuif losgemaakt.</li></ul>",
        "objectives": [{
            "id": "roboticsinsert",
            "title": "Alleen het robotelement is geïnstalleerd in de robotarm",
            "type": "yesno"
        }, {
            "id": "competitionloop",
            "title": "Lus raakt de robotarm niet aan",
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
        "title": "Gebruik de juiste zintuigen en leerstijlen",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De lus raakt het zintuigen model niet meer aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De lus werd alleen door het gebruik van de schuif losgemaakt.</li></ul>",
        "objectives": [{
            "id": "sensesloop",
            "title": "Lus raakt het model niet aan",
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
        "title": "Leren/communiceren op afstand",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Geen.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De scheidsrechter heeft gezien dat de schuif door de robot westwaarts is verplaatst.</li></ul>",
        "objectives": [{
            "id": "pullslider",
            "title": "Scheids zag de robot de schuif verplaatsen",
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
        "title": "Outside the Box denken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het ‘idee-model’ raakt niet langer het ‘doos-model’ aan.</li><li>Als het ‘idee-model’ het ‘doos-model’ niet meer aanraakt, is de afbeelding van de gloeilamp van bovenaf zichtbaar.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Het ‘doos-model’ is nooit in de basis geweest.</li></ul>",
        "objectives": [{
            "id": "bulbup",
            "title": "Idee-model raakt de doos niet, Doos niet in basis geweest, Lamp is naar boven gericht",
            "type": "yesno"
        }, {
            "id": "bulbdown",
            "title": "Idee-model raakt de doos niet, Doos niet in basis geweest, Lamp is naar beneden gericht",
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
                return new Error("De lamp kan niet tegelijk naar boven en beneden gericht zijn")
            }
        }]
    }, {
        "title": "Gemeenschappelijk leren",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De ‘kennis & vaardigheden lus’ raakt het gemeenschapsmodel niet meer aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "objectives": [{
            "id": "communityloop",
            "title": "Lus raakt het model niet aan",
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
        "title": "Cloud toegang",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De SD-kaart staat omhoog.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De juiste “key” is in de Cloud geplaatst.</li></ul>",
        "objectives": [{
            "id": "sdcardup",
            "title": "SD card staat omhoog omdat de juiste \"key\" is ingebracht",
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
        "title": "Betrokkenheid",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het gele gedeelte is naar het zuiden verplaatst.</li><li>Het rad is duidelijk met de klok mee gedraaid ten opzichte van de start positie. Zie het overzicht voor de score.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De wijzer mag alleen verplaatst worden doordat de robot aan het rad te draait.</li><li>De robot mag het rad maar een keer 180⁰ draaien, per keer dat de basis wordt verlaten. De scheidsrechter zal extra draaiingen ongedaan maken</li></ul>",
        "objectives": [{
            "id": "yellow_moved",
            "title": "Gele gedeelte is naar het zuiden verplaatst",
            "type": "yesno"
        }, {
            "id": "dial_major_color",
            "title": "Aangewezen kleur",
            "options": [{
                "value": "na",
                "title": "NVT"
            }, {
                "value": "red10",
                "title": "Rood 10%"
            }, {
                "value": "orange16",
                "title": "Oranje 16%"
            }, {
                "value": "green22",
                "title": "Groen 22%"
            }, {
                "value": "blue28",
                "title": "Blauw 28%"
            }, {
                "value": "red34",
                "title": "Rood 34%"
            }, {
                "value": "blue40",
                "title": "Blauw 40%"
            }, {
                "value": "green46",
                "title": "Groen 46%"
            }, {
                "value": "orange52",
                "title": "Oranje 52%"
            }, {
                "value": "red58",
                "title": "Rood 58%"
            }],
            "type": "enum"
        }, {
            "id": "ticks_past_major",
            "title": "Klikken voorbij de kleur",
            "options": [{
                "value": "na",
                "title": "NVT"
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
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '0') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '0') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '1') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '1') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '2') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '2') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '2') {
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '3') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '3') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '3') {
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '4') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '4') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '4') {
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'no' && dial_major_color === 'na' && ticks_past_major === '5') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'no' && dial_major_color === 'red10' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange16' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green22' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue28' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red34' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'blue40' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'green46' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'orange52' && ticks_past_major === '5') {
                return 0
            }
            if (yellow_moved === 'no' && dial_major_color === 'red58' && ticks_past_major === '5') {
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === 'na') {
                return 0
            }
            if (yellow_moved === 'yes' && dial_major_color === 'red10' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'orange16' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'green22' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'blue28' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'red34' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'blue40' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'green46' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'orange52' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'red58' && ticks_past_major === 'na') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '0') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '3') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '4') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("De wijzer kan niet zover draaien")
            }
            if (yellow_moved === 'yes' && dial_major_color === 'na' && ticks_past_major === '5') {
                return new Error("Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen")
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
                return new Error("De wijzer kan niet zover draaien")
            }
        }]
    }, {
        "title": "Flexibiliteit",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het model is 90⁰ gedraaid tegen de richting van de klok in ten opzichte van de beginpositie.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "objectives": [{
            "id": "model_rotated",
            "title": "Model is 90 graden tegen de klok in gedraaid",
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
        "title": "Strafpunten",
        "description": "training-desc",
        "objectives": [{
            "id": "penalties_objective",
            "title": "Robot, rommel of uitvouwstrafpunten",
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
    }],
    "strings": {
        "yes": "Ja",
        "no": "Nee",
        "engineering-name": "Reverse Engineering",
        "engineering-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Jullie mand is in de basis.</li><li>Het model raakt de witte cirkel rond het projectonderwijs-model aan.</li><li>Jullie hebben een model gemaakt ‘identiek’ aan het model dat het andere team in jullie mand heeft gedaan. De verbindingen tussen de elementen moeten hetzelfde zijn, maar elementen mogen wel ‘gedraaid’ zitten.</li><li>Het model is in de basis.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "basket-desc": "Mand in de basis",
        "identical-desc": "Jullie model ligt in de basis en is ‘identiek’",
        "doors-name": "Deuren openen",
        "doors-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li> De deur moet ver genoeg geopend zijn zodat de scheidsrechter dit kan zien.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De hendel moet omlaag gedrukt zijn.</li></ul>",
        "dooropen-desc": "Deur geopend door de hendel omlaag te drukken",
        "projectbased-name": "Projectonderwijs",
        "projectbased-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De lussen (welke symbool staan voor kennis en vaardigheden) hangen aan de weegschaal zoals getoond.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "loops-desc": "Lussen aan de weegschaal",
        "apprentice-name": "Stagelopen",
        "apprentice-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De LEGO-poppetjes zijn beiden verbonden (op een manier naar keuze) aan een model dat jullie ontwerpen en meenemen. Dit model stelt een vaardigheid, prestatie, carrière of hobby voor dat een speciale betekenis voor jullie team heeft.</li><li>Het model raakt de witte cirkel rond het projectonderwijs-model aan.</li><li>Het model is niet in de basis.</li><li>Het vastmaken van missiemodellen is normaal niet toegestaan vanwege regel 39.4, deze missie is daar een uitzondering op.</li><li>Het eigen model mag simpel, of complex zijn, het mag primitief of realistisch zijn, de keuze is aan jullie. De keuze wat voor model jullie bouwen, heeft geen invloed op de score.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "modelshown-desc": "Model getoond aan de scheidsrechter",
        "touchingcicrle-desc": "Raakt de cirkel, niet in de basis en poppetjes verbonden",
        "apprentice-error": "Model moet getoond zijn voordat het de cirkel kan aanraken",
        "search-name": "Zoekmachine",
        "search-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het kleurenwiel heeft minimaal een keer gedraaid.</li><li>Als één kleur verschijnt in het witte frame, dan raakt de lus van de zichtbare kleur het model niet meer aan.</li><li>Als twee kleuren verschijnen in het witte venster, dan is de lus van de kleur die niet zichtbaar is in het venster, de lus die het model niet meer raakt.</li><li>Beide lussen die niet verwijderd dienen te worden raken via ‘hun’ gaten het model aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Alleen de beweging van de schuif heeft het kleurenwiel in beweging gebracht.</li></ul>",
        "wheelspin-desc": "Alleen de schuif heeft het wiel 1+ keer rondgedraaid",
        "searchloop-desc": "Alleen de juiste lus is verwijderd",
        "sports-name": "Sport",
        "sports-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De bal raakt de mat in het doel.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Alle onderdelen die met het schot te maken hebben waren volledig ten noordoosten van de ‘schietlijn’ op het moment dat de bal werd losgelaten richting het doel.</li></ul>",
        "ballshot-desc": "Schot genomen vanuit positie Noord-Oost van de lijn",
        "ballscored-desc": "Bal raakt de mat in het doel aan het eind van de wedstrijd",
        "sports-error": "Bal moet eerst geschoten zijn voordat het in het doel kan zijn",
        "competition-name": "Robotwedstrijden",
        "competition-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het blauw-geel-rode robotelement (model) is geïnstalleerd in de robotarm zoals zichtbaar op de afbeelding.</li><li>De lus raakt niet langer de robotarm aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen strategisch object raakt de robotarm aan.</li><li>De lus werd alleen door het gebruik van de zwarte schuif losgemaakt.</li></ul>",
        "roboticsinsert-desc": "Alleen het robotelement is geïnstalleerd in de robotarm",
        "competitionloop-desc": "Lus raakt de robotarm niet aan",
        "senses-name": "Gebruik de juiste zintuigen en leerstijlen",
        "senses-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De lus raakt het zintuigen model niet meer aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De lus werd alleen door het gebruik van de schuif losgemaakt.</li></ul>",
        "sensesloop-desc": "Lus raakt het model niet aan",
        "remotecomm-name": "Leren/communiceren op afstand",
        "remotecomm-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Geen.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De scheidsrechter heeft gezien dat de schuif door de robot westwaarts is verplaatst.</li></ul>",
        "pullslider-desc": "Scheids zag de robot de schuif verplaatsen",
        "outsidebox-name": "Outside the Box denken",
        "outsidebox-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het ‘idee-model’ raakt niet langer het ‘doos-model’ aan.</li><li>Als het ‘idee-model’ het ‘doos-model’ niet meer aanraakt, is de afbeelding van de gloeilamp van bovenaf zichtbaar.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Het ‘doos-model’ is nooit in de basis geweest.</li></ul>",
        "bulbup-desc": "Idee-model raakt de doos niet, Doos niet in basis geweest, Lamp is naar boven gericht",
        "bulbdown-desc": "Idee-model raakt de doos niet, Doos niet in basis geweest, Lamp is naar beneden gericht",
        "outsidebox-error": "De lamp kan niet tegelijk naar boven en beneden gericht zijn",
        "community-name": "Gemeenschappelijk leren",
        "community-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De ‘kennis & vaardigheden lus’ raakt het gemeenschapsmodel niet meer aan.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "communityloop-desc": "Lus raakt het model niet aan",
        "cloud-name": "Cloud toegang",
        "cloud-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De SD-kaart staat omhoog.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De juiste “key” is in de Cloud geplaatst.</li></ul>",
        "sdcardup-desc": "SD card staat omhoog omdat de juiste \"key\" is ingebracht",
        "engagement-name": "Betrokkenheid",
        "engagement-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het gele gedeelte is naar het zuiden verplaatst.</li><li>Het rad is duidelijk met de klok mee gedraaid ten opzichte van de start positie. Zie het overzicht voor de score.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>De wijzer mag alleen verplaatst worden doordat de robot aan het rad te draait.</li><li>De robot mag het rad maar een keer 180⁰ draaien, per keer dat de basis wordt verlaten. De scheidsrechter zal extra draaiingen ongedaan maken</li></ul>",
        "yellow-moved-desc": "Gele gedeelte is naar het zuiden verplaatst",
        "dial-major-color-desc": "Aangewezen kleur",
        "ticks-past-major-desc": "Klikken voorbij de kleur",
        "na": "NVT",
        "red-10": "Rood 10%",
        "orange-16": "Oranje 16%",
        "green-22": "Groen 22%",
        "blue-28": "Blauw 28%",
        "red-34": "Rood 34%",
        "blue-40": "Blauw 40%",
        "green-46": "Groen 46%",
        "orange-52": "Oranje 52%",
        "red-58": "Rood 58%",
        "ticks-0": "0",
        "ticks-1": "1",
        "ticks-2": "2",
        "ticks-3": "3",
        "ticks-4": "4",
        "ticks-5": "5",
        "engagement-na-error": "Er moet of twee keer \"NVT\" of twee keer een waarde worden gekozen",
        "engagement-max-error": "De wijzer kan niet zover draaien",
        "changing-conditions-name": "Flexibiliteit",
        "changing-conditions-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Het model is 90⁰ gedraaid tegen de richting van de klok in ten opzichte van de beginpositie.</li></ul> <b>Vereiste methode en beperkingen:</b> <ul><li>Geen.</li></ul>",
        "model-rotated-desc": "Model is 90 graden tegen de klok in gedraaid",
        "penalties-name": "Strafpunten",
        "penalties-desc": "Als een aanraakstrafpunt, rommelstrafpunt of uitvouwstrafpunt wordt toegekend (zoals beschreven in de Regels 32, 33, 43, 44 en 45), plaatst de scheidsrechter een markering (zie afbeelding) op de mat. De markeringen worden geplaatst op een manier dat ze jullie of jullie robot niet in de weg zitten. Verloren vracht is op zichzelf een penalty en dus geen rommelstrafpunt.",
        "penalties-objective-desc": "Robot, rommel of uitvouwstrafpunten"
    }
}
