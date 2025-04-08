import { ContentModel } from "../database/db";
import { Router } from "express";
const ContentRouter = Router();
import { z } from "zod";
import { auth } from "../middleware/auth";

ContentRouter.post("/", auth, async (req, res) => {
  const requiredBody = z.object({
    link: z.string().min(4).max(500),
    type: z.enum(["youtube", "twitter", "linkedin", "facebook", "instagram"]),
    title: z.string().min(4).max(500),
    tags: z.array(z.string().min(1)).min(3).max(5),
  });

  const parsedData = requiredBody.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data",
      Error: parsedData.error.format(),
    });
    return;
  }
  try {
    const { link, type, title, tags } = parsedData.data;
    const content = await ContentModel.create({
      link: link,
      type: type,
      title: title,
      tags: tags,
      // @ts-ignore
      UserId: req.userId,
    });

    if (content) {
      res.status(201).send({
        message: "Content created successfully",
        content: content,
      });
    } else {
      res.status(400).send({
        message: "Content not created",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error during content creation",
      Error: error,
    });
  }
});

// To get all the content of a user pass the userId in the body
// {
//   "userId": "67a0999226338c82e3f01715"
// }

ContentRouter.get("/", auth, async (req, res) => {
  const userId = (req as any).userId;
  // console.log(userId);
  if (!userId) {
    res.status(400).send({ message: "UserId Error" });
    return;
  }
  try {
    const content = await ContentModel.find({ UserId: userId }).populate(
      "_id",
      "username"
    );
    console.log(content);
    if (content) {
      res.status(200).send({
        message: "Content found",
        content: content,
      });
    } else {
      res.status(404).send({ message: "Content not found" });
    }
  } catch (error) {
    res.status(404).send({ message: "Something went wrong", Error: error });
  }
});

// To delete the content pass the id of the content in the body
// {
// "id": "67a09c3b64a99983bf425466"
// }

ContentRouter.delete("/", auth, async (req, res) => {
  const contentId = req.body.id;
  if (!contentId) {
    res.status(400).send({ message: "ContentId Error" });
    return;
  }
  try {
    const deletedContent = await ContentModel.deleteOne({
      _id: contentId,
      //@ts-ignore
      UserId: req.userId,
    });
    if (deletedContent) {
      res.status(200).send({
        message: "Content deleted successfully",
      });
    } else {
      res.status(404).send({ message: "Content not found" });
    }
  } catch (error) {
    res.status(404).send({ message: "Something went wrong", Error: error });
  }
});

// {
//   "id": "661131f2a8a31e4566b4e1fc",
//   "link": "https://youtube.com/example",
//   "type": "youtube",
//   "title": "Updated Video Title",
//   "tags": ["programming", "tech", "tutorial"]
// }

ContentRouter.put("/", auth, async (req, res) => {
  const updateSchema = z.object({
    id: z.string(), // Content ID to update
    link: z.string().min(4).max(500).optional(),
    type: z
      .enum(["youtube", "twitter", "linkedin", "facebook", "instagram"])
      .optional(),
    title: z.string().min(4).max(500).optional(),
    tags: z.array(z.string().min(1)).min(3).max(5).optional(),
  });

  const parsedData = updateSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).send({
      message: "Invalid Input Data",
      Error: parsedData.error.format(),
    });
    return;
  }

  try {
    const { id, ...updateFields } = parsedData.data;

    const updatedContent = await ContentModel.findOneAndUpdate(
      {
        _id: id,
        // @ts-ignore
        UserId: req.userId,
      }, // Ensure the content belongs to the authenticated user
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (updatedContent) {
      res.status(200).send({
        message: "Content updated successfully",
        content: updatedContent,
      });
    } else {
      res.status(404).send({ message: "Content not found or not authorized" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Error during content update",
      Error: error,
    });
  }
});

export { ContentRouter };
