const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middleware/authMiddleware");
const { getProfile, onlyAdmin } = require("../controllers/userController");

router.get("/profile",protect,getProfile);
router.get("/admin",protect,authorize("admin"),onlyAdmin);

module.exports = router;

