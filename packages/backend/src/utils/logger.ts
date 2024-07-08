import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);

  console.log("Request Body:", req.body);
  console.log("Request Headers:", req.headers);
  console.log("Response:", res);

  next();
};

export default loggerMiddleware;
