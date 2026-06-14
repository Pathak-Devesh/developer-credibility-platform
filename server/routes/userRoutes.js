const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getProfile, onlyAdmin, updateProfile,getPublicProfile,getGithubProfile,getSkillVerification } = require("../controllers/userController");

router.get("/profile",protect,getProfile);
router.put("/profile",protect,updateProfile);
router.get("/admin",protect,authorize("admin"),onlyAdmin);

router.get("/:id/github", getGithubProfile);
router.get("/:id/skills", getSkillVerification);
router.get("/:id", getPublicProfile);


module.exports = router;

