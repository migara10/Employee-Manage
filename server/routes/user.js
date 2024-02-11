import express from "express";
import userController from "../Controllers/userController.js";
import verifyToken from './../middlewares/tokenCheck.js'

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/getUsers", verifyToken, userController.getUsers)

export default router;
