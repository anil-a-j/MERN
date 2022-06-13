import dotenv from "dotenv";
import states from "./data/states.js";
import state from "./models/stateModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await state.deleteMany();
    await state.insertMany(states);
    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
