import { UserModel } from "../database/db";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserRouter = Router();
import { z } from "zod";
import { JWT_SECRET } from "../imports";

// =========================== //
// =========================== //
UserRouter.post("/signup", async (req, res) => {
  console.log(req.body);

  const requiredBody = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(4).max(20),
  });

  // parsed data have three properties : success, data, error
  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data",
      Error: parsedData.error.format(),
    });
    return;
  }

  try {
    const { username, password } = parsedData.data;

    const user = await UserModel.findOne({
      username: username,
    });
    if (user) {
      res.json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).send({
      message: "User signed Up successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error Occured",
      Error: error,
    });
    return;
  }
});

// =========================== //
// =========================== //
UserRouter.post("/signin", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(4).max(20),
    password: z.string().min(4).max(20),
  });

  // parsed data have three properties : success, data, error

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data",
      Error: parsedData.error.format(),
    });
    return;
  }

  try {
    const { username, password } = parsedData.data;

    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }

    if (!user.password) {
      res.status(400).send({ message: "Password not set for the user" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res.status(401).send({
        message: "Password Incorrect",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).send({
      message: "User Signed In",
      token: token,
    });
    return;
  } catch (error) {
    res.status(401).send({ message: "Error while Signing In" });
  }
});

export { UserRouter };

// =========================== //
// =========================== //
// if (user) {
//   return res.json({ message: "User already exists" });
// }

// if (user) {
//   res.json({ message: "User already exists" });
//   return;
// }
