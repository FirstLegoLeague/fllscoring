{
    "title": "Trash Trek",
    "missions": [{
        "title": "M01 Gerecycled materiaal gebruiken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Groene containers bevatten tenminste één (1) overeenkomstige gele OF blauwe staaf van het andere team en bevindt zich volledig in jullie “Safety”.</li></ul>",
        "objectives": [{
            "id": "containers",
            "title": "Aantal containers met minimaal een gele of blauwe staaf van het andere team in Safety",
            "type": "number",
            "min": "0",
            "max": "6"
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
            if (containers === '3') {
                return 180
            }
            if (containers === '4') {
                return 240
            }
            if (containers === '5') {
                return 300
            }
            if (containers === '6') {
                return 360
            }
        }]
    }, {
        "title": "M02 Methaan",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "objectives": [{
            "id": "truck_factory",
            "title": "Aantal methaan in de vrachtwagen en\\of de fabriek",
            "type": "number",
            "min": "0",
            "max": "2"
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
        "title": "M03 Vervoer",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd (jullie kunnen één of beide missie volbrengen):</b><ul><li>Vrachtwagen draagt het volledige gewicht van de gele container.</li><li>De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen.</li></ul>",
        "objectives": [{
            "id": "trucksupport",
            "title": "Vrachtwagen draagt het volledige gewicht van de gele container",
            "type": "yesno"
        }, {
            "id": "truckeast",
            "title": "De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen",
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
        "title": "M04 Sorteren (gele/blauwe staven)",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie westelijke “Transfer”. (<font color=\"red\"><b>PUNTEN:</b> per container</font>)</li><li>Volledig in jullie westelijke “Transfer”-gebied en/of volledig op jullie westelijke “Transfer”.</li><li>Nooit volledig in het westelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "inwesttransfer",
            "title": "Aantal staven in de bijbehorende groene container (container is in of op jouw westelijke transfer)",
            "type": "number",
            "min": "0",
            "max": "15"
        }, {
            "id": "anywhereelese",
            "title": "Aantal staven in de bijbehorende groene container (staven zijn nooit in jouw westelijke transfergebied geweest)",
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
        "title": "M04 Sorteren (zwarte staven)",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \r\n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\r\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "inflowerbox",
            "title": "Aantal staven in hun startpositie of onderdeel van een scorende bloempot",
            "type": "number",
            "min": "0",
            "max": "8"
        }, {
            "id": "greenbinlandfill",
            "title": "Aantal staven in de bijbehorende groene container, of in de vuilnisbelt-container",
            "type": "number",
            "min": "0",
            "max": "8"
        }, {
            "id": "blackanywhere",
            "title": "Aantal staven ergens anders, waar dan ook (minpunten)",
            "type": "number",
            "min": "0",
            "max": "12"
        }],
        "score": [function(inflowerbox) {
            if (inflowerbox === '0') {
                return 0
            }
            if (inflowerbox === '1') {
                return 8
            }
            if (inflowerbox === '2') {
                return 16
            }
            if (inflowerbox === '3') {
                return 24
            }
            if (inflowerbox === '4') {
                return 32
            }
            if (inflowerbox === '5') {
                return 40
            }
            if (inflowerbox === '6') {
                return 48
            }
            if (inflowerbox === '7') {
                return 56
            }
            if (inflowerbox === '8') {
                return 64
            }
        }, function(greenbinlandfill) {
            if (greenbinlandfill === '0') {
                return 0
            }
            if (greenbinlandfill === '1') {
                return 3
            }
            if (greenbinlandfill === '2') {
                return 6
            }
            if (greenbinlandfill === '3') {
                return 9
            }
            if (greenbinlandfill === '4') {
                return 12
            }
            if (greenbinlandfill === '5') {
                return 15
            }
            if (greenbinlandfill === '6') {
                return 18
            }
            if (greenbinlandfill === '7') {
                return 21
            }
            if (greenbinlandfill === '8') {
                return 24
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
        "title": "M05 Carrières",
        "description": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\r\nTenminste één persoon bevindt zich volledig in het sorteergebied. <font color=\"red\"><b>PUNTEN:</b> 60 + de uitzondering op regel R10: De “Techneuten” van het team en/of de scheidsrechter mogen de sorteermachine met de hand verstoppingen op de oostelijke lopende band herstellen en/of verkeerd gesorteerde staven in de juiste containers plaatsen, inclusief staven die in geen enkele container terecht zijn gekomen.</font></li></ul>",
        "objectives": [{
            "id": "career",
            "title": "Tenminste 1 persoon bevindt zich in het sorteergebied",
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
        "title": "M06 Sloopauto's",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd (voor één van beide opties worden punten toegekend):</b><ul><li>De voorruit en motor zijn geïnstalleerd in de ‘ongevouwen ’ auto op de juiste plek en in de juiste richting.</li><li>De auto is volledig opgevouwen en bevindt zich volledig in het  oostelijke “Transfer”-gebied.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing/vouwing niet nodig.</li><li><b>BEPERKING:</b> De auto mag zich nooit in “Safety” hebben bevonden, zelfs niet gedeeltelijk.</li></ul>",
        "objectives": [{
            "id": "positioncar",
            "title": "De auto heeft zich nooit in Safety bevonden en ...",
            "options": [{
                "value": "engineinstalled",
                "title": "is ongevouwen, en de motor is geinstalleerd in de juiste plek en richting"
            }, {
                "value": "carfolded",
                "title": "is volledig opgevouwen, en is in het oostelijk transfergebied"
            }, {
                "value": "none",
                "title": "(nvt)"
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
        "title": "M07 Schoonmaak",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd (punten voor elk voorwerp/dier dat aan de voorwaarden voldoet):</b><ul><li>Plastic tasjes bevinden zich volledig in “Safety”.</li><li>De dieren bevinden zich volledig in grote cirkels die volledig vrij zijn van plastic tasjes.</li><li>De kip bevindt zich volledig in de kleine cirkel.</li></ul><p>* De vis van het afvalvoedsel (bestemd voor de compostmissie (M08) telt niet als dier voor deze missie</p>",
        "objectives": [{
            "id": "bags",
            "title": "Plastic tasjes die zich in Safety bevinden",
            "type": "number",
            "min": "0",
            "max": "2"
        }, {
            "id": "animals",
            "title": "Dieren die zich in een cirkel bevinden die vrij is van plastic tasjes",
            "type": "number",
            "min": "0",
            "max": "3"
        }, {
            "id": "chicken",
            "title": "De kip bevindt zich in de kleine cirkel",
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
        "title": "M08 Composteren",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost is uitgestoten, maar bevindt zich niet volledig in “Safety”.</li><li>De compost bevindt zich volledig in “Veiligheid”.</li></ul>",
        "objectives": [{
            "id": "compostejected",
            "title": "De compost is...",
            "options": [{
                "value": "compostejectedsafety",
                "title": "uitgestoten en in Safety"
            }, {
                "value": "compostejected",
                "title": "uitgestoten maar niet in Safety"
            }, {
                "value": "none",
                "title": "niet uitgestoten"
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
        "title": "M09 Behoud",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De waardevolle materialen bevinden zich volledig in “Safety”.</li></ul>",
        "objectives": [{
            "id": "valuablesinsafety",
            "title": "De waardevolle materialen zijn in Safety",
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
        "title": "M10 Sloopwerken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Geen enkele van de twaalf staven van het gebouw staan  nog rechtop in de startpositie.</li></ul>",
        "objectives": [{
            "id": "nobeamsstanding",
            "title": "Geen van de twaalf staven staan nog rechtop in de startpositie",
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
        "title": "M11 Aankoopbeslissing",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Speelgoedvliegtuigjes bevinden zich volledig in “Safety”.</li></ul>",
        "objectives": [{
            "id": "purchasing",
            "title": "Aantal speelgoedvliegtuigjes die zich in Safety bevinden",
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
        "title": "M12 Hergebruiken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost bevindt zich volledig in één van de verpakkingen waaruit een speelgoedvliegtuigje is verwijderd. De verpakking is in originele staat.</li></ul>",
        "objectives": [{
            "id": "compostinpackage",
            "title": "De compost bevindt zich in een verpakking en de verpakking is in originele staat",
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
        "yes": "Ja",
        "no": "Nee",
        "usingrecycledmaterial-name": "M01 Gerecycled materiaal gebruiken",
        "usingrecycledmaterial-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Groene containers bevatten tenminste één (1) overeenkomstige gele OF blauwe staaf van het andere team en bevindt zich volledig in jullie “Safety”.</li></ul>",
        "containers-desc": "Aantal containers met minimaal een gele of blauwe staaf van het andere team in Safety",
        "methane-name": "M02 Methaan",
        "methane-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "truck-factory-desc": "Aantal methaan in de vrachtwagen en\\of de fabriek",
        "transport-name": "M03 Vervoer",
        "transport-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (jullie kunnen één of beide missie volbrengen):</b><ul><li>Vrachtwagen draagt het volledige gewicht van de gele container.</li><li>De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen.</li></ul>",
        "trucksupport-desc": "Vrachtwagen draagt het volledige gewicht van de gele container",
        "truckeast-desc": "De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen",
        "sortingblueyellow-name": "M04 Sorteren (gele/blauwe staven)",
        "sortingblueyellow-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie westelijke “Transfer”. (<font color=\"red\"><b>PUNTEN:</b> per container</font>)</li><li>Volledig in jullie westelijke “Transfer”-gebied en/of volledig op jullie westelijke “Transfer”.</li><li>Nooit volledig in het westelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "inwesttransfer-desc": "Aantal staven in de bijbehorende groene container (container is in of op jouw westelijke transfer)",
        "anywhereelese-desc": "Aantal staven in de bijbehorende groene container (staven zijn nooit in jouw westelijke transfergebied geweest)",
        "sortingblack-name": "M04 Sorteren (zwarte staven)",
        "sortingblack-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \r\n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\r\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "inflowerbox-desc": "Aantal staven in hun startpositie of onderdeel van een scorende bloempot",
        "greenbinlandfill-desc": "Aantal staven in de bijbehorende groene container, of in de vuilnisbelt-container",
        "blackanywhere-desc": "Aantal staven ergens anders, waar dan ook (minpunten)",
        "career-name": "M05 Carrières",
        "career-desc": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\r\nTenminste één persoon bevindt zich volledig in het sorteergebied. <font color=\"red\"><b>PUNTEN:</b> 60 + de uitzondering op regel R10: De “Techneuten” van het team en/of de scheidsrechter mogen de sorteermachine met de hand verstoppingen op de oostelijke lopende band herstellen en/of verkeerd gesorteerde staven in de juiste containers plaatsen, inclusief staven die in geen enkele container terecht zijn gekomen.</font></li></ul>",
        "careeryesno-desc": "Tenminste 1 persoon bevindt zich in het sorteergebied",
        "scrapcars-name": "M06 Sloopauto's",
        "scrapcars-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (voor één van beide opties worden punten toegekend):</b><ul><li>De voorruit en motor zijn geïnstalleerd in de ‘ongevouwen ’ auto op de juiste plek en in de juiste richting.</li><li>De auto is volledig opgevouwen en bevindt zich volledig in het  oostelijke “Transfer”-gebied.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing/vouwing niet nodig.</li><li><b>BEPERKING:</b> De auto mag zich nooit in “Safety” hebben bevonden, zelfs niet gedeeltelijk.</li></ul>",
        "positioncar-desc": "De auto heeft zich nooit in Safety bevonden en ...",
        "scrapcarsyesno-desc": "is volledig opgevouwen, en is in het oostelijk transfergebied",
        "engineinstalled-desc": "is ongevouwen, en de motor is geinstalleerd in de juiste plek en richting",
        "carfolded-desc": "is volledig opgevouwen, en is in het oostelijk transfergebied",
        "nonecarscrap": "(nvt)",
        "cleanup-name": "M07 Schoonmaak",
        "cleanup-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (punten voor elk voorwerp/dier dat aan de voorwaarden voldoet):</b><ul><li>Plastic tasjes bevinden zich volledig in “Safety”.</li><li>De dieren bevinden zich volledig in grote cirkels die volledig vrij zijn van plastic tasjes.</li><li>De kip bevindt zich volledig in de kleine cirkel.</li></ul><p>* De vis van het afvalvoedsel (bestemd voor de compostmissie (M08) telt niet als dier voor deze missie</p>",
        "bags-desc": "Plastic tasjes die zich in Safety bevinden",
        "animals-desc": "Dieren die zich in een cirkel bevinden die vrij is van plastic tasjes",
        "chicken-desc": "De kip bevindt zich in de kleine cirkel",
        "composting-name": "M08 Composteren",
        "compostingmission-desc": "De compost is...",
        "composting-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost is uitgestoten, maar bevindt zich niet volledig in “Safety”.</li><li>De compost bevindt zich volledig in “Veiligheid”.</li></ul>",
        "nonecompostejected-desc": "niet uitgestoten",
        "compostejected-desc": "uitgestoten maar niet in Safety",
        "compostejectedsafety-desc": "uitgestoten en in Safety",
        "salvage-name": "M09 Behoud",
        "salvage-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De waardevolle materialen bevinden zich volledig in “Safety”.</li></ul>",
        "valuablesinsafety-desc": "De waardevolle materialen zijn in Safety",
        "demolition-name": "M10 Sloopwerken",
        "demolition-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Geen enkele van de twaalf staven van het gebouw staan  nog rechtop in de startpositie.</li></ul>",
        "nobeamsstanding-desc": "Geen van de twaalf staven staan nog rechtop in de startpositie",
        "purchase-name": "M11 Aankoopbeslissing",
        "purchase-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Speelgoedvliegtuigjes bevinden zich volledig in “Safety”.</li></ul>",
        "purchasing-desc": "Aantal speelgoedvliegtuigjes die zich in Safety bevinden",
        "repurposing-name": "M12 Hergebruiken",
        "repurposing-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost bevindt zich volledig in één van de verpakkingen waaruit een speelgoedvliegtuigje is verwijderd. De verpakking is in originele staat.</li></ul>",
        "compostinpackage-desc": "De compost bevindt zich in een verpakking en de verpakking is in originele staat"
    }
}
