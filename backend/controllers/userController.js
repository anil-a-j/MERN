import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { accessToken, refreshToken } from "../utils/generateToken.js";

// @desc Signup a new user
// @route POST /api/user/signupUser
// @access public
const signupUser = AsyncHandler(async (req, res) => {
  const { email, phone, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(406);
    throw new Error("User already exists!");
  }

  const user = await User.create({
    email,
    phone,
    password,
  });

  if (user) {
    res
      .cookie("rf", refreshToken(user.id), {
        httpsOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(201)
      .json({
        _id: user.id,
        email: user.email,
        phone: user.phone,
      });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login a user
// @route POST /api/user/login
// @access public
const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ username: email });

  if (user && (await user.matchPassword(password))) {
    res
      .cookie("rf", refreshToken(user.id), {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
      })
      .status(200)
      .json({
        _id: user.id,
        email: user.email,
        phone: user.phone,
      });
  } else {
    res.status(401);
    throw new Error("Invalid credentials!");
  }
});

// @desc remove cookie due to logout
// @route GET /api/user/logout
// @access public
const logoutUser = AsyncHandler(async (req, res) => {
  res
    .clearCookie("rf", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    })
    .end();
});

// @desc provide access key
// @route GET /api/user/getaccesskey
// @access private
const getAccessKey = AsyncHandler(async (req, res) => {
  res.end();
});

export { signupUser, logoutUser, loginUser, getAccessKey };
