import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const handleUserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        msg: "user already exists",
      });
    }

    const user = await User.create({
      email,
      name,
      password,
    });

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      },
    );

    res.cookie("token", token);

    return res.status(201).json({
      token,
      msg: "registered successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("handleregister error:-", error);
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const handleUserLogin = async (req, res) => {
  try {
    // const { email, password } = req.body;

    // if (!email || !password) {
    //   return res.status(400).json({
    //     msg: "missing fields",
    //   });
    // }

    // const userExists = await User.findOne({ email });

    // if (!userExists) {
    //   return res.status(400).json({
    //     msg: "user doesnt exists",
    //   });
    // }
  } catch (error) {}
};
