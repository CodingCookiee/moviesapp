import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// Register a user
export const register = async (req, res, next) => {
  try {
    const { email, password, username, country } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).json({ message: "New User Created Successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    next(err);
  }
};


// Login a user
export const login = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Check for all required fields
    if(!password){
      return next(createError(400, "Please provide password"))
    }
    else if (!password || (!email && !username)) {
      return next(createError(400, "Please provide either email or username with password"))
    }
    

    // Login using email or username
    let user;
    if (email) {
      user = await User.findOne({ email });
      if (!user) {
        return next(createError(400, "Email or Password is Wrong"))
      }
    } else {
      user = await User.findOne({ username });
      if (!user) {
        return next(createError(400, "Username or Password is Wrong"))
      }
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return next(createError(400, "Invalid Password"))
    }

    const token = jwt.sign(
      { userId: user._id, isSeller: user.isSeller },
      process.env.JWT_KEY
    );

    const { password: userPassword, ...rest } = user._doc;

  res.cookie("accessToken", token, {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: '/',
}).status(200).json({ message: "Logged in successfully", ...rest });


      
  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
};

// Logout a user
export const logout = (req, res, next) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: '/',
    })
    .status(200)
    .json("User has been logged out.");
  } catch (err) {
    next(err);
  }
};


export const verifyUserExists = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    
    let user;
    if (identifier.includes('@')) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ username: identifier });
    }
    
    if (!user) {
      return next(createError(404, "No account found with this email/username"));
    }

    res.status(200).json({ 
      message: "User verified successfully",
      userId: user._id 
    });
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { userId, newPassword } = req.body;
    
    const hash = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hash });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};


