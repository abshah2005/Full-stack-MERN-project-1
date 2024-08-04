import { Router } from "express";
const router = Router();
import {
    postOrder,
    getOrderById,
    getOrdersByUserId,
    getOrders,deleteOrder,updateOrderStatus
   } from "../Controllers/Orders.controller.js";

   import {
    verifyJWT,
    verifySeller,
    verifyAdminorSeller,
    verifyAdmin
  } from "../middlewares/Authentication.middleware.js";


  router.route("/postorder").post(verifyJWT,postOrder);
//   router.route("/getorders").get(verifyJWT,verifyAdmin,getOrders);
  router.route("/getorders").get(verifyJWT,verifyAdmin,getOrders);

  router.route("/deleteorder/:id").delete(verifyJWT,verifyAdmin,deleteOrder);
  router.route("/updateorder/:id").post(verifyJWT,verifyAdmin,updateOrderStatus);
  router.route("/getordersbyid/:id").get(getOrdersByUserId);




  export default router;