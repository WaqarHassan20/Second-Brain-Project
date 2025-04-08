import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../imports";
import { NextFunction, Response, Request } from "express";

function auth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ message: "Token is required" });
    return;
  }

  try {
    const decodedData = jwt.verify(authorization, JWT_SECRET);
    if (decodedData) {
      //@ts-ignore
      req.userId = decodedData.id;
      next();
    } else {
      res.status(401).send({ message: "Invalid Token" });
      return;
    }
  } catch (error) {
    res
      .status(401)
      .send({ message: "Error while Authenticating", Error: error });
  }
}

export { auth };
