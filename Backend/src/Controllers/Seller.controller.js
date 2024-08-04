import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Users } from "../models/Users.model.js";
import { Sellers } from "../models/Seller.model.js";
import { Products } from "../models/Products.model.js";
import { uploadonCloudinary } from "../utils/Fileupload.js";

const createSellerApplication = asynchandler(async (req, res) => {
  const user_id = req.user._id;
  const { name, email, address, businessName, phone } = req.body;
 

  if (
    [name, email, phone, businessName, address].some((item) => {
      item.trim() === "";
    })
  ) {
    throw new Apierror(400, "please fill the required fields");
  }

  const brandLogofile = req.files?.brandLogo ? req.files.brandLogo[0].path : null;

  if (!brandLogofile) {
    throw new Apierror(400, "brandLogo must be provided");
  }

  const brandLogo = await uploadonCloudinary(brandLogofile);
    if (!brandLogo) {
      throw new Apierror(400, "BrandLogo must be provided not uploaded successfully");
    }

  const sellerExists = await Sellers.findOne({ email });
  if (sellerExists) {
    throw new Apierror(400, "This seller already exists");
  }
  const newSeller = await Sellers.create({
    name,
    email,
    phone,
    address,
    businessName,
    brandLogo:brandLogo.url,
    User: user_id,
  });
  if (!newSeller) {
    throw new Apierror(
      400,
      "Seller Appication not created some error occoured"
    );
  }
  res
    .status(200)
    .json(
      new Apiresponse(200, newSeller, "Seller Application created Successfully")
    );
});

const Allpendingapplications = asynchandler(async (req, res) => {
  const pendingapplications = await Sellers.find({
    status: "pending",
  }).populate("User", "username email profilePic");

  if (!pendingapplications) {
    res.status(200).json("no pending appications");
  }
  res
    .status(200)
    .json(
      new Apiresponse(
        200,
        pendingapplications,
        "Pending Applications fetched successfully"
      )
    );
});

const AllapprovedSellers = asynchandler(async (req, res) => {
  const approvedseller = await Sellers.find({
    status: "approved",
  }).populate("User", "username email profilePic");

  if (!approvedseller) {
    res.status(200).json("no approved sellers");
  }
  res
    .status(200)
    .json(
      new Apiresponse(
        200,
        approvedseller,
        "Approved sellers fetched successfully"
      )
    );
});

const updateSellerStatus = asynchandler(async (req, res) => {
  if (req.user.role !== "admin") {
    throw new Apierror(
      400,
      "you are not admin so you cant proceed please login as admin first"
    );
  }
  const { status, SellerId } = req.body;
  const Seller = await Sellers.findById(SellerId);
  if (!Seller) {
    throw new Apierror(401, "Seller not found no seller of this id exists");
  }
  Seller.status = status;
  await Seller.save({ validateBeforeSave: false });

  const Userinstance = await Users.findById(Seller.User);
    if (!Userinstance) {
      throw new Apierror(400, "User not found");
    }

  if (status === "approved") {
    Userinstance.role = "seller";
    await Userinstance.save({ validateBeforeSave: true });

    res
      .status(200)
      .json(
        new Apiresponse(
          200,
          Seller,
          `user with ${Seller.User} is now an Approved Seller`
        )
      );
  }
  if (status === "rejected") {
      
    Userinstance.role="customer";
    await Userinstance.save({validateBeforeSave:true});
    res.status(200).json(new Apiresponse(200,{},"Seller isnt approved anymore"))
  }
});

const deleteSeller = asynchandler(async (req, res) => {
  // if (req.user.role !== "admin") {
  //   throw new Apierror(
  //     400,
  //     "you are not admin so you cant proceed please login as admin first"
  //   );
  // }
  // const {Id} = req.body;
  // const Seller = await Sellers.findById(Id);
  // if (!Seller) {
  //   throw new Apierror(401, "Seller not found no seller of this id exists");
  // }
  // Seller.status = "rejected";
  // await Seller.save({ validateBeforeSave: false });

  // if (Seller.status === "rejected") {
  //   const products = await Products.deleteMany({ sellerinfo: Seller._id });
  //   if (!products) {
  //     throw new Apierror(400, "Products not found !");
  //   }
  // }

  // return res.status(200).json(new Apiresponse(200,{},"Seller Removed successfully"));

  const {Id} = req.body;
  const Seller = await Sellers.findById(Id);
  return res.status(200).json(Seller);
  
});

export {
  createSellerApplication,
  Allpendingapplications,
  updateSellerStatus,
  AllapprovedSellers,
};
