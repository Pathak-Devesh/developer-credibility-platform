const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { createProject,getMyProjects,getProjectById, updateProject ,deleteProject ,getAllProjects} = require("../controllers/projectController");
const router = express.Router();

router.post("/",protect,createProject);
router.get("/my-projects",protect,getMyProjects);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);


router.put("/:id",protect,updateProject);
router.delete("/:id",protect,deleteProject);

module.exports = router;