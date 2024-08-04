import { Router } from "express";
import {
  Loginuser,
  getCurrentUser,
  getuser,
  LogoutUser,
  registerUser,
} from "../Controllers/User.controller.js";
import { upload } from "../middlewares/Multer.middleware.js";
import { verifyJWT } from "../middlewares/Authentication.middleware.js";
const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "profilePic", maxCount: 1 }]), registerUser);

  router.route("/getuser").get(getuser);

  router.route("/login").post(Loginuser);
  
  router.route("/logout").post(verifyJWT,LogoutUser);
  router.route("/getcurrent").get(verifyJWT,getCurrentUser);

  export default router;
