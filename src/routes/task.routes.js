import { Router } from "express";
import { getAllTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const taskRoutes = Router();

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;