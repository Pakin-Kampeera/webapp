import { validateProfile } from "../middleware/verifyField";
import { viewProfile, editProfile } from "../controllers/profile.controller";
import { verifyToken } from "../middleware/authJwt";
import { uploadImage } from "../utils/image.utils";
import { Router } from "express";

const router = Router();

router.route("/profile").get(verifyToken, viewProfile);
router
  .route("/profile")
  .put(uploadImage.single("upload"), verifyToken, validateProfile, editProfile);

export { router };
