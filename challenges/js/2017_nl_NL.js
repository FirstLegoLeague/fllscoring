{
    "title": "HYDRO DYNAMICS",
    "missions": [{
        "title": "M01 Leiding verwijderen",
        "description": "Verplaats de gebroken leiding zodat deze volledig in de basis is.",
        "objectives": [{
            "id": "M01",
            "title": "Gebroken leiding is volledig in de basis",
            "type": "yesno"
        }],
        "score": [function(M01) {
            if (M01 === 'no') {
                return 0
            }
            if (M01 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M02 Stroming",
        "description": "Verplaats een Groot Water (maximaal één keer) naar het veld van het andere team, *alleen door het draaien van de klep(pen) van het pompsysteem.",
        "objectives": [{
            "id": "M02",
            "title": "Groot Water is op het veld van het andere team (alleen door het draaien van de klep(pen) van het pompsysteem)",
            "type": "yesno"
        }],
        "score": [function(M02) {
            if (M02 === 'no') {
                return 0
            }
            if (M02 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "M03 Extra pomp plaatsen",
        "description": "Verplaats de extra pomp zodat deze de mat raakt en het raakvlak volledig in het Pomp plaatsingsgebied is.",
        "objectives": [{
            "id": "M03",
            "title": "De extra pomp raakt de mat volledig in het Pomp plaatsingsgebied",
            "type": "yesno"
        }],
        "score": [function(M03) {
            if (M03 === 'no') {
                return 0
            }
            if (M03 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M04 Regen",
        "description": "Laat tenminste één Regendruppel uit de regenwolk komen.",
        "objectives": [{
            "id": "M04",
            "title": "Tenminste een regendruppel is uit de regenwolk",
            "type": "yesno"
        }],
        "score": [function(M04) {
            if (M04 === 'no') {
                return 0
            }
            if (M04 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M05 Filter",
        "description": "Verplaats het filter noordwaarts tot de blokkeringsgrendel valt.",
        "objectives": [{
            "id": "M05",
            "title": "Blokkeringshendel is gevallen",
            "type": "yesno"
        }],
        "score": [function(M05) {
            if (M05 === 'no') {
                return 0
            }
            if (M05 === 'yes') {
                return 30
            }
        }]
    }, {
        "title": "M06 Waterzuivering",
        "description": "Laat het waterzuiveringsmodel het grote water uitwerpen, *alleen door het bewegen van de toilethendel.",
        "objectives": [{
            "id": "M06",
            "title": "Groot water is uit het waterzuiveringsmodel geworpen (alleen door de toilethendel)",
            "type": "yesno"
        }],
        "score": [function(M06) {
            if (M06 === 'no') {
                return 0
            }
            if (M06 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M07 Fontein",
        "description": "Laat de middelste laag van de fontein duidelijk wat omhoog komen, uitsluitend door het plaatsen van een Groot Water in de grijze kuip.",
        "objectives": [{
            "id": "M07",
            "title": "Middelste laag is omhoog (alleen door groot water in de grijze kuip)",
            "type": "yesno"
        }],
        "score": [function(M07) {
            if (M07 === 'no') {
                return 0
            }
            if (M07 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M08 Putdeksels",
        "description": "Draai putdeksel(s) om, duidelijk voorbij verticaal *zonder dat ze ooit in de basis zijn geweest. 15 punten PER DEKSEL\r\nIeder deksel scoort individueel.",
        "objectives": [{
            "id": "M08_1",
            "title": "Putdeksels die voorbij verticaal zijn (en nooit in de basis geweest)",
            "options": [{
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
        }, {
            "id": "M08_2",
            "title": "Putdeksels die voorbij verticaal zijn en volledig in aparte Statiefgebieden",
            "type": "yesno"
        }],
        "score": [function(M08_1, M08_2) {
            if (M08_1 === '0' && M08_2 === 'no') {
                return 0
            }
            if (M08_1 === '1' && M08_2 === 'no') {
                return 15
            }
            if (M08_1 === '2' && M08_2 === 'no') {
                return 30
            }
            if (M08_1 === '0' && M08_2 === 'yes') {
                return new Error("Onmogelijke combinatie")
            }
            if (M08_1 === '1' && M08_2 === 'yes') {
                return new Error("Onmogelijke combinatie")
            }
            if (M08_1 === '2' && M08_2 === 'yes') {
                return 60
            }
        }]
    }, {
        "title": "M09 Statief",
        "description": "Verplaats het statief van de inspectiecamera.",
        "objectives": [{
            "id": "M09",
            "title": "Alle poten van het statief raken de mat aan en het statief is .. in een Statiefgebied",
            "options": [{
                "value": "completely",
                "title": "Volledig"
            }, {
                "value": "partially",
                "title": "Gedeeltelijk"
            }, {
                "value": "none",
                "title": "Nee"
            }],
            "type": "enum"
        }],
        "score": [function(M09) {
            if (M09 === 'none') {
                return 0
            }
            if (M09 === 'partially') {
                return 15
            }
            if (M09 === 'completely') {
                return 20
            }
        }]
    }, {
        "title": "M10 Leiding vervangen",
        "description": "Verplaats een nieuwe leiding naar de plaats waar de gebroken leiding zich bevond, in volledig/vlak contact met de mat.",
        "objectives": [{
            "id": "M10",
            "title": "Nieuwe leiding is verplaatst naar plaats gebroken leiding en heeft volledig/vlak contact met de mat",
            "type": "yesno"
        }],
        "score": [function(M10) {
            if (M10 === 'no') {
                return 0
            }
            if (M10 === 'yes') {
                return 20
            }
        }]
    }, {
        "title": "M11 Leidingenconstructie",
        "description": "Verplaats een nieuwe leiding.",
        "objectives": [{
            "id": "M11",
            "title": "Nieuwe leiding heeft volledig/vlak contact met de mat en is .. in zijn doel",
            "options": [{
                "value": "completely",
                "title": "Volledig"
            }, {
                "value": "partially",
                "title": "Gedeeltelijk"
            }, {
                "value": "none",
                "title": "Nee"
            }],
            "type": "enum"
        }],
        "score": [function(M11) {
            if (M11 === 'none') {
                return 0
            }
            if (M11 === 'partially') {
                return 15
            }
            if (M11 === 'completely') {
                return 20
            }
        }]
    }, {
        "title": "M12 Slib",
        "description": "Verplaats het slib zodat dit het zichtbare hout van een van de zes getekende plantenbakken aanraakt.",
        "objectives": [{
            "id": "M12",
            "title": "Slib raakt het zichtbare hout van een getekende plantenbak aan",
            "type": "yesno"
        }],
        "score": [function(M12) {
            if (M12 === 'no') {
                return 0
            }
            if (M12 === 'yes') {
                return 30
            }
        }]
    }, {
        "title": "M13 Bloem",
        "description": "Laat de bloem duidelijk wat omhoogkomen en daar staan, uitsluitend door Groot Water in de bruine pot.",
        "objectives": [{
            "id": "M13_1",
            "title": "Bloem is omhooggekomen (alleen door groot water in de bruine pot)",
            "type": "yesno"
        }, {
            "id": "M13_2",
            "title": "Tenminste een regendruppel is in het paarse deel en raakt niets aan dan het bloemmodel",
            "type": "yesno"
        }],
        "score": [function(M13_1, M13_2) {
            if (M13_1 === 'no' && M13_2 === 'no') {
                return 0
            }
            if (M13_1 === 'no' && M13_2 === 'yes') {
                return 0
            }
            if (M13_1 === 'yes' && M13_2 === 'no') {
                return 30
            }
            if (M13_1 === 'yes' && M13_2 === 'yes') {
                return 60
            }
        }]
    }, {
        "title": "M14 Waterput",
        "description": "Verplaats de waterput zodat deze contact heeft met de mat.",
        "objectives": [{
            "id": "M14",
            "title": "Waterput heeft .. contact met de mat in het doelgebied",
            "options": [{
                "value": "completely",
                "title": "Volledig"
            }, {
                "value": "partially",
                "title": "Gedeeltelijk"
            }, {
                "value": "none",
                "title": "Nee"
            }],
            "type": "enum"
        }],
        "score": [function(M14) {
            if (M14 === 'none') {
                return 0
            }
            if (M14 === 'partially') {
                return 15
            }
            if (M14 === 'completely') {
                return 20
            }
        }]
    }, {
        "title": "M15 Vuur",
        "description": "Laat het vuur zakken *alleen door de brandweerauto directe kracht uit te laten oefenen op de hendel van het huis.",
        "objectives": [{
            "id": "M15",
            "title": "Vuur is gezakt (alleen door directe kracht van de brandweerauto op de hendel van het huis)",
            "type": "yesno"
        }],
        "score": [function(M15) {
            if (M15 === 'no') {
                return 0
            }
            if (M15 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "M16 Waterwinning",
        "description": "Verplaats of vang Groot Water en/of Regendruppel op (maximaal één Regendruppel; geen vervuild water) zodat het de mat aanraakt in het Waterdoel, *zonder dat het Waterdoel ooit de witte begrenzingslijn bereikt zoals in de afbeeldingen hieronder. Water mag het Waterdoel en ander water raken, maar mag noch iets anders aanraken noch door iets anders geleid worden. Ieder watermodel scoort individueel.",
        "objectives": [{
            "id": "M16_1",
            "title": "Waterdoel is ten oosten van de witte begrenzingslijn (en heeft de begrenzingslijn nooit bereikt)",
            "type": "yesno"
        }, {
            "id": "M16_2",
            "title": "Tenminste een regendruppel raakt de mat in waterdoel",
            "type": "yesno"
        }, {
            "id": "M16_4",
            "title": "Een paar groot waters staat op elkaar in waterdoel",
            "type": "yesno"
        }, {
            "id": "M16_3",
            "title": "Groot water raakt de mat in waterdoel",
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
        "score": [function(M16_1, M16_2, M16_3, M16_4) {
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'no' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'no') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '0' && M16_4 === 'yes') {
                return 0
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'no') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '1' && M16_4 === 'yes') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'no') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '2' && M16_4 === 'yes') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'no') {
                return 30
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '3' && M16_4 === 'yes') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'no') {
                return 40
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '4' && M16_4 === 'yes') {
                return 70
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'no') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'no' && M16_3 === '5' && M16_4 === 'yes') {
                return 80
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'no') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '0' && M16_4 === 'yes') {
                return 10
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'no') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '1' && M16_4 === 'yes') {
                return 20
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'no') {
                return 30
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '2' && M16_4 === 'yes') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'no') {
                return 40
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '3' && M16_4 === 'yes') {
                return 70
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'no') {
                return 50
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '4' && M16_4 === 'yes') {
                return 80
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'no') {
                return 60
            }
            if (M16_1 === 'yes' && M16_2 === 'yes' && M16_3 === '5' && M16_4 === 'yes') {
                return 90
            }
        }]
    }, {
        "title": "M17 Katapult",
        "description": "Verplaats de katapult zodat deze volledig in het doelgebied van de katapult is.",
        "objectives": [{
            "id": "M17_1",
            "title": "Katapult is volledig in het doelgebied",
            "type": "yesno"
        }, {
            "id": "M17_2",
            "title": "Regen en vuil water zijn in het doelgebied",
            "type": "yesno"
        }],
        "score": [function(M17_1, M17_2) {
            if (M17_1 === 'no' && M17_2 === 'no') {
                return 0
            }
            if (M17_1 === 'no' && M17_2 === 'yes') {
                return 0
            }
            if (M17_1 === 'yes' && M17_2 === 'no') {
                return 20
            }
            if (M17_1 === 'yes' && M17_2 === 'yes') {
                return 35
            }
        }]
    }, {
        "title": "M18 Kraan",
        "description": "Maak het waterniveau duidelijk blauwer dan wit, van bovenaf het kopje gezien, *alleen door het handvat van de kraan te draaien.",
        "objectives": [{
            "id": "M18",
            "title": "Waterniveau is duidelijk blauwer dan wit (alleen door draaien aan handvat van de kraan)",
            "type": "yesno"
        }],
        "score": [function(M18) {
            if (M18 === 'no') {
                return 0
            }
            if (M18 === 'yes') {
                return 25
            }
        }]
    }, {
        "title": "Strafpunten",
        "description": "Gegeven strafpunten",
        "objectives": [{
            "id": "penalties",
            "title": "Aantal strafpuntschijven in de witte driehoek",
            "options": [{
                "value": "6",
                "title": "6"
            }, {
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
                return -5
            }
            if (penalties === '2') {
                return -10
            }
            if (penalties === '3') {
                return -15
            }
            if (penalties === '4') {
                return -20
            }
            if (penalties === '5') {
                return -25
            }
            if (penalties === '6') {
                return -30
            }
        }]
    }],
    "strings": {
        "yes": "Ja",
        "no": "Nee",
        "M01-name": "M01 Leiding verwijderen",
        "M01-desc": "Verplaats de gebroken leiding zodat deze volledig in de basis is.",
        "M01-scoring": "Gebroken leiding is volledig in de basis",
        "M02-name": "M02 Stroming",
        "M02-desc": "Verplaats een Groot Water (maximaal één keer) naar het veld van het andere team, *alleen door het draaien van de klep(pen) van het pompsysteem.",
        "M02-scoring": "Groot Water is op het veld van het andere team (alleen door het draaien van de klep(pen) van het pompsysteem)",
        "M03-name": "M03 Extra pomp plaatsen",
        "M03-desc": "Verplaats de extra pomp zodat deze de mat raakt en het raakvlak volledig in het Pomp plaatsingsgebied is.",
        "M03-scoring": "De extra pomp raakt de mat volledig in het Pomp plaatsingsgebied",
        "M04-name": "M04 Regen",
        "M04-desc": "Laat tenminste één Regendruppel uit de regenwolk komen.",
        "M04-scoring": "Tenminste een regendruppel is uit de regenwolk",
        "M05-name": "M05 Filter",
        "M05-desc": "Verplaats het filter noordwaarts tot de blokkeringsgrendel valt.",
        "M05-scoring": "Blokkeringshendel is gevallen",
        "M06-name": "M06 Waterzuivering",
        "M06-desc": "Laat het waterzuiveringsmodel het grote water uitwerpen, *alleen door het bewegen van de toilethendel.",
        "M06-scoring": "Groot water is uit het waterzuiveringsmodel geworpen (alleen door de toilethendel)",
        "M07-name": "M07 Fontein",
        "M07-desc": "Laat de middelste laag van de fontein duidelijk wat omhoog komen, uitsluitend door het plaatsen van een Groot Water in de grijze kuip.",
        "M07-scoring": "Middelste laag is omhoog (alleen door groot water in de grijze kuip)",
        "M08-name": "M08 Putdeksels",
        "M08-desc": "Draai putdeksel(s) om, duidelijk voorbij verticaal *zonder dat ze ooit in de basis zijn geweest. 15 punten PER DEKSEL\r\nIeder deksel scoort individueel.",
        "M08-scoring1": "Putdeksels die voorbij verticaal zijn (en nooit in de basis geweest)",
        "M08-scoring2": "2 deksels in aparte Statiefgebieden",
        "M08-scoring3": "Putdeksels die voorbij verticaal zijn en volledig in aparte Statiefgebieden",
        "M08-error": "Onmogelijke combinatie",
        "M09-name": "M09 Statief",
        "M09-desc": "Verplaats het statief van de inspectiecamera.",
        "M09-scoring1": "Alle poten van het statief raken de mat aan",
        "M09-scoring2": "Statief is gedeeltelijk in een Statiefgebied",
        "M09-scoring3": "OF Statief is volledig in een Statiefgebied",
        "M09-scoring4": "Alle poten van het statief raken de mat aan en het statief is .. in een Statiefgebied",
        "M09-scoring5": "Nee",
        "M09-scoring6": "Gedeeltelijk",
        "M09-scoring7": "Volledig",
        "M09-error": "Kies een van de twee opties",
        "M10-name": "M10 Leiding vervangen",
        "M10-desc": "Verplaats een nieuwe leiding naar de plaats waar de gebroken leiding zich bevond, in volledig/vlak contact met de mat.",
        "M10-scoring1": "Nieuwe leiding is verplaatst naar plaats gebroken leiding",
        "M10-scoring2": "Nieuwe leiding heeft volledig/vlak contact met de mat",
        "M10-scoring3": "Nieuwe leiding is verplaatst naar plaats gebroken leiding en heeft volledig/vlak contact met de mat",
        "M11-name": "M11 Leidingenconstructie",
        "M11-desc": "Verplaats een nieuwe leiding.",
        "M11-scoring1": "Nieuwe leiding heeft volledig/vlak contact met de mat",
        "M11-scoring2": "Nieuwe leiding is gedeeltelijk in zijn doel",
        "M11-scoring3": "OF nieuwe leiding is volledig in zijn doel",
        "M11-scoring4": "Nieuwe leiding heeft volledig/vlak contact met de mat en is .. in zijn doel",
        "M11-scoring5": "Nee",
        "M11-scoring6": "Gedeeltelijk",
        "M11-scoring7": "Volledig",
        "M12-name": "M12 Slib",
        "M12-desc": "Verplaats het slib zodat dit het zichtbare hout van een van de zes getekende plantenbakken aanraakt.",
        "M12-scoring": "Slib raakt het zichtbare hout van een getekende plantenbak aan",
        "M13-name": "M13 Bloem",
        "M13-desc": "Laat de bloem duidelijk wat omhoogkomen en daar staan, uitsluitend door Groot Water in de bruine pot.",
        "M13-scoring1": "Bloem is omhooggekomen (alleen door groot water in de bruine pot)",
        "M13-scoring2": "Tenminste een regendruppel is in het paarse deel en raakt niets aan dan het bloemmodel",
        "M14-name": "M14 Waterput",
        "M14-desc": "Verplaats de waterput zodat deze contact heeft met de mat.",
        "M14-scoring1": "Waterput heeft gedeeltelijk in het doelgebied contact met de mat",
        "M14-scoring2": "Waterput heeft volledig in het doelgebied contact met de mat",
        "M14-scoring4": "Waterput heeft .. contact met de mat in het doelgebied",
        "M14-scoring5": "Nee",
        "M14-scoring6": "Gedeeltelijk",
        "M14-scoring7": "Volledig",
        "M15-name": "M15 Vuur",
        "M15-desc": "Laat het vuur zakken *alleen door de brandweerauto directe kracht uit te laten oefenen op de hendel van het huis.",
        "M15-scoring": "Vuur is gezakt (alleen door directe kracht van de brandweerauto op de hendel van het huis)",
        "M16-name": "M16 Waterwinning",
        "M16-desc": "Verplaats of vang Groot Water en/of Regendruppel op (maximaal één Regendruppel; geen vervuild water) zodat het de mat aanraakt in het Waterdoel, *zonder dat het Waterdoel ooit de witte begrenzingslijn bereikt zoals in de afbeeldingen hieronder. Water mag het Waterdoel en ander water raken, maar mag noch iets anders aanraken noch door iets anders geleid worden. Ieder watermodel scoort individueel.",
        "M16-scoring1": "Waterdoel is ten oosten van de witte begrenzingslijn (en heeft de begrenzingslijn nooit bereikt)",
        "M16-scoring2": "Tenminste een regendruppel raakt de mat in waterdoel",
        "M16-scoring3": "Groot water raakt de mat in waterdoel",
        "M16-scoring4": "Een paar groot waters staat op elkaar in waterdoel",
        "M17-name": "M17 Katapult",
        "M17-desc": "Verplaats de katapult zodat deze volledig in het doelgebied van de katapult is.",
        "M17-scoring1": "Katapult is volledig in het doelgebied",
        "M17-scoring2": "Regen en vuil water zijn in het doelgebied",
        "M18-name": "M18 Kraan",
        "M18-desc": "Maak het waterniveau duidelijk blauwer dan wit, van bovenaf het kopje gezien, *alleen door het handvat van de kraan te draaien.",
        "M18-scoring": "Waterniveau is duidelijk blauwer dan wit (alleen door draaien aan handvat van de kraan)",
        "penalties-name": "Strafpunten",
        "penalties-desc": "Gegeven strafpunten",
        "penalties-scoring": "Aantal strafpuntschijven in de witte driehoek"
    }
}
