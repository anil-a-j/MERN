import express from "express";
const router = express.Router();

import {
  createCandidate,
  getCandidates,
  deleteCandidate,
  changeCandidateResult,
  getCandidate,
} from "../controllers/candidateController.js";

import { protect } from "../middleware/authMiddleware.js";

router.route("/getcandidates").get(protect, getCandidates);

router.route("/createcandidate").post(protect, createCandidate);

router.route("/deletecandidate/:deleteId").delete(protect, deleteCandidate);

router.route("/changecandidateresult").put(protect, changeCandidateResult);

router.route("/getCandidate/:id").get(protect, getCandidate);

export default router;
