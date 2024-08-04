import { Router } from "express";
import {
  createSellerApplication,
  Allpendingapplications,updateSellerStatus, AllapprovedSellers, 
} from "../Controllers/Seller.controller.js";
import { verifyJWT,verifyAdmin } from "../middlewares/Authentication.middleware.js";
import { upload } from "../middlewares/Multer.middleware.js";
const router = Router();
router.route("/apply").post(verifyJWT,upload.fields([{name:"brandLogo",maxCount:1}]),createSellerApplication);
router.route("/getpending").get(verifyJWT,verifyAdmin,Allpendingapplications);
router.route("/getapproved").get(verifyJWT,verifyAdmin,AllapprovedSellers);
router.route("/updatestatus").post(verifyJWT,verifyAdmin,updateSellerStatus);



export { router as sellerRoute };