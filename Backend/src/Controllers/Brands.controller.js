import { asynchandler } from "../utils/Asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { Apierror } from "../utils/Apierror.js";

import mongoose from "mongoose";
import { Sellers } from "../models/Seller.model.js";
import { Products } from "../models/Products.model.js";

export const getBrands = asynchandler(async (req, res) => {
  const approvedseller = await Sellers.find({ status: "approved" }).populate(
    "User",
    "username email profilePic"
  );

  if (!approvedseller) {
    throw new Apierror(404, "No Approved Sellers Found on Your Website");
  }

  const Brands = approvedseller.map((seller) => {
    return { Brandname: seller.businessName, BrandLogo: seller.brandLogo };
  });

  if (!Brands) {
    throw new Apierror(404, "Brands not found");
  }

  return res.status(200).json(Brands);
});

// export const getProductbyBrandname = asynchandler(async (req, res) => {
   
//     const {name}=req.params;
//     const Products=await Products.find({})


// });
