import express from "express";
import {
  newRegistracija,
  getUserRegistracijos,
  editRegistracija,
  removeRegistracija
} from "../controllers/registracijaController.mjs";

// Jei turi auth middleware, importuok jį
// import { authenticateUser } from "../middleware/auth.mjs";

const registracijaRouter = express.Router();

// Visi maršrutai reikalauja prisijungusio vartotojo (user role)
// router.use(authenticateUser);

// Užsirašyti į ekskursiją
registracijaRouter.post("/", /*authenticateUser,*/ newRegistracija);

// Gauti visas savo registracijas
registracijaRouter.get("/", /*authenticateUser,*/ getUserRegistracijos);

// Atnaujinti registraciją (datą, komentarą, dalyvauta)
registracijaRouter.patch("/:id", /*authenticateUser,*/ editRegistracija);

// Ištrinti registraciją (atšaukti dalyvavimą)
registracijaRouter.delete("/:id", /*authenticateUser,*/ removeRegistracija);

export default registracijaRouter;