# Programmeerimine-II
TLU HK Programmeerimine II aine raames kirjutatud kood

## Millega on tegu?
Tegemist on repositooriumiga, mis sisaldab Tallinna Ülikooli Haapsalu kolledži Rakendusinformaatika õppekava valikaine [Programmeerimine II](https://ois2.tlu.ee/tluois/aine/HKI5003.HK) raames kirjutatud koodi.

## Loengud
### Testimine
- Automaattestmine

### Neljas loeng
- Andmebaasi ühendus

### Kolmas loeng
- Turvalisus
  - Paroolid (hash)
    	- Salt
      - Salt-rounds
- JSON web token


### Teine loeng
-Struktueerimine 
  - Kontrollerid
  - Teenused
  - interface-d
-Middleware
 - Logger
 - Validaator

### Esimene loeng 15.09.2022
- Märksõnad
  - API
  - [NodeJS](https://nodejs.org/en/)
  - [NPM](https://www.npmjs.com/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [ts-node](https://www.npmjs.com/package/ts-node)
  - [nodemon](https://nodemon.io/)
  - [Issue linkimine branchiga](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-a-branch-for-an-issue)


## Kuidas paigaldada?
1. Klooni repositoorium
```bash
git clone https://github.com/tluhk/Programmeerimine-II.git
```
2. Liigu projekti kausta
```bash
cd Programmeerimine-II
```
3. Paigalda NPM paketid
```bash
npm install
```
4. Käivita projekt
```bash
npm start
```

## Kasutatavad tehnoloogiad
- [NodeJS v16](https://nodejs.org/en/download/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://www.npmjs.com/package/express)
- 

## Kasutatavad tööriistad
- [MS Visual Studio Code](https://code.visualstudio.com/download) koodi kirjutamiseks
 - [Live Share laiendus](https://code.visualstudio.com/learn/collaboration/live-share) koodi jagamiseks loengu ajal jooksvalt
 - [Thunder Client API tööriist](https://www.thunderclient.com/) jooskvalt API endpointidele päringute tegemiseks ja testimiseks

## API dokumentatsioon
Siia tekib jooksvalt esialgu lihtsalt API enpointide nimekiri koos nõutud parameetritega, edaspidi tuleb [OpenAPI](https://swagger.io/specification/) ja [Swagger](https://www.npmjs.com/package/swagger-ui-express).

## Endpointid

### Endpoint API töötamise kontrollimiseks
### Kasutajatega seotud endpoindid

- - Kõikide kasutajate pärimise endpoint (GET)
- - '/api/v1/users'

- - Kasutaja pärimine id alusel (GET)
- - '/api/v1/users/:id'

- - Kasutaja muutmine (PATCH)
- - '/api/v1/users/:id'

- - Kasutaja loomine (POST)
- - '/api/v1/users'
- - 

- - Kasutaja kustutamine (DELETE)
- - '/api/v1/users/:id'

### Postituste staatustega seotud endpoindid
- - Kõikide postituste staatuste pärimise endpoint (GET)
- - '/api/v1/posts/statuses'

- - Postituse staatus pärimine staatuse id alusel (GET)
- - '/api/v1/posts/statuses/:id'

### Postitustega seotud endpoindid
- - Kõikide postituste pärimise endpoint (GET)
- - '/api/v1/posts'

- - Postituse pärimine id alusel (GET)
- - '/api/v1/posts/:id'

- - Postituse loomine (GET)
- - '/api/v1/posts'

- - Postituse muutmine (PATCH)
- - '/api/v1/posts/:id

- - Postituse kustutamine (DELETE)
- - '/api/v1/posts/:id

### Kommentaaridega seotud endpoindid
- - Kõikide kommentaaride pärimise endpoint (GET)
- - '/api/v1/comments'

- - Kommentaari pärimine id alusel (GET)
- - '/api/v1/comments/:id'

- - Postitusega seotud kommentaaride pärimise endpoint (GET)
- - '/api/v1/posts/:id/comments'

- - Kommentaari loomine (POST)
- - '/api/v1/comments'

- - Kommentaari kustutamine (DELETE)
- - '/api/v1/comments/:id'



### Õppeainetega seotud endpointid
- - õppeainete pärimise endpoint (GET) 
- - '/api/v1/courses'

- - Õppeaine loomine (POST)
- - '/api/v1/courses'

- - Õppeaine muutmine (PATCH)
- - '/api/v1/courses/:id'

- - Õppeaine kustutamine (DELETE)
- - '/api/v1/courses/:id'

### Õppejõuga seotud endpointid
- - Õppejõud pärimise endpoint (GET)
- - '/api/v1/lecturers'

- - Õppejõu loomine (POST)
- - '/api/v1/lecturers'

- - Õppejõu muutmine (PATCH)
- - '/api/v1/lecturers/:id'

- - Õppejõu kustutamine (DELETE)
- - '/api/v1/lecturers/:id'

### Gruppidega seotud endpointid - 
- - Kursusegrupid (GET)
- - '/api/v1/groups'

- - Kursusegrupi lisamine (POST)
- - '/api/v1/groups/'

- - Kursusegrupi muutmine (PATCH)
- - '/api/v1/groups/:id'


- - Kursusegrupi kustutamine (DELETE)
- - '/api/v1/groups/:id'

### Koolipäevadega seotud endpointid - 
- - Koolipäevad (GET)
- - '/api/v1/schooldays'

- - Koolipäeva lisamine (POST)
- - '/api/v1/schooldays/'


- - Koolipäeva muutmine (PATCH)
- - '/api/v1/schooldays/:id'

- - Koolipäeva kustutamine (DELETE)
- - '/api/v1/schooldays/:id'
