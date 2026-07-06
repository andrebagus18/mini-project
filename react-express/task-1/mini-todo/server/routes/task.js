import express from "express";
import {
  create,
  editTodo,
  getAllData,
  deleted,
} from "../controllers/todoController.js";
const router = express.Router();

router.post("/", create);
router.get("/", getAllData);
router.put("/:id", editTodo);
router.delete("/:id", deleted);

export default router;
