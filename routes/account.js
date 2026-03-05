import express from "express";
import { createAccount, fetchUserAccounts } from "../controllers/account.js";

const router = express.Router();

router.post("/create", createAccount);

router.get("/", fetchUserAccounts);

export default router;
