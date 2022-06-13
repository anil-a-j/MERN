import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCandidatesService,
  createCandidateService,
  deleteCandidateService,
  changeCandidateResultService,
  getCandidateService,
} from "./candidateServices";

const initialState = {
  candidates: [],
  candidate: "",
  candidateStatus: "",
  candidateError: "",
  candidatesError: "",
  candidatesStatus: "",
  createCandidateStatus: "",
  deleteCandidateStatus: "",
  changeCandidateResultStatus: "",
  changeCandidateResultError: "",
};

export const getCandidates = createAsyncThunk(
  "candidate/getcandidates",
  async () => {
    return await getCandidatesService();
  }
);

export const createCandidate = createAsyncThunk(
  "candidate/createcandidate",
  async (data) => {
    return await createCandidateService(data);
  }
);

export const deleteCandidate = createAsyncThunk(
  "candidate/deletecandidate",
  async (data) => {
    return await deleteCandidateService(data);
  }
);

export const changeCandidateResult = createAsyncThunk(
  "candidate/changecandidateresult",
  async (data) => {
    return await changeCandidateResultService(data);
  }
);

export const getCandidate = createAsyncThunk(
  "candidate/getcandidate",
  async (data) => {
    return await getCandidateService(data);
  }
);

export const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidates.pending, (state) => {
        state.candidatesStatus = "loading";
      })
      .addCase(getCandidates.fulfilled, (state, action) => {
        state.candidates = action.payload;
        state.candidatesStatus = "";
      })
      .addCase(getCandidates.rejected, (state, action) => {
        state.candidatesError = action.error.message;
        state.candidatesStatus = "failed";
      })
      .addCase(createCandidate.pending, (state, action) => {
        state.createCandidateStatus = "";
      })
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.candidates.push(action.payload);
        state.createCandidateStatus = "new candidate added";
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.candidatesError = action.error.message;
        state.createCandidateStatus = "failed";
      })
      .addCase(deleteCandidate.pending, (state) => {
        state.deleteCandidateStatus = "loading";
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        state.deleteCandidateStatus = action.payload;
      })
      .addCase(deleteCandidate.rejected, (state, action) => {
        state.deleteCandidateStatus = action.error.message;
      })
      .addCase(changeCandidateResult.pending, (state) => {
        state.changeCandidateResultStatus = "";
        state.changeCandidateResultError = "";
      })
      .addCase(changeCandidateResult.fulfilled, (state) => {
        state.changeCandidateResultStatus = "Result changed";
      })
      .addCase(changeCandidateResult.rejected, (state, action) => {
        state.changeCandidateResultError = action.error.message;
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.candidate = action.payload;
        state.candidateStatus = "Candidate Received";
      })
      .addCase(getCandidate.rejected, (state, action) => {
        state.candidateError = action.error.message;
        state.candidate = "";
      });
  },
});

export const selectCandidate = (state) => state.candidate;

export default candidateSlice.reducer;
