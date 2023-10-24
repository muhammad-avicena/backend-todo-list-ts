import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({ message: "to do list API !", developedBy: "Avicena" });
});

export default router;
