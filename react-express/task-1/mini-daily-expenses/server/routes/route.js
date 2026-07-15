import express from "express";
const router = express.Router();
import {
  getExpenses,
  create,
  update,
  deleted,
} from "../controllers/controller.js";

router.get("/", getExpenses);
router.post("/create", create);
router.put("/edit/:id", update);
router.delete("/deleted/:id", deleted);

export default router;
