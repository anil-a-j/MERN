import AsyncHandler from "express-async-handler";
import Candidate from "../models/candidateModel.js";

// @desc get candidates
// @route GET /api/candidate/getcandidates
// @access private
const getCandidates = AsyncHandler(async (req, res) => {
  const candidates = await Candidate.find();

  if (candidates) {
    res.status(200).json([...candidates]);
  } else {
    res.status(400);
    throw new Error("No candidates");
  }
});

// @desc get candidate
// @route GET /api/candidate/getcandidate/:id
// @access private
const getCandidate = AsyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);

  if (candidate) {
    res.status(200).json({ candidate });
  } else {
    res.status(400);
    throw new Error("No candidate");
  }
});

// @desc create candidate
// @route POST /api/candidate/createcandidate
// @access private
const createCandidate = AsyncHandler(async (req, res) => {
  const { name, dob, email, address, state, pincode } = req.body;

  const candidate = await Candidate.create({
    name,
    dob,
    email,
    address,
    state,
    pincode,
  });

  if (candidate) {
    res.status(201).json({
      _id: candidate.id,
      name: candidate.name,
      dob: candidate.dob,
      result: candidate.result,
      email: candidate.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid candidate data!");
  }
});

// @desc delete candidate
// @route POST /api/candidate/deletecandidate/:deletetId
// @access private
const deleteCandidate = AsyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.deleteId);
  if (candidate) {
    await Candidate.deleteOne({ id: req.params.deleteId });
    res.status(204).end();
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

// @desc change candidate result
// @route PUT /api/candidate/changecandidateresult
// @access private
const changeCandidateResult = AsyncHandler(async (req, res) => {
  const { id, value } = req.body;
  const candidate = await Candidate.findById(id);
  if (candidate) {
    candidate.result = value;
    await candidate.save();
    res.status(200).end();
  } else {
    res.status(404);
    throw new Error("Candidate not found");
  }
});

export {
  getCandidates,
  createCandidate,
  deleteCandidate,
  changeCandidateResult,
  getCandidate,
};
