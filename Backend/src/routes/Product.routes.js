import { Router } from "express";
const router = Router();
import {
  createProducts,
  deleteProduct,
  getAllProducts,
  getProductbyId,
  getProductsBybrand,
  getProductsByCategory,
  getProductsBySellerId,
  UpdateProduct,
} from "../Controllers/Products.controller.js";
import {
  verifyJWT,
  verifySeller,
  verifyAdminorSeller
} from "../middlewares/Authentication.middleware.js";
import { upload } from "../middlewares/Multer.middleware.js";

router
  .route("/createproduct")
  .post(
    verifyJWT,
    verifySeller,
    upload.fields([
      { name: "pics", maxCount: 10 },
      { name:"gltfModels",maxCount:5},
    ]),
    createProducts
  );
router
  .route("/deleteproduct/:id")
  .delete(verifyJWT, verifyAdminorSeller, deleteProduct);
router
  .route("/updateproduct/:id")
  .put(
    verifyJWT,
    verifyAdminorSeller,
    upload.fields([{ name: "pics", maxCount: 10 }]),
    UpdateProduct
  );
router.route("/getproducts").get(getAllProducts);
router.route("/getprodbyid/:id").get(getProductbyId);
router.route("/getprodbySellerId").get(verifyJWT,verifySeller,getProductsBySellerId);
router.route("/getproductsbycategory/:name").get(getProductsByCategory);
router.route("/getproductsbybrand/:name").get(getProductsBybrand);


export default router;
