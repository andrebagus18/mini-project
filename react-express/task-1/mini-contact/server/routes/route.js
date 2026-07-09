import express from "express";
const router = express.Router();
import {
  getContacts,
  create,
  update,
  deleted,
} from "../controllers/controller.js";

router.get("/", getContacts);
router.post("/create", create);
router.put("/update/:id", update);
router.delete("/deleted/:id", deleted);

export default router;
