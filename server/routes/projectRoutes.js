const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createProject, getMyProjects } = require("../controllers/projectController");
const router = express.Router();

router.post("/",protect,createProject);
router.get("/my-projects",protect,getMyProjects);

module.exports = router;