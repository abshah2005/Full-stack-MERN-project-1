import { Router } from "express";
const router = Router();
import {
 getBrands
} from "../Controllers/Brands.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";
import {
  verifyJWT,
  verifySeller,
  verifyAdminorSeller
} from "../middlewares/Authentication.middleware.js";



router.route("/getBrands").get(getBrands);


export default router;
