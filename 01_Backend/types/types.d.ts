import { Request } from "express";

declare module "express" {
  interface Request {
    userId?: string; // Add the `userId` property
  }
}
