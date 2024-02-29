
import { Router } from "express";
import { getProfile, login, logout, register } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middlewares.js";

const router = Router(); 

router.post('/register', upload.single("avatar") , register);
router.post('/login', login);
router.get('/logout',logout);
router.get('/me', isLoggedIn ,getProfile);
router.post('/forgot-password',upload.single("avatar"), forgot);
router.post('/reset-password',upload.single("avatar"), reset);

export default router;