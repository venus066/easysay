import express from 'express';
import * as authValidator from '../app/AuthComponent/auth.validator.js';
const router = express.Router();

router.post("/login", authValidator.loginUser);
router.post("/register", authValidator.registerUser);
router.post("/access-token", authValidator.accessToken);
router.post("/reset-password", authValidator.resetPasswordLink);
// router.put("/updateUserPassword", authValidator.updateUserPassword);

export default router
