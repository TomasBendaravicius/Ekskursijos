import { body } from "express-validator";

export const validateNewEkskursija = [
  body().notEmpty().withMessage("Ekskursijos duomenys turi būti pateikti"),
  body("pavadinimas")
    .notEmpty().withMessage("Pavadinimas yra privalomas")
    .isLength({ min: 3, max: 50 }).withMessage("Pavadinimas turi būti bent 3 simbolių"),
  body("kaina")
    .notEmpty().withMessage("Kaina yra privaloma"),
  body("data1")
    .notEmpty().withMessage("Data yra privaloma"),
  body("data2")
    .notEmpty().withMessage("Data yra privaloma"),
  body("trukme")
    .notEmpty().withMessage("Trukmė yra privaloma"),
  body("vertinimas")
    .optional(),
  body("nuotrauka")
    .notEmpty().withMessage("Nuotraukos nuoroda yra privaloma")
    .isURL().withMessage("Nuotrauka turi būti teisinga nuoroda"),
  body("aprasymas")
    .notEmpty().withMessage("Aprašymas yra privalomas")
    .isLength({ min: 5 }).withMessage("Aprašymas turi būti bent 5 simbolių"),
];