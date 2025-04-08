import { ContentModel, LinkModel, UserModel } from "../database/db";
import { auth } from "../middleware/auth";
import { random } from "../utils";
import { Router } from "express";
const BrainRouter = Router();
;
// http://localhost:3000/api/v1/brain/share
// This is the share link in order to share the content True of False
BrainRouter.post("/share", auth, async (req, res) => {
  const share = req.body.share;

  try {
    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: (req as any).userId,
      });
      if (existingLink) {
        res.status(200).send({
          Link: existingLink.hash,
        });
        return;
      }

      const hashValue = random(10);

      await LinkModel.create({
        userId: (req as any).userId, // not recommended but used

        hash: hashValue,
      });
      res.status(200).json({ message: hashValue });
      return;
    } else {
      await LinkModel.deleteOne({ userId: (req as any).userId });

      res.status(200).json({ message: "Updated Shareable Link" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      Error: error,
    });
  }
});

// http://localhost:3000/api/v1/brain/dtn2kh2ufl
// This is the shareable link for this route
BrainRouter.get("/:shareLink", auth, async (req, res) => {
  const hash = req.params.shareLink;

  console.log(hash);
  const link = await LinkModel.findOne({ hash });

  console.log("Received link", link);
  //  for debugging

  if (!link) {
    res.status(404).json({ message: "Link not found" });
    return;
  }

  const content = await ContentModel.findOne({
    UserId: link.userId,
  });

  // console.log("Received UserId", link.userId); for debugging
  // console.log("Received content", content); for debugging

  if (!content) {
    res.status(404).json({ message: "Content not found" });
    return;
  }

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  // console.log("Received user", user); for debugging

  if (!user) {
    res
      .status(404)
      .json({ message: "User not found, Error should ideally not happen" });
    return;
  }

  res.status(200).json({
    user: user.username,
    content: content,
  });
});

export { BrainRouter };
