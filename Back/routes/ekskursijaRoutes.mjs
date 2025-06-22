import express from "express";
import {
  newEkskursija,
  getAllEkskursijos,
  getEkskursija,
  editEkskursija,
  removeEkskursija,
  pridetiVertinima,
  gautiVidutiniVertinima,
} from "../controllers/ekskursijaController.mjs";
import { allowAccessTo, protect } from "../controllers/authController.mjs";
import { validateNewEkskursija } from "../validators/newEkskursija.mjs";
import { validate } from "../validators/validate.mjs";

const ekskursijaRouter = express.Router();

// Ekskursijų sąrašas ir kūrimas
ekskursijaRouter
  .route("/")
  .post(validateNewEkskursija, validate, newEkskursija)
  .get(getAllEkskursijos);

// Vienos ekskursijos gavimas, atnaujinimas, trynimas
ekskursijaRouter
  .route("/:id")
  .get(getEkskursija)
  .patch(editEkskursija)
  .delete(removeEkskursija);

// Pridėti vertinimą konkrečiai ekskursijai
ekskursijaRouter.post("/:id/vertinimas", pridetiVertinima);

// Gauti vidutinį vertinimą konkrečiai ekskursijai
ekskursijaRouter.get("/:id/vidutinis-vertinimas", gautiVidutiniVertinima);

export default ekskursijaRouter;