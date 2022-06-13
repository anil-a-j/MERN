import mongoose from "mongoose";

const stateSchema = mongoose.Schema(
  {
    stateName: {
      type: String,
      required: true,
    },
  },
  {
    timestams: true,
  }
);

const State = mongoose.model("State", stateSchema);

export default State;
