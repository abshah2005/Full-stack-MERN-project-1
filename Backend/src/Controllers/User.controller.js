import {uploadonCloudinary} from "../utils/Fileupload.js"
import {asynchandler} from "../utils/Asynchandler.js"
import {Apiresponse} from "../utils/Apiresponse.js"
import {Apierror} from "../utils/Apierror.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users } from "../models/Users.model.js";

//This is my Login Signup Controller


const generateAccessAndRefreshTokens = async (userId) => {
    try {
      const user = await Users.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
  
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
  
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Apierror(
        500,
        "Something went wrong while generating referesh and access token"
      );
    }
  };


  const registerUser = asynchandler(async (req, res) => {
    const { username, email, password,role } = req.body;
    if (
      [username, email, password].some((field) => {
        field.trim() === "";
      })
    ) {
      throw new Apierror(400, "Please fill all the fields");
    }
    const ExistingUser = await Users.findOne({ $or: [{ username }, { email }] });
    if (ExistingUser) {
      throw new Apierror(400, "this user Already Exists");
    }



    const profilePicPath = req.files?.profilePic[0].path;
    if (!profilePicPath) {
      throw new Apierror(400, "Profile Pic must be provided");
    }
    const ProfilePic = await uploadonCloudinary(profilePicPath);
    if (!ProfilePic) {
      throw new Apierror(400, "Profile Pic not uploaded successfully");
    }
    const user = await Users.create({
      username: username.toLowerCase(),
      password,
      email,
      role,
      profilePic: ProfilePic.url,
    });
    const createdUser = await Users.findById(user._id).select("-password");
    if (!createdUser) {
      throw new Apierror(500, "Something went wrong registering user");
    }
    return res
      .status(201)
      .json(new Apiresponse(200, createdUser, "User Registered Successfully"));
  });
  
  const Loginuser = asynchandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!email && !username) {
      throw new Apierror(400, "Email or Username is Required");
    }
    const user = await Users.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new Apierror(400, "User not found plz sign up first");
    }
    const LoggedinUser = await Users.findById(user._id).select("-password ");
    const isauthenticated = await user.isPasswordCorrect(password);
    if (!isauthenticated) {
      throw new Apierror(400, "incorrect Password plz try again");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );
    console.log("this is accessToken:-",accessToken);
    console.log("This is refreshToken :- ",refreshToken);
    const options = {
      secure: true,
      httpOnly: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new Apiresponse(200,[LoggedinUser,accessToken],"Logged in successfully"));
      // .json(new Apiresponse(200,[LoggedinUser,accessToken],"Logged in successfully"))
  });
  
  const getuser = asynchandler(async (req, res) => {
    const user = await Users.find({});
    res.status(200).json(user);
  });

  const LogoutUser = asynchandler(async (req, res) => {
    const user = await Users.findByIdAndUpdate(
      req.user?._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );
    if (!user) {
      throw new Apierror(400, "User not found");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "Logged out successfully" });
  });
  
  const getCurrentUser=asynchandler(async(req,res)=>{
    const user=req.user;
    return res.status(200).json([user]);
  })

  export {registerUser,getuser,Loginuser,LogoutUser,getCurrentUser};
