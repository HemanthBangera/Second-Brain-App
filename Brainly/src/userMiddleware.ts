import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./config";
export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(403).json({
      message: "No token provided",
    });
  } else {
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    const decoded = jwt.verify(token as string, jwt_secret);
    if (decoded) {
      //@ts-ignore
      req.userId = decoded.userId;
      next();
    } else {
      res.status(403).json({
        message: "You are not logged in",
      });
    }
  }
};
