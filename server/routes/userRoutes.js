const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getProfile, onlyAdmin, updateProfile,getPublicProfile,getGithubProfile,
    getSkillVerification,getAllDevelopers,saveDeveloper,removeSavedDeveloper,getSavedDevelopers } = require("../controllers/userController");

router.get("/profile",protect,getProfile);
router.put("/profile",protect,updateProfile);
router.get("/admin",protect,authorize("admin"),onlyAdmin);

router.get("/", getAllDevelopers);

router.post("/saved/:developerId",protect,authorize("recruiter"),saveDeveloper);
router.delete("/saved/:developerId",protect,authorize("recruiter"),removeSavedDeveloper);
router.get("/saved",protect,authorize("recruiter"),getSavedDevelopers);

router.get("/:id/github", getGithubProfile);
router.get("/:id/skills", getSkillVerification);


router.get("/:id", getPublicProfile);


module.exports = router;

