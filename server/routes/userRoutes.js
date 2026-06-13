const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getProfile, onlyAdmin, updateProfile } = require("../controllers/userController");

router.get("/profile",protect,getProfile);
router.put("/profile",protect,updateProfile);
router.get("/admin",protect,authorize("admin"),onlyAdmin);

module.exports = router;

