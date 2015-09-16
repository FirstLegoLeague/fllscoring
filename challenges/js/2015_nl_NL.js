{
    "title": "Trash Trek",
    "missions": [{
        "title": "Gerecycled materiaal gebruiken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Groene containers bevatten tenminste één (1) overeenkomstige gele OF blauwe staaf van het andere team en bevindt zich volledig in jullie “Safety”.</li></ul>",
        "objectives": [{
            "id": "containers",
            "title": "Containers met minimaal een gele of blauwe staaf van het andere team in safety",
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
        "title": "Methaan",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "objectives": [{
            "id": "truck_factory",
            "title": "Aantal methaan in de vrachtwagen of fabriek",
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
        "title": "Vervoer",
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
        "title": "Sorteren gele/blauwe staven",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie westelijke “Transfer”. (<font color=\"red\"><b>PUNTEN:</b> per container</font>)</li><li>Volledig in jullie westelijke “Transfer”-gebied en/of volledig op jullie westelijke “Transfer”.</li><li>Nooit volledig in het westelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "inwesttransfer",
            "title": "Staven die zich in of op de westelijke transfer bevinden",
            "type": "number",
            "min": "0",
            "max": "15"
        }, {
            "id": "anywhereelese",
            "title": "Staven die nooit in het westelijke transfergebied geweest zijn",
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
        "title": "Sorteren zwarte staven",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \r\n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\r\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "inflowerbox",
            "title": "Staven onderdeel van een scorende bloempot of in startpositie",
            "type": "number",
            "min": "0",
            "max": "8"
        }, {
            "id": "greenbinlandfill",
            "title": "Staven in de bijbehorende groene container, of in de vuilnisbelt-container",
            "type": "number",
            "min": "0",
            "max": "8"
        }, {
            "id": "blackanywhere",
            "title": "Ergens anders, waar dan ook (minpunten)",
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
        "title": "Carierre",
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
        "title": "Sloopauto's",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd (voor één van beide opties worden punten toegekend):</b><ul><li>De voorruit en motor zijn geïnstalleerd in de ‘ongevouwen ’ auto op de juiste plek en in de juiste richting.</li><li>De auto is volledig opgevouwen en bevindt zich volledig in het  oostelijke “Transfer”-gebied.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing/vouwing niet nodig.</li><li><b>BEPERKING:</b> De auto mag zich nooit in “Safety” hebben bevonden, zelfs niet gedeeltelijk.</li></ul>",
        "objectives": [{
            "id": "positioncar",
            "title": "Auto is in de safety-zone",
            "options": [{
                "value": "engineinstalled",
                "title": "De motor is geinstalleerd in de ongevouwen auto in de juiste richting en plek"
            }, {
                "value": "carfolded",
                "title": "De auto is volledig opgevouwen en bevindt zich in oostelijk transfer gebied"
            }, {
                "value": "none",
                "title": "De auto heeft zich nooit in safety zone hebben bevonden"
            }],
            "type": "enum"
        }, {
            "id": "scrapcarsyesno",
            "title": "de auto is opgevouwen en in oostelijk gebied",
            "type": "yesno"
        }],
        "score": [function(positioncar, scrapcarsyesno) {
            if (positioncar === 'engineinstalled' && scrapcarsyesno === 'no') {
                return 65
            }
            if (positioncar === 'engineinstalled' && scrapcarsyesno === 'yes') {
                return 0
            }
            if (positioncar === 'carfolded' && scrapcarsyesno === 'no') {
                return 50
            }
            if (positioncar === 'carfolded' && scrapcarsyesno === 'yes') {
                return 0
            }
            if (positioncar === 'none' && scrapcarsyesno === 'no') {
                return 0
            }
            if (positioncar === 'none' && scrapcarsyesno === 'yes') {
                return 0
            }
        }]
    }, {
        "title": "Schoonmaak",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd (punten voor elk voorwerp/dier dat aan de voorwaarden voldoet):</b><ul><li>Plastic tasjes bevinden zich volledig in “Safety”.</li><li>De dieren bevinden zich volledig in grote cirkels die volledig vrij zijn van plastic tasjes.</li><li>De kip bevindt zich volledig in de kleine cirkel.</li></ul><p>* De vis van het afvalvoedsel (bestemd voor de compostmissie (M08) telt niet als dier voor deze missie</p>",
        "objectives": [{
            "id": "bags",
            "title": "Plastic tassen bevinden zich volledig in safety",
            "type": "number",
            "min": "0",
            "max": "2"
        }, {
            "id": "animals",
            "title": "De dieren bevinden zich volledig in de grote cirkels die vrij zijn van tassen",
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
        "title": "Composteren",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost is uitgestoten, maar bevindt zich niet volledig in “Safety”.</li><li>De compost bevindt zich volledig in “Veiligheid”.</li></ul>",
        "objectives": [{
            "id": "compostejected",
            "title": "De compost is uitgestoten maar niet volledig in safety",
            "type": "yesno"
        }, {
            "id": "compostinsafety",
            "title": "De compost is in Safety-zone",
            "type": "yesno"
        }],
        "score": [function(compostejected, compostinsafety) {
            if (compostejected === 'yes' && compostinsafety === 'yes') {
                return 80
            }
            if (compostejected === 'no' && compostinsafety === 'yes') {
                return new Error("compost-error")
            }
            if (compostejected === 'yes' && compostinsafety === 'no') {
                return 60
            }
            if (compostejected === 'no' && compostinsafety === 'no') {
                return 0
            }
        }]
    }, {
        "title": "Behoud",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De waardevolle materialen bevinden zich volledig in “Safety”.</li></ul>",
        "objectives": [{
            "id": "valuablesinsafety",
            "title": "waardevolle materialen zijn volledig in de safety",
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
        "title": "Sloopwerken",
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
        "title": "Aankoopbeslissing",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Speelgoedvliegtuigjes bevinden zich volledig in “Safety”.</li></ul>",
        "objectives": [{
            "id": "purchasing",
            "title": "Speelgoedvliegtuigjes bevinden zich volledig in Safety",
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
        "title": "Hergebruiken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost bevindt zich volledig in één van de verpakkingen waaruit een speelgoedvliegtuigje is verwijderd. De verpakking is in originele staat.</li></ul>",
        "objectives": [{
            "id": "compostinpackage",
            "title": "De Compost bevindt zich volledig in een van de verpakkingen",
            "type": "yesno"
        }, {
            "id": "originalcondition",
            "title": "De verpakking is in originele staat",
            "type": "yesno"
        }],
        "score": [function(compostinpackage, originalcondition) {
            if (compostinpackage === 'yes' && originalcondition === 'yes') {
                return 40
            }
            if (compostinpackage === 'no' && originalcondition === 'yes') {
                return 0
            }
            if (compostinpackage === 'yes' && originalcondition === 'no') {
                return 0
            }
            if (compostinpackage === 'no' && originalcondition === 'no') {
                return 0
            }
        }]
    }],
    "strings": {
        "yes": "Ja",
        "no": "Nee",
        "usingrecycledmaterial-name": "Gerecycled materiaal gebruiken",
        "usingrecycledmaterial-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Groene containers bevatten tenminste één (1) overeenkomstige gele OF blauwe staaf van het andere team en bevindt zich volledig in jullie “Safety”.</li></ul>",
        "containers-desc": "Containers met minimaal een gele of blauwe staaf van het andere team in safety",
        "methane-name": "Methaan",
        "methane-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "truck-factory-desc": "Aantal methaan in de vrachtwagen of fabriek",
        "transport-name": "Vervoer",
        "transport-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (jullie kunnen één of beide missie volbrengen):</b><ul><li>Vrachtwagen draagt het volledige gewicht van de gele container.</li><li>De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen.</li></ul>",
        "trucksupport-desc": "Vrachtwagen draagt het volledige gewicht van de gele container",
        "truckeast-desc": "De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen",
        "sortingblueyellow-name": "Sorteren gele/blauwe staven",
        "sortingblueyellow-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie westelijke “Transfer”. (<font color=\"red\"><b>PUNTEN:</b> per container</font>)</li><li>Volledig in jullie westelijke “Transfer”-gebied en/of volledig op jullie westelijke “Transfer”.</li><li>Nooit volledig in het westelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "inwesttransfer-desc": "Staven die zich in of op de westelijke transfer bevinden",
        "anywhereelese-desc": "Staven die nooit in het westelijke transfergebied geweest zijn",
        "sortingblack-name": "Sorteren zwarte staven",
        "sortingblack-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \r\n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\r\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de westelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "inflowerbox-desc": "Staven onderdeel van een scorende bloempot of in startpositie",
        "greenbinlandfill-desc": "Staven in de bijbehorende groene container, of in de vuilnisbelt-container",
        "blackanywhere-desc": "Ergens anders, waar dan ook (minpunten)",
        "career-name": "Carierre",
        "career-desc": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\r\nTenminste één persoon bevindt zich volledig in het sorteergebied. <font color=\"red\"><b>PUNTEN:</b> 60 + de uitzondering op regel R10: De “Techneuten” van het team en/of de scheidsrechter mogen de sorteermachine met de hand verstoppingen op de oostelijke lopende band herstellen en/of verkeerd gesorteerde staven in de juiste containers plaatsen, inclusief staven die in geen enkele container terecht zijn gekomen.</font></li></ul>",
        "careeryesno-desc": "Tenminste 1 persoon bevindt zich in het sorteergebied",
        "scrapcars-name": "Sloopauto's",
        "scrapcars-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (voor één van beide opties worden punten toegekend):</b><ul><li>De voorruit en motor zijn geïnstalleerd in de ‘ongevouwen ’ auto op de juiste plek en in de juiste richting.</li><li>De auto is volledig opgevouwen en bevindt zich volledig in het  oostelijke “Transfer”-gebied.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing/vouwing niet nodig.</li><li><b>BEPERKING:</b> De auto mag zich nooit in “Safety” hebben bevonden, zelfs niet gedeeltelijk.</li></ul>",
        "positioncar-desc": "Auto is in de safety-zone",
        "scrapcarsyesno-desc": "de auto is opgevouwen en in oostelijk gebied",
        "engineinstalled-desc": "De motor is geinstalleerd in de ongevouwen auto in de juiste richting en plek",
        "carfolded-desc": "De auto is volledig opgevouwen en bevindt zich in oostelijk transfer gebied",
        "nonecarscrap": "De auto heeft zich nooit in safety zone hebben bevonden",
        "cleanup-name": "Schoonmaak",
        "cleanup-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (punten voor elk voorwerp/dier dat aan de voorwaarden voldoet):</b><ul><li>Plastic tasjes bevinden zich volledig in “Safety”.</li><li>De dieren bevinden zich volledig in grote cirkels die volledig vrij zijn van plastic tasjes.</li><li>De kip bevindt zich volledig in de kleine cirkel.</li></ul><p>* De vis van het afvalvoedsel (bestemd voor de compostmissie (M08) telt niet als dier voor deze missie</p>",
        "bags-desc": "Plastic tassen bevinden zich volledig in safety",
        "animals-desc": "De dieren bevinden zich volledig in de grote cirkels die vrij zijn van tassen",
        "chicken-desc": "De kip bevindt zich in de kleine cirkel",
        "composting-name": "Composteren",
        "composting-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost is uitgestoten, maar bevindt zich niet volledig in “Safety”.</li><li>De compost bevindt zich volledig in “Veiligheid”.</li></ul>",
        "compostejected-desc": "De compost is uitgestoten maar niet volledig in safety",
        "compostinsafety-desc": "De compost is in Safety-zone",
        "salvage-name": "Behoud",
        "salvage-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De waardevolle materialen bevinden zich volledig in “Safety”.</li></ul>",
        "valuablesinsafety-desc": "waardevolle materialen zijn volledig in de safety",
        "demolition-name": "Sloopwerken",
        "demolition-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Geen enkele van de twaalf staven van het gebouw staan  nog rechtop in de startpositie.</li></ul>",
        "nobeamsstanding-desc": "Geen van de twaalf staven staan nog rechtop in de startpositie",
        "purchase-name": "Aankoopbeslissing",
        "purchase-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Speelgoedvliegtuigjes bevinden zich volledig in “Safety”.</li></ul>",
        "purchasing-desc": "Speelgoedvliegtuigjes bevinden zich volledig in Safety",
        "repurposing-name": "Hergebruiken",
        "repurposing-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>De compost bevindt zich volledig in één van de verpakkingen waaruit een speelgoedvliegtuigje is verwijderd. De verpakking is in originele staat.</li></ul>",
        "compostinpackage-desc": "De Compost bevindt zich volledig in een van de verpakkingen",
        "originalcondition-desc": "De verpakking is in originele staat"
    }
}
