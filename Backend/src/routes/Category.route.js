import { Router } from "express";
const router = Router();
import {
 postCategories,
 getCategories,
 getCategoryById,
 updateCategory,
 deleteCategory
} from "../Controllers/Category.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";
import {
  verifyJWT,
  verifySeller,
  verifyAdminorSeller
} from "../middlewares/Authentication.middleware.js";


router.route("/postCategory").post(upload.fields([{ name: "pic", maxCount: 1 }]),verifyJWT,verifyAdminorSeller,postCategories);
router.route("/getCategories").get(getCategories);
router.route("/getCatid/:id").get(getCategoryById);
router.route("/updateCategory/:id").put(upload.fields([{ name: "pic", maxCount: 1 }]),verifyJWT,verifyAdminorSeller,updateCategory);
router.route("/deleteCategory/:id").delete(verifyJWT,verifyAdminorSeller,deleteCategory);


export default router;
