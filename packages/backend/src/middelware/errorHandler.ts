import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error occurred: ${err.message}`);
  // We assume that this is a development environment, so we log the stack trace
  console.error(err.stack);

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.status(500).json({ error: "Internal Server Error" });
};

export default errorHandler;
