import mongoose from "mongoose";

const candidateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    dob: {
      type: String,
      required: [true, "dob is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    result: {
      type: String,
      required: false,
      default: "Shortlist",
    },
    pincode: {
      type: Number,
      required: [true, "pincode is required"],
      min: [6, "Must be 6 digit number"],
    },
  },
  {
    timestamp: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
