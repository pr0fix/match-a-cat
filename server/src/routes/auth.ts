import express, { Request, Response } from "express";
import authService from "../services/authService";

interface LoginRequestBody {
  username: string;
  password: string;
}

interface SignupRequestBody extends LoginRequestBody {
  name: string;
}

const router = express.Router();

// login route
router.post(
  "/login",
  async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { username, password } = req.body;
    try {
      const result = await authService.login(username, password);
      if (result.error) {
        res.status(401).send({ error: "Invalid credentials" });
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// sign up route
router.post(
  "/sign-up",
  async (req: Request<{}, {}, SignupRequestBody>, res: Response) => {
    const { username, name, password } = req.body;
    try {
      const result = await authService.signup(username, name, password);
      res.status(201).send(result);
    } catch (error: unknown) {
      console.error("Signup error:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: "Invalid input" });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

export default router;
