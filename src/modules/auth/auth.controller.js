import { Router } from "express";
import { login, signup } from "./auth.service.js";

const authController = Router();

authController.post("/signup", async (req, res) => {
  const result = await signup(req.body);
  return res.status(201).json({ msg: "created", data: result });
});

authController.post("/login", async (req, res) => {
  const result = await login(req.body);
  return res.status(200).json({ msg: "done", data: result });
});

export default authController;
