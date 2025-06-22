# Ekskursijų registracijos sistema

Šis projektas leidžia vartotojams:
- Peržiūrėti ekskursijų sąrašą
- Užsiregistruoti į ekskursiją
- Pasirinkti datą
- Palikti komentarą apie ekskursiją
- Atšaukti registraciją

## Technologijos

- **Frontend:** React (src/components)
- **Backend:** Node.js (Express, ES modules)
- **Duomenų bazė:** PostgreSQL (naudojant pgAdmin)

## Projekto paleidimas

### 1. Duomenų bazė

- Sukurk PostgreSQL duomenų bazę (pvz., per pgAdmin)
- Importuok lenteles: `ekskursios`, `registracijos`, ir t.t.
- Atitinkamai užpildyk lenteles pradiniais duomenimis

### 2. Backend

1. Įdiek priklausomybes:
    ```bash
    npm install
    ```
2. Paleisk serverį:
    ```bash
    npm start
    ```
3. Serveris veikia ant `http://localhost:3030`

### 3. Frontend

1. Eik į `Front` aplanką:
    ```bash
    cd Front
    ```
2. Įdiek priklausomybes:
    ```bash
    npm install
    ```
3. Paleisk React aplikaciją:
    ```bash
    npm start
    ```
4. Aplikacija veiks ant `http://localhost:3000`

## Svarbiausi failai

- **Back/routes/registracijos.mjs** – registracijų maršrutai
- **Back/controllers/registracijaController.mjs** – registracijų logika
- **Back/models/registracijaModel.mjs** – SQL užklausos
- **Front/src/components/ManoEkskursijos.jsx** – vartotojo ekskursijų sąrašas

## Prisijungimas

- Autentifikacija gali būti išjungta testavimo tikslais (naudojamas fiksuotas user_id).
- Jei įdiegsi autentifikaciją, naudok `req.user.id`.

## Kontaktai / Pagalba

Kilus klausimams ar problemoms – rašyk projekto autoriui.

---

