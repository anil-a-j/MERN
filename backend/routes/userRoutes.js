import express from "express";
const router = express.Router();

import {
  signupUser,
  logoutUser,
  loginUser,
  getAccessKey,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/signupUser").post(signupUser);
router.route("/logout").get(logoutUser);
router.route("/login").post(loginUser);
router.route("/getaccesskey").get(protect, getAccessKey);

export default router;
