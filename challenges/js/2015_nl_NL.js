{
    "title": "Trash Trek",
    "missions": [{
        "title": "Gerecycled materiaal gebruiken",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Groene containers bevatten tenminste één (1) overeenkomstige gele OF blauwe staaf van het andere team en bevindt zich volledig in jullie “Safety”.</li></ul>",
        "objectives": [{
            "id": "containersself",
            "title": "Eigen containers",
            "type": "number",
            "min": "0",
            "max": "3"
        }, {
            "id": "containersother",
            "title": "Containers anderen",
            "type": "number",
            "min": "0",
            "max": "3"
        }],
        "score": [function(containersself) {
            if (containersself === '0') {
                return 0
            }
            if (containersself === '1') {
                return 60
            }
            if (containersself === '2') {
                return 120
            }
            if (containersself === '3') {
                return 180
            }
        }, function(containersother) {
            if (containersother === '0') {
                return 0
            }
            if (containersother === '1') {
                return 60
            }
            if (containersother === '2') {
                return 120
            }
            if (containersother === '3') {
                return 180
            }
        }]
    }, {
        "title": "Methaan",
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "objectives": [{
            "id": "truck",
            "title": "Er zit een methaan in de vrachtwagen",
            "type": "yesno"
        }, {
            "id": "factory",
            "title": "Er zit een methaan in de fabriek",
            "type": "yesno"
        }],
        "score": [function(truck, factory) {
            if (truck === 'no' && factory === 'no') {
                return 0
            }
            if (truck === 'no' && factory === 'yes') {
                return 40
            }
            if (truck === 'yes' && factory === 'no') {
                return 40
            }
            if (truck === 'yes' && factory === 'yes') {
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
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie oostelijke “Transfer”.</li><li>Volledig in jullie oostelijke “Transfer”-gebied en/of volledig op jullie oostelijke “Transfer”.</li><li>Nooit volledig in het oostelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de oostelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "ineasttransfer",
            "title": "Staaf bevind zich in oostelijke transfer",
            "type": "number",
            "min": "0",
            "max": "15"
        }, {
            "id": "anywhereelese",
            "title": "Nooit in oostelijke transfer",
            "type": "number",
            "min": "0",
            "max": "15"
        }],
        "score": [function(ineasttransfer) {
            if (ineasttransfer === '0') {
                return 0
            }
            if (ineasttransfer === '1') {
                return 7
            }
            if (ineasttransfer === '2') {
                return 14
            }
            if (ineasttransfer === '3') {
                return 21
            }
            if (ineasttransfer === '4') {
                return 28
            }
            if (ineasttransfer === '5') {
                return 35
            }
            if (ineasttransfer === '6') {
                return 42
            }
            if (ineasttransfer === '7') {
                return 49
            }
            if (ineasttransfer === '8') {
                return 56
            }
            if (ineasttransfer === '9') {
                return 63
            }
            if (ineasttransfer === '10') {
                return 70
            }
            if (ineasttransfer === '11') {
                return 77
            }
            if (ineasttransfer === '12') {
                return 84
            }
            if (ineasttransfer === '13') {
                return 91
            }
            if (ineasttransfer === '14') {
                return 98
            }
            if (ineasttransfer === '15') {
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
        "description": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de oostelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "objectives": [{
            "id": "inflowerbox",
            "title": "Onderdeel van een scorende bloempot",
            "type": "number",
            "min": "0",
            "max": "12"
        }, {
            "id": "greenbinlandfill",
            "title": "In de bijbehorende groene container, of in de vuilnisbelt-container",
            "type": "number",
            "min": "0",
            "max": "12"
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
                return 7
            }
            if (inflowerbox === '2') {
                return 14
            }
            if (inflowerbox === '3') {
                return 21
            }
            if (inflowerbox === '4') {
                return 28
            }
            if (inflowerbox === '5') {
                return 35
            }
            if (inflowerbox === '6') {
                return 42
            }
            if (inflowerbox === '7') {
                return 49
            }
            if (inflowerbox === '8') {
                return 56
            }
            if (inflowerbox === '9') {
                return 63
            }
            if (inflowerbox === '10') {
                return 70
            }
            if (inflowerbox === '11') {
                return 77
            }
            if (inflowerbox === '12') {
                return 84
            }
        }, function(greenbinlandfill) {
            if (greenbinlandfill === '0') {
                return 0
            }
            if (greenbinlandfill === '1') {
                return 6
            }
            if (greenbinlandfill === '2') {
                return 12
            }
            if (greenbinlandfill === '3') {
                return 18
            }
            if (greenbinlandfill === '4') {
                return 24
            }
            if (greenbinlandfill === '5') {
                return 30
            }
            if (greenbinlandfill === '6') {
                return 36
            }
            if (greenbinlandfill === '7') {
                return 42
            }
            if (greenbinlandfill === '8') {
                return 48
            }
            if (greenbinlandfill === '9') {
                return 54
            }
            if (greenbinlandfill === '10') {
                return 60
            }
            if (greenbinlandfill === '11') {
                return 66
            }
            if (greenbinlandfill === '12') {
                return 72
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
        "description": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\nTenminste één persoon bevindt zich volledig in het sorteergebied. <font color=\"red\"><b>PUNTEN:</b> 60 + de uitzondering op regel R10: De “Techneuten” van het team en/of de scheidsrechter mogen de sorteermachine met de hand verstoppingen op de westelijke lopende band herstellen en/of verkeerd gesorteerde staven in de juiste containers plaatsen, inclusief staven die in geen enkele container terecht zijn gekomen.</font></li></ul>",
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
        "containersself-desc": "Eigen containers",
        "containersother-desc": "Containers anderen",
        "methane-name": "Methaan",
        "methane-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Methaan bevindt zich in de motor van de vrachtwagen en/of in de energiecentrale van de fabriek.</li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>VERSOEPELING:</b> Volledige/exacte plaatsing is niet nodig</li></ul>",
        "truck-desc": "Er zit een methaan in de vrachtwagen",
        "factory-desc": "Er zit een methaan in de fabriek",
        "transport-name": "Vervoer",
        "transport-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd (jullie kunnen één of beide missie volbrengen):</b><ul><li>Vrachtwagen draagt het volledige gewicht van de gele container.</li><li>De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen.</li></ul>",
        "trucksupport-desc": "Vrachtwagen draagt het volledige gewicht van de gele container",
        "truckeast-desc": "De gele container bevindt zich volledig ten oosten van de geleider van de vrachtwagen",
        "sortingblueyellow-name": "Sorteren gele/blauwe staven",
        "sortingblueyellow-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Gele en/of blauwe staven bevinden zich in de bijbehorende groene container EN de container (containers scoren onafhankelijk van elkaar) bevindt zich:<ul><li>Volledig in de “Safety” van het andere team, d.m.v. van jullie oostelijke “Transfer”.</li><li>Volledig in jullie oostelijke “Transfer”-gebied en/of volledig op jullie oostelijke “Transfer”.</li><li>Nooit volledig in het oostelijke “Transfer”-gebied.</li></ul></li></ul><b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de oostelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "ineasttransfer-desc": "Staaf bevind zich in oostelijke transfer",
        "anywhereelese-desc": "Nooit in oostelijke transfer",
        "sortingblack-name": "Sorteren zwarte staven",
        "sortingblack-desc": "<b>De zichtbare situatie aan het einde van de wedstrijd:</b><ul><li>Zwarte staven bevinden zich (alle staven kunnen individueel punten scoren): \n<ul><li>Onderdeel van een scorende bloempot, of bevinden zich in de originele startpositie.</li><li>In de bijbehorende groene container, of in de vuilnisbelt-container.</li><li>Ergens anders (waar dan ook).</li></ul></li></ul>\n<b>Vereiste methode, berperkingen en versoepelingen:</b><ul><li><b>BEPERKING:</b> De staven mogen alleen rechtstreeks via de oostelijke helling van de sorteermachine in de containers terechtkomen, of d.m.v. de Carrière bonus (M05).</li></ul>",
        "inflowerbox-desc": "Onderdeel van een scorende bloempot",
        "greenbinlandfill-desc": "In de bijbehorende groene container, of in de vuilnisbelt-container",
        "blackanywhere-desc": "Ergens anders, waar dan ook (minpunten)",
        "career-name": "Carierre",
        "career-desc": "<b>De zichtbare situatie tijdens de wedstrijd, wanneer nodig:</b><ul><li>\nTenminste één persoon bevindt zich volledig in het sorteergebied. <font color=\"red\"><b>PUNTEN:</b> 60 + de uitzondering op regel R10: De “Techneuten” van het team en/of de scheidsrechter mogen de sorteermachine met de hand verstoppingen op de westelijke lopende band herstellen en/of verkeerd gesorteerde staven in de juiste containers plaatsen, inclusief staven die in geen enkele container terecht zijn gekomen.</font></li></ul>",
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
