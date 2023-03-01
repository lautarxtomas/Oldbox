import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// register
export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password, address } = req.body;
    // 2. all fields require validation
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "E-mail is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ error: "E-mail is taken" });
    }
    // 4. hash password
    const hashedPassword = await hashPassword(password);
    // 5. register user in mongo db
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      address,
    }).save();

    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

// login
export const login = async (req, res) => {
  try {
    // 1. destructure email and password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "E-mail is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 6. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

// middleware
export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password, address } = req.body;
    const user = await User.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min. 6 characters long",
      });
    }
    // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
      },
      { new: true }
    );
    updated.password = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};
