const express = require("express");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });
const router = express.Router();

router.use(authMiddleware);

router.get("/getTasks", getTasks);
router.post("/addTask", upload.single("file"), createTask);
router.put("/updateTaskById/:id", updateTask);
router.delete("/deleteTaskById/:id", deleteTask);

module.exports = router;