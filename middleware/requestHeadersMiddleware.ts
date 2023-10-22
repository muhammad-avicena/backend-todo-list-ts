import { v4 as uuidv4 } from "uuid";
import { Request, Response, NextFunction } from "express";

const requestHeadersMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("x-developed-by", "Avicena");
  if (req.headers["x-request-id"]) {
    res.setHeader("x-request-id", req.headers["x-request-id"]);
    req.requestId = req.headers["x-request-id"];
  } else {
    const uuid = uuidv4();
    res.setHeader("x-request-id", uuid);
    req.requestId = uuid;
  }
  next();
};

export default requestHeadersMiddleware;
