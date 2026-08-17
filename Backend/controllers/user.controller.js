import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.json({
        message: "User Already Exist ",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashPassword,
    });

    res.json({
      message: "Registered SuccessFully",
      user,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.json({
        success: false,
        message: "Wrong Email or Password .",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      token,
      user,
      message: "Login SuccessFully",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};