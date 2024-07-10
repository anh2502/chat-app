import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage, getMessages, getUsersConnected } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute, getUsersConnected)
router.post("/send/:id", protectRoute, sendMessage)
router.get("/:id", protectRoute, getMessages)

export default router;