
# wlm-app
Frontend web app for Wiki Loves Monuments Italy

# Project structure

The wlm-app is a frontend web application, providing a user interface with the following purposes:

- browsing WLM Italy monuments and related pitcures
- uploading new pictures for listed monuments on Wikimedia Commons

The application is based on the javascript language and the "react" libary (https://react.dev/) and is available both for desktop and mobile devices.


# Project dependecies and application stack

The application depends on a web api, provided by the wlm-backend: https://gitlab.wikimedia.org/repos/wikimedia-it/wlm/wlm-web-app-backend


# Main User interfaces

The app is composed of 2 main search interface for browsing data:
- **Map view**: which provides a geographical view of monuments
- **List view**: which provides a list of monuments

Each view is interactive and provides access to the **Monument detail** interface, that provides the full details and pictures of the selected monument and gives to logged user the ability to upload pictures.

# APIs

Both the map and the list interface depends on the api provided by the server application.

## Geographical monuments api
This api is used to retrieve informations in geojson format, and is used to get the data for the map view.

This is an example of the api call:

`https://wlm-it-visual.wmcloud.org/api/app/cluster-monuments/?bbox=12.48566827079834,41.88383932894831,12.526609509201661,41.89821542218834&resolution=4.777314267823516&search=&municipality=&ordering=&in_contest=true&only_without_pictures=&category=&user_lat=&user_lon=&monument_lon=0&monument_lat=0&monument_id=0`

The api returns the listing of monuments within the selected bounding box and zoom levels.
For high zoom levels, the monuments are aggregated per province.

## Monumebnts Listing api

The api gives a list of monuments, according to the selected filters: 
Example api call:

`https://wlm-it-visual.wmcloud.org/api/app/monuments/?search=&municipality=&ordering=distance&category=&in_contest=true&only_without_pictures=&user_lat=45.6956782&user_lon=9.6637158`

This is an example  of the api response

```
{
    "count": 92768,
    "next": "https://wlm-it-visual.wmcloud.org/api/app/monuments/?category=&in_contest=true&municipality=&only_without_pictures=&ordering=distance&page=2&search=&user_lat=45.6956782&user_lon=9.6637158",
    "previous": null,
    "results": [
        {
            "id": 119883,
            "label": "ex chiesa di Santa Maria Maddalena",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.08970031518,
            "address": "Via Sant'Alessandro",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.664777777,
                    45.695361111
                ]
            },
            "q_number": "Q79079387"
        },
        {
            "id": 99144,
            "label": "basilica di Sant'Alessandro in Colonna",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 12,
            "pictures_count": 24,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.12556228822999999,
            "address": "Via Sant'Alessandro",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66483,
                    45.69486
                ]
            },
            "q_number": "Q26258352"
        },
        {
            "id": 110933,
            "label": "chiesa di San Leonardo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 12,
            "pictures_count": 16,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.28990258652,
            "address": "Largo Rezzara 2",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66421,
                    45.693094
                ]
            },
            "q_number": "Q93070686"
        },
        {
            "id": 114564,
            "label": "chiesa di San Rocco",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 12,
            "pictures_count": 21,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.37481284543,
            "address": "Via Broseta 26",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.661958,
                    45.692539
                ]
            },
            "q_number": "Q81934602"
        },
        {
            "id": 95302,
            "label": "chiesa della Madonna dello Spasimo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 11,
            "pictures_count": 11,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.3918675398,
            "address": "Via XX Settembre 55",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.667112,
                    45.693072
                ]
            },
            "q_number": "Q112673525"
        },
        {
            "id": 110841,
            "label": "chiesa di San Lazzaro",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.44308956662000004,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6618989,
                    45.6919009
                ]
            },
            "q_number": "Q93578986"
        },
        {
            "id": 171733,
            "label": "chiesa del Cuore Immacolato della Beata Vergine Maria",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.48274761047,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.658003,
                    45.697389
                ]
            },
            "q_number": "Q120661722"
        },
        {
            "id": 111617,
            "label": "chiesa di San Marco",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 16,
            "pictures_count": 30,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.48431338676,
            "address": "Piazzetta San Marco",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.669274,
                    45.6976529
                ]
            },
            "q_number": "Q95201479"
        },
        {
            "id": 181770,
            "label": "Bergamo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 15,
            "pictures_count": 309,
            "in_contest": true,
            "app_category": "Comune",
            "distance": 0.4938654576,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.67,
                    45.695
                ]
            },
            "q_number": "Q628"
        },
        {
            "id": 104051,
            "label": "chiesa della Beata Vergine del Giglio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 10,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.5296193672299999,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662365,
                    45.7003468
                ]
            },
            "q_number": "Q93633519"
        },
        {
            "id": 127932,
            "label": "santuario della Madonna del Giglio",
            "municipality_label": "Alzano Lombardo",
            "municipality": 16008,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.53047042931,
            "address": "",
            "location": "Nese",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66208,
                    45.70031
                ]
            },
            "q_number": "Q61885775"
        },
        {
            "id": 107078,
            "label": "chiesa di San Bernardino",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 5,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.58758349945,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6633784,
                    45.6903992
                ]
            },
            "q_number": "Q74551631"
        },
        {
            "id": 8730,
            "label": "Porta San Giacomo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 61,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 0.61781470531,
            "address": "Via Sant'Alessandro, 73",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662957,
                    45.701209
                ]
            },
            "q_number": "Q26844368"
        },
        {
            "id": 101477,
            "label": "chiesa dei Santi Bartolomeo e Stefano",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 45,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.6368748746,
            "address": "Via Torquato Tasso",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.671877,
                    45.696236
                ]
            },
            "q_number": "Q3668086"
        },
        {
            "id": 125220,
            "label": "monastero Matris Domini",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 29,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.6464686749999999,
            "address": "Via Locatelli 77",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.666896,
                    45.701051
                ]
            },
            "q_number": "Q3818529"
        },
        {
            "id": 118502,
            "label": "chiesa di Santa Lucia",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 14,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.6544409933099999,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.656476,
                    45.6986898
                ]
            },
            "q_number": "Q81995002"
        },
        {
            "id": 247681,
            "label": "chiesa della Beata Vergine Maria dell'Immacolata",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 1,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.65999277201,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.664953,
                    45.689806
                ]
            },
            "q_number": "Q120661725"
        },
        {
            "id": 119742,
            "label": "chiesa di Santa Maria Immacolata delle Grazie",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 25,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.66141352448,
            "address": "Largo Porta Nuova",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.671747,
                    45.6937
                ]
            },
            "q_number": "Q45362416"
        },
        {
            "id": 253254,
            "label": "chiesa della Beata Vergine Immacolata e Tutti i Santi",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.83519952583,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.669278,
                    45.68925
                ]
            },
            "q_number": "Q120661724"
        },
        {
            "id": 99198,
            "label": "basilica di Santa Maria Maggiore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 74,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.84738580344,
            "address": "Piazza Rosate",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66213,
                    45.703218
                ]
            },
            "q_number": "Q2001128"
        },
        {
            "id": 124884,
            "label": "duomo di Bergamo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 6,
            "pictures_count": 63,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.85098032415,
            "address": "Piazza Duomo",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6629,
                    45.70331
                ]
            },
            "q_number": "Q1081902"
        },
        {
            "id": 128609,
            "label": "tempietto di Santa Croce",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 15,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.8535207178099999,
            "address": "Via San Salvatore",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.661663,
                    45.703219
                ]
            },
            "q_number": "Q253654"
        },
        {
            "id": 168436,
            "label": "curia Vescovile",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.86430997286,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.661783,
                    45.703333
                ]
            },
            "q_number": "Q120663187"
        },
        {
            "id": 166201,
            "label": "chiesa di San Paolo Apostolo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.86513091293,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.654969,
                    45.690861
                ]
            },
            "q_number": "Q120663179"
        },
        {
            "id": 13142,
            "label": "Cappella Colleoni",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 11,
            "pictures_count": 35,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.87203712843,
            "address": "piazza Duomo",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66211,
                    45.70344
                ]
            },
            "q_number": "Q1034843"
        },
        {
            "id": 5413,
            "label": "Monumento a Medea",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 9,
            "in_contest": true,
            "app_category": "Altri monumenti",
            "distance": 0.8758953569300001,
            "address": "Piazza Duomo, 5",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66216,
                    45.70348
                ]
            },
            "q_number": "Q107313830"
        },
        {
            "id": 113373,
            "label": "chiesa di San Pancrazio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 10,
            "pictures_count": 18,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.8877443074300001,
            "address": "Piazzetta San Pancrazio",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.664599,
                    45.703638
                ]
            },
            "q_number": "Q28671391"
        },
        {
            "id": 116186,
            "label": "chiesa di Sant'Andrea",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 6,
            "pictures_count": 23,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.89324696084,
            "address": "Via Porta Dipinta",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.668309,
                    45.703043
                ]
            },
            "q_number": "Q3672381"
        },
        {
            "id": 10736,
            "label": "torre del Gombito",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 28,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 0.8954227466,
            "address": "via Gombito",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66389,
                    45.70373
                ]
            },
            "q_number": "Q28670140"
        },
        {
            "id": 99279,
            "label": "battistero della cattedrale di Sant'Alessandro",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 46,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.89908141153,
            "address": "Piazza Duomo",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662083,
                    45.703683
                ]
            },
            "q_number": "Q21153171"
        },
        {
            "id": 104225,
            "label": "chiesa della Conversione di San Paolo (San Paolo d&#39;Argon)",
            "municipality_label": "San Paolo d'Argon",
            "municipality": 16189,
            "pictures_wlm_count": 0,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.9158688336599999,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6547359,
                    45.6903399
                ]
            },
            "q_number": "Q104186207"
        },
        {
            "id": 820,
            "label": "Campanone",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 47,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 0.92311268138,
            "address": "Piazza Vecchia",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66229,
                    45.70392
                ]
            },
            "q_number": "Q3995171"
        },
        {
            "id": 114832,
            "label": "chiesa di San Salvatore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 9,
            "pictures_count": 30,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.9290044203500001,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.661116666,
                    45.703833333
                ]
            },
            "q_number": "Q30337282"
        },
        {
            "id": 116078,
            "label": "chiesa di Sant'Alessandro della Croce",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.95868213479,
            "address": "Via Pignolo",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.67306,
                    45.701312
                ]
            },
            "q_number": "Q28670202"
        },
        {
            "id": 470,
            "label": "Biblioteca civica Angelo Mai e Archivi storici comunali",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 15,
            "in_contest": true,
            "app_category": "Altri monumenti",
            "distance": 0.96522202623,
            "address": "piazza Vecchia, 15, 24129 Bergamo",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6632154,
                    45.7043516
                ]
            },
            "q_number": "Q3639558"
        },
        {
            "id": 97916,
            "label": "oratorio di San Lupo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.96649699693,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.673063,
                    45.7014166
                ]
            },
            "q_number": "Q106562718"
        },
        {
            "id": 112881,
            "label": "chiesa di San Michele all'arco",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 8,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.9804955066200001,
            "address": "Piazza Vecchia",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6629533,
                    45.7044799
                ]
            },
            "q_number": "Q26258033"
        },
        {
            "id": 121978,
            "label": "chiesa di Santo Spirito",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 10,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 0.98941138377,
            "address": "Piazza Santo Spirito",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.675804,
                    45.698487
                ]
            },
            "q_number": "Q18607685"
        },
        {
            "id": 9189,
            "label": "Rocca di Bergamo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 44,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 0.9937218418,
            "address": "Via Rocca",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.666394,
                    45.704417
                ]
            },
            "q_number": "Q3939459"
        },
        {
            "id": 122393,
            "label": "chiesa di san Bernardino in Pignolo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 8,
            "pictures_count": 16,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.00524026881,
            "address": "Via Pignolo",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.67484,
                    45.7003
                ]
            },
            "q_number": "Q18889586"
        },
        {
            "id": 95236,
            "label": "chiesa della Beata Vergine della Neve",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 1,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.00817855016,
            "address": "Via G. Camozzi",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.676543,
                    45.69707
                ]
            },
            "q_number": "Q112673729"
        },
        {
            "id": 112878,
            "label": "chiesa di San Michele al Pozzo Bianco",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 26,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.05307087556,
            "address": "Largo San Michele",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66989,
                    45.70411
                ]
            },
            "q_number": "Q3671360"
        },
        {
            "id": 162519,
            "label": "chiesa dei Santi Giovanni Battista e Giovanni Evangelista",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.07011783061,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.659231,
                    45.704778
                ]
            },
            "q_number": "Q120661720"
        },
        {
            "id": 206342,
            "label": "chiesa di Cristo Sommo ed Eterno Pastore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.0809058990399998,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.658417,
                    45.704667
                ]
            },
            "q_number": "Q120661730"
        },
        {
            "id": 111240,
            "label": "chiesa di San Lorenzo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 4,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.0964792483,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6640559,
                    45.7055362
                ]
            },
            "q_number": "Q85683801"
        },
        {
            "id": 96958,
            "label": "chiesa-casa dei Frati",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.09997195095,
            "address": "Largo Giovanni Barozzi 1",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.650446,
                    45.699136
                ]
            },
            "q_number": "Q112322119"
        },
        {
            "id": 115844,
            "label": "chiesa di Sant'Agata nel Carmine",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 8,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.10331481959,
            "address": "Via Bartolomeo Colleoni",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6604797,
                    45.7053397
                ]
            },
            "q_number": "Q28670541"
        },
        {
            "id": 117304,
            "label": "ex chiesa di Sant'Antonio in Foris",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.12608693476,
            "address": "Via Borgo Palazzo 4a",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6776815,
                    45.6984005
                ]
            },
            "q_number": "Q110734118"
        },
        {
            "id": 112255,
            "label": "chiesa di San Matteo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.12931269615,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662421,
                    45.705794
                ]
            },
            "q_number": "Q105562193"
        },
        {
            "id": 20163,
            "label": "mura venete di Bergamo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 29,
            "pictures_count": 119,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.14566374133,
            "address": "",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.672122,
                    45.704145
                ]
            },
            "q_number": "Q3867341"
        },
        {
            "id": 3610,
            "label": "Cittadella viscontea",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 13,
            "pictures_count": 32,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.17501533346,
            "address": "Piazza della Cittadella",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6591462,
                    45.7057519
                ]
            },
            "q_number": "Q47461538"
        },
        {
            "id": 113868,
            "label": "chiesa di San Pietro",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.19271405909,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6747533,
                    45.7031366
                ]
            },
            "q_number": "Q106575234"
        },
        {
            "id": 8848,
            "label": "Porta del Pantano inferiore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 11,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.19520927112,
            "address": "Piazza L. Mascheroni, 8",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66019,
                    45.7061411
                ]
            },
            "q_number": "Q52391698"
        },
        {
            "id": 8429,
            "label": "Polveriera Superiore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.24855965872,
            "address": "Scaletta Colle Aperto",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.65876,
                    45.70636
                ]
            },
            "q_number": "Q113080424"
        },
        {
            "id": 8426,
            "label": "Polveriera Inferiore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 4,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.26767671122,
            "address": "Via Sforza Pallavicino",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.65837,
                    45.70645
                ]
            },
            "q_number": "Q113080426"
        },
        {
            "id": 165546,
            "label": "chiesa della Madonna di Lourdes",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.2883708481199998,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.659561,
                    45.684461
                ]
            },
            "q_number": "Q120661726"
        },
        {
            "id": 10730,
            "label": "Torre del Galgario",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 6,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.28915137944,
            "address": "Largo del Galgario",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.67886,
                    45.700425
                ]
            },
            "q_number": "Q26911183"
        },
        {
            "id": 115296,
            "label": "chiesa di San Tomaso Apostolo (Bergamo)",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 1,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.3057481879500001,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6574977,
                    45.6847682
                ]
            },
            "q_number": "Q104381467"
        },
        {
            "id": 104029,
            "label": "chiesa della Beata Vergine Maria di Loreto",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.31972161502,
            "address": "piazza Massimiliano Kolb",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.647408888,
                    45.692342805
                ]
            },
            "q_number": "Q48812756"
        },
        {
            "id": 112192,
            "label": "chiesa di San Massimiliano Kolbe",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 5,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.32247662582,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.64742,
                    45.69223
                ]
            },
            "q_number": "Q48812881"
        },
        {
            "id": 1150,
            "label": "Cascina Colombaia",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.35931723774,
            "address": "Via W. Goethe",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.64793,
                    45.6904
                ]
            },
            "q_number": "Q113080411"
        },
        {
            "id": 105374,
            "label": "chiesa della Santa Croce",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 9,
            "pictures_count": 9,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.3638106642,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6741223,
                    45.6857995
                ]
            },
            "q_number": "Q104350173"
        },
        {
            "id": 265533,
            "label": "chiesa della Purificazione di Maria Vergine e Ognissanti",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.3776431755599998,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.680039,
                    45.700528
                ]
            },
            "q_number": "Q120661727"
        },
        {
            "id": 118373,
            "label": "chiesa di Santa Grata in Columnellis",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 18,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.3818103984899999,
            "address": "Via Arena",
            "location": "Città Alta",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.65502,
                    45.70652
                ]
            },
            "q_number": "Q24279358"
        },
        {
            "id": 118374,
            "label": "chiesa di Santa Grata inter Vites",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 9,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.38434305773,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.65503,
                    45.70655
                ]
            },
            "q_number": "Q24254219"
        },
        {
            "id": 116671,
            "label": "chiesa di Sant'Anna",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 14,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.4302523409,
            "address": "Piazza Sant'Anna",
            "location": "Borgo Palazzo",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.682112,
                    45.696266
                ]
            },
            "q_number": "Q104384242"
        },
        {
            "id": 96804,
            "label": "chiesa di Sant'Erasmo Vescovo e Martire (Bergamo)",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.47872367121,
            "address": "via Borgo Canale",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6532705,
                    45.7067972
                ]
            },
            "q_number": "Q111650167"
        },
        {
            "id": 216791,
            "label": "chiesa di San Martino della Pigrizia",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 6,
            "pictures_count": 6,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.5641528552,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.646375,
                    45.702833
                ]
            },
            "q_number": "Q120663178"
        },
        {
            "id": 117876,
            "label": "chiesa di Santa Caterina",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.5734928933599999,
            "address": "Via Santa Caterina",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.679237,
                    45.704774
                ]
            },
            "q_number": "Q48811346"
        },
        {
            "id": 119329,
            "label": "chiesa di Santa Maria Assunta",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 1,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.6363896153400002,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6657345,
                    45.7103269
                ]
            },
            "q_number": "Q82075753"
        },
        {
            "id": 166608,
            "label": "chiesa della Beata Vergine di Caravaggio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 1,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.6396652495200001,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.654417,
                    45.708917
                ]
            },
            "q_number": "Q120661723"
        },
        {
            "id": 96984,
            "label": "chiesetta di San Giuseppe",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.69330747062,
            "address": "Via P. Rovelli 6",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.68548,
                    45.69478
                ]
            },
            "q_number": "Q112674084"
        },
        {
            "id": 163520,
            "label": "chiesa di Santa Maria e San Giuseppe",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 5,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.70033919421,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.645889,
                    45.704556
                ]
            },
            "q_number": "Q120663184"
        },
        {
            "id": 160116,
            "label": "chiesa di San Giovanni Bosco e San Domenico Savio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.7291327266799998,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.680978,
                    45.7055
                ]
            },
            "q_number": "Q120661732"
        },
        {
            "id": 115487,
            "label": "chiesa di San Vigilio sul Monte",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.7396461271900001,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6502078,
                    45.7081589
                ]
            },
            "q_number": "Q111876767"
        },
        {
            "id": 3058,
            "label": "Castello di San Vigilio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 26,
            "pictures_count": 61,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 1.7910015164,
            "address": "Via Castello, 10",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.65111111,
                    45.70916667
                ]
            },
            "q_number": "Q3662873"
        },
        {
            "id": 95740,
            "label": "chiesa di San Fermo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 5,
            "pictures_count": 5,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.7969448896,
            "address": "Via Santi Maurizio e Fermo",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.685509,
                    45.701107
                ]
            },
            "q_number": "Q112322163"
        },
        {
            "id": 164618,
            "label": "chiesa di Santa Teresa del Bambin Gesù",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.84760222282,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.675075,
                    45.710278
                ]
            },
            "q_number": "Q120663186"
        },
        {
            "id": 247658,
            "label": "chiesa di San Rocco Confessore",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 1,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.85485452822,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6549078,
                    45.7111837
                ]
            },
            "q_number": "Q81917154"
        },
        {
            "id": 127786,
            "label": "santuario della Beata Vergine Addolorata",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 1.90087177536,
            "address": "Borgo Santa Caterina",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6831628,
                    45.7060594
                ]
            },
            "q_number": "Q48811375"
        },
        {
            "id": 169373,
            "label": "chiesa di San Giovanni XXIII",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.13714424207,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.639308,
                    45.686806
                ]
            },
            "q_number": "Q120661733"
        },
        {
            "id": 2475,
            "label": "Castello di Campagnola",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 2.14550140484,
            "address": "Via Campagnola, 14",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.679561,
                    45.679874
                ]
            },
            "q_number": "Q112169841"
        },
        {
            "id": 168392,
            "label": "chiesa di San Giovanni Battista",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 4,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.15535441832,
            "address": "",
            "location": "Campagnola",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6807,
                    45.68035
                ]
            },
            "q_number": "Q120598060"
        },
        {
            "id": 164898,
            "label": "chiesa nuova di San Giovanni Battista",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 2,
            "pictures_count": 2,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.16215596322,
            "address": "",
            "location": "Campagnola",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.68115,
                    45.68052
                ]
            },
            "q_number": "Q120598062"
        },
        {
            "id": 102326,
            "label": "chiesa dei Santi Pietro e Paolo",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 19,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.2091987151100003,
            "address": "",
            "location": "Boccaleone",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.690252777,
                    45.688527777
                ]
            },
            "q_number": "Q102183721"
        },
        {
            "id": 102860,
            "label": "chiesa del Crocefisso",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.21336146194,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66747,
                    45.71541
                ]
            },
            "q_number": "Q107441448"
        },
        {
            "id": 95082,
            "label": "chiesa del Santo Sepolcro",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 10,
            "pictures_count": 10,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.2573987294399998,
            "address": "Via Astino",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.64027,
                    45.707679
                ]
            },
            "q_number": "Q112322309"
        },
        {
            "id": 252889,
            "label": "chiesa dell'Addolorata (o dei Mortini)",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.28960648772,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.660069,
                    45.716111
                ]
            },
            "q_number": "Q120661728"
        },
        {
            "id": 101336,
            "label": "chiesa dei Morti di San Martino",
            "municipality_label": "Torre Boldone",
            "municipality": 16214,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.29068606481,
            "address": "via Gioele Solari",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.66006,
                    45.71612
                ]
            },
            "q_number": "Q59145815"
        },
        {
            "id": 265554,
            "label": "chiesa di San Sisto in Agris",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.3182407873,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.663192,
                    45.674833
                ]
            },
            "q_number": "Q120663183"
        },
        {
            "id": 160973,
            "label": "chiesa di Santa Maria Immacolata e Sant'Antonio di Padova",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.3472853321900002,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.633503,
                    45.696222
                ]
            },
            "q_number": "Q120663185"
        },
        {
            "id": 11281,
            "label": "Torre medioevale",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 12,
            "pictures_count": 12,
            "in_contest": true,
            "app_category": "Castelli",
            "distance": 2.38525206,
            "address": "Via Astino, 41",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.634211,
                    45.701636
                ]
            },
            "q_number": "Q112137071"
        },
        {
            "id": 170389,
            "label": "chiesa di San Francesco d'Assisi",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 7,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.3968704485899996,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.694569,
                    45.695194
                ]
            },
            "q_number": "Q120661731"
        },
        {
            "id": 165798,
            "label": "chiesa dell'Immacolata",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.40961518755,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.694017,
                    45.691028
                ]
            },
            "q_number": "Q120661729"
        },
        {
            "id": 170081,
            "label": "chiesa di Sant'Antonio di Padova",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.41237120877,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662106,
                    45.717344
                ]
            },
            "q_number": "Q120661734"
        },
        {
            "id": 164220,
            "label": "chiesa di San Sisto",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 3,
            "pictures_count": 3,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.43010871408,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6613,
                    45.673889
                ]
            },
            "q_number": "Q120663182"
        },
        {
            "id": 171343,
            "label": "ex Chiesa di Sant'Antonio",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.43277692824,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.662031,
                    45.717525
                ]
            },
            "q_number": "Q120663188"
        },
        {
            "id": 134712,
            "label": "chiesa della Beata Vergine Immacolata",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 4,
            "pictures_count": 7,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.54572792284,
            "address": "",
            "location": "Longuelo",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.631111111,
                    45.693333333
                ]
            },
            "q_number": "Q65078160"
        },
        {
            "id": 107597,
            "label": "chiesa di San Colombano",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 0,
            "pictures_count": 0,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.57340486486,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.67542,
                    45.71733
                ]
            },
            "q_number": "Q88266653"
        },
        {
            "id": 115041,
            "label": "chiesa di San Sebastiano",
            "municipality_label": "Bergamo",
            "municipality": 16024,
            "pictures_wlm_count": 6,
            "pictures_count": 6,
            "in_contest": true,
            "app_category": "Edifici religiosi",
            "distance": 2.64644429658,
            "address": "",
            "location": "",
            "position": {
                "type": "Point",
                "coordinates": [
                    9.6387412,
                    45.7118719
                ]
            },
            "q_number": "Q92748089"
        }
    ]
}
```

## Monument detail api
This api gives the full information about a monument, given its internal id:

`https://wlm-it-visual.wmcloud.org/api/app/monuments/119740/`

```
{
    "id": 119740,
    "pictures": [
        {
            "id": 47906990,
            "image_id": "108067829Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Rome Santa Maria Immacolata all'Esquilino 2020 P17.jpg",
            "image_date": "2021-08-01T18:26:48+02:00",
            "image_title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P17.jpg",
            "image_type": "commons",
            "data": {
                "title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P17.jpg",
                "Artist": "<a href=\"//commons.wikimedia.org/wiki/User:Fallaner\" title=\"User:Fallaner\">Fallaner</a>",
                "pageid": "108067829Q3585418",
                "License": "cc-by-sa-4.0",
                "DateTime": "2021-08-01 18:26:48",
                "DateTimeOriginal": "2020-09-23 17:09:41",
                "ImageDescription": "Santa Maria Immacolata all'Esquilino"
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906992,
            "image_id": "108067827Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Rome Santa Maria Immacolata all'Esquilino 2020 P19.jpg",
            "image_date": "2021-08-01T18:26:47+02:00",
            "image_title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P19.jpg",
            "image_type": "commons",
            "data": {
                "title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P19.jpg",
                "Artist": "<a href=\"//commons.wikimedia.org/wiki/User:Fallaner\" title=\"User:Fallaner\">Fallaner</a>",
                "pageid": "108067827Q3585418",
                "License": "cc-by-sa-4.0",
                "DateTime": "2021-08-01 18:26:47",
                "DateTimeOriginal": "2020-09-23 17:12:46",
                "ImageDescription": "Santa Maria Immacolata all'Esquilino"
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906991,
            "image_id": "108067828Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Rome Santa Maria Immacolata all'Esquilino 2020 P18.jpg",
            "image_date": "2021-08-01T18:26:47+02:00",
            "image_title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P18.jpg",
            "image_type": "commons",
            "data": {
                "title": "File:Rome Santa Maria Immacolata all'Esquilino 2020 P18.jpg",
                "Artist": "<a href=\"//commons.wikimedia.org/wiki/User:Fallaner\" title=\"User:Fallaner\">Fallaner</a>",
                "pageid": "108067828Q3585418",
                "License": "cc-by-sa-4.0",
                "DateTime": "2021-08-01 18:26:47",
                "DateTimeOriginal": "2020-09-23 17:10:01",
                "ImageDescription": "Santa Maria Immacolata all'Esquilino"
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906989,
            "image_id": "5409417Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Esquilino - Santa Maria Immacolata all'Esquilino.JPG",
            "image_date": "2018-07-02T16:17:49+02:00",
            "image_title": "File:Esquilino - Santa Maria Immacolata all'Esquilino.JPG",
            "image_type": "commons",
            "data": {
                "title": "File:Esquilino - Santa Maria Immacolata all'Esquilino.JPG",
                "Artist": "<a href=\"//commons.wikimedia.org/w/index.php?title=User:Croberto68&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"User:Croberto68 (page does not exist)\">Croberto68</a>",
                "pageid": "5409417Q3585418",
                "License": "pd",
                "DateTime": "2018-07-02 16:17:49",
                "ImageDescription": "Chiesa di Santa Maria Immacolata all'Esquilino, a Roma, nel rione Esquilino, in via Emanuele Filiberto."
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906993,
            "image_id": "60536173Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Via Emanuele Filiberto - S. Maria Immacolata All'Esquilino - panoramio.jpg",
            "image_date": "2017-06-30T14:46:45+02:00",
            "image_title": "File:Via Emanuele Filiberto - S. Maria Immacolata All'Esquilino - panoramio.jpg",
            "image_type": "commons",
            "data": {
                "title": "File:Via Emanuele Filiberto - S. Maria Immacolata All'Esquilino - panoramio.jpg",
                "Artist": "<a rel=\"nofollow\" class=\"external text\" href=\"https://web.archive.org/web/20161031115820/http://www.panoramio.com/user/5152111?with_photo_id=128818508\">Mister No</a>",
                "pageid": "60536173Q3585418",
                "License": "cc-by-3.0",
                "DateTime": "2017-06-30 14:46:45",
                "DateTimeOriginal": "Taken on 10 September 2015",
                "ImageDescription": "Via Emanuele Filiberto - S. Maria Immacolata All'Esquilino"
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906988,
            "image_id": "6570093Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/Chiesa di Santa Maria Immacolata all'Esquilino Roma.JPG",
            "image_date": "2009-04-18T20:46:09+02:00",
            "image_title": "File:Chiesa di Santa Maria Immacolata all'Esquilino Roma.JPG",
            "image_type": "commons",
            "data": {
                "title": "File:Chiesa di Santa Maria Immacolata all'Esquilino Roma.JPG",
                "Artist": "<a href=\"//commons.wikimedia.org/wiki/User:LPLT\" title=\"User:LPLT\">LPLT</a>",
                "pageid": "6570093Q3585418",
                "License": "cc-by-sa-3.0",
                "DateTime": "2009-04-18 20:46:09",
                "DateTimeOriginal": "2009-04",
                "ImageDescription": "Eglise Santa Maria Immacolata all'Esquilino dans le rione de l'<a href=\"//commons.wikimedia.org/w/index.php?title=Esquilin&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Esquilin (page does not exist)\">Esquilin</a> à <a href=\"//commons.wikimedia.org/wiki/Rome\" class=\"mw-redirect\" title=\"Rome\">Rome</a>"
            },
            "is_relevant": false,
            "monument": 119740
        },
        {
            "id": 47906987,
            "image_id": "6519952Q3585418",
            "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
            "image_date": "2009-04-14T14:05:18+02:00",
            "image_title": "File:2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
            "image_type": "commons",
            "data": {
                "title": "File:2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
                "Artist": "<a rel=\"nofollow\" class=\"external text\" href=\"https://www.flickr.com/people/28577026@N02\">Allie_Caulfield</a>",
                "pageid": "6519952Q3585418",
                "License": "cc-by-2.0",
                "DateTime": "2009-04-14 14:05:18",
                "DateTimeOriginal": "2006-12-19 16:24",
                "ImageDescription": "Chiesa di Santa Maria Immacolata all'Esquilino"
            },
            "is_relevant": false,
            "monument": 119740
        }
    ],
    "cover_picture": {
        "id": 47906987,
        "image_id": "6519952Q3585418",
        "image_url": "https://commons.wikimedia.org/wiki/Special:Filepath/2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
        "image_date": "2009-04-14T14:05:18+02:00",
        "image_title": "File:2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
        "image_type": "commons",
        "data": {
            "title": "File:2006-12-17 12-22 Rom 314 Chiesa dell Immacolata Concezione.jpg",
            "Artist": "<a rel=\"nofollow\" class=\"external text\" href=\"https://www.flickr.com/people/28577026@N02\">Allie_Caulfield</a>",
            "pageid": "6519952Q3585418",
            "License": "cc-by-2.0",
            "DateTime": "2009-04-14 14:05:18",
            "DateTimeOriginal": "2006-12-19 16:24",
            "ImageDescription": "Chiesa di Santa Maria Immacolata all'Esquilino"
        },
        "is_relevant": false,
        "monument": 119740
    },
    "counts_comune_by_app_category": null,
    "municipality_label": "Roma",
    "province_label": "Roma",
    "categories_urls": {
        "wlm_categories": [
            "Santa Maria Immacolata all'Esquilino",
            "Images from Wiki Loves Monuments 2023 in Italy",
            "Images from Wiki Loves Monuments 2023 in Italy - religious buildings",
            "Images from Wiki Loves Monuments 2023 in Italy - Lazio",
            "Images from Wiki Loves Monuments 2023 in Italy - Lazio - religious buildings",
            "Images from Wiki Loves Monuments 2023 in Italy - without local award"
        ],
        "non_wlm_categories": [
            "Santa Maria Immacolata all'Esquilino"
        ]
    },
    "app_category": "Edifici religiosi",
    "label": "chiesa di Santa Maria Immacolata all'Esquilino",
    "q_number": "Q3585418",
    "parent_q_number": "",
    "wlm_n": "12H5010618",
    "start": "2023-03-21T01:00:00+01:00",
    "end": null,
    "data": {
        "mon": "Q3585418",
        "end_n": [],
        "geo_n": [
            "Point(12.506138888 41.891027777)"
        ],
        "wlm_n": [
            "12H5010618"
        ],
        "article": "https://it.wikipedia.org/wiki/Chiesa_di_Santa_Maria_Immacolata_all%27Esquilino",
        "place_n": [
            "Q220"
        ],
        "start_n": [
            "2023-03-21T00:00:00Z"
        ],
        "monLabel": "chiesa di Santa Maria Immacolata all'Esquilino",
        "parent_n": [],
        "commons_n": [
            "Santa Maria Immacolata all'Esquilino"
        ],
        "adminEntity": "Q220",
        "place_geo_n": [
            "Point(12.482777777 41.893055555)"
        ],
        "approvedBy_n": [],
        "relevantImage_n": [
            "http://commons.wikimedia.org/wiki/Special:FilePath/Esquilino%20-%20Santa%20Maria%20Immacolata%20all%27Esquilino.JPG"
        ]
    },
    "position": {
        "type": "Point",
        "coordinates": [
            12.506138888,
            41.891027777
        ]
    },
    "relevant_images": [
        "http://commons.wikimedia.org/wiki/Special:FilePath/Esquilino%20-%20Santa%20Maria%20Immacolata%20all%27Esquilino.JPG"
    ],
    "first_revision": "2013-01-23T15:44:40+01:00",
    "approved_by": "[]",
    "first_image_date": null,
    "first_image_date_commons": "2009-04-14",
    "most_recent_wlm_image_date": null,
    "most_recent_commons_image_date": "2021-08-01",
    "current_wlm_state": "inContest",
    "current_commons_state": "withPicture",
    "pictures_count": 7,
    "pictures_wlm_count": 0,
    "pictures_commons_count": 7,
    "to_review": false,
    "in_contest": true,
    "article": "https://it.wikipedia.org/wiki/Chiesa_di_Santa_Maria_Immacolata_all%27Esquilino",
    "location": "",
    "address": "",
    "admin_entity": "Q220",
    "municipality": 58091,
    "province": 58,
    "region": 12,
    "snapshot": 99,
    "update_snapshot": 99,
    "categories": [
        1,
        17,
        23
    ]
}
```

## Upload images api

This api is used to upload images and is available only for logged in users
`https://wlm-it-visual.wmcloud.org/api//upload-images/`

