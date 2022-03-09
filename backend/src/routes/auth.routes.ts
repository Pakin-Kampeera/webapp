import { signup, signin } from "../controllers/auth.controller";
import { validateSignup, validateSignin } from "../middleware/verifyField";
import { uploadImage } from "../utils/image.utils";
import { Router } from "express";

const router = Router();

router
  .route("/signup")
  .post(uploadImage.single("upload"), validateSignup, signup);
router.route("/signin").post(validateSignin, signin);

export { router };
