/** Contains all routes **/

import { Router } from "express";
const router = Router();

import { getContacts, createContact, updateContact, deleteContact } from "../controllers/index.controller.js";

router.get("/contacts", getContacts);
router.post("/contacts", createContact);
router.put("/contacts/:id", updateContact);
router.delete("/contacts/:id", deleteContact);

export default router;