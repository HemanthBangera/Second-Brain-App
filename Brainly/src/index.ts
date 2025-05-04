import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, Content, Tag, Link } from "./db";
import { z } from "zod";
import { jwt_secret } from "./config";
import { userMiddleware } from "./userMiddleware";
import { linkstring } from "./util";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const userzod = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

app.post("/api/v1/signup", async (req, res) => {
  const validation = userzod.safeParse(req.body);
  if (!validation.success) {
    res.status(411).json({
      message: "Incorrect credentials",
    });
  } else {
    const { username, password } = validation.data;

    try {
      const user = await User.create({
        username,
        password,
      });
      const token = jwt.sign({ userId: user._id }, jwt_secret);

      res.json({
        message: "User signed up",
        token,
      });
    } catch (e) {
      res.status(411).json({
        message: "User already exists",
      });
    }
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const validation = userzod.safeParse(req.body);
  if (!validation.success) {
    res.status(411).json({
      message: "Incorrect credentials",
    });
  } else {
    const { username, password } = validation.data;
    try {
      const existinguser = await User.findOne({
        username,
        password,
      });

      if (existinguser) {
        const token = jwt.sign({ userId: existinguser._id }, jwt_secret);
        res.status(200).json({
          message: "Login successful!",
          token,
        });
      } else {
        res.status(403).json({
          message: "User not found",
        });
      }
    } catch (e) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }
});

const contentZod = z.object({
  link: z.string(),
  type: z.string(),
  title: z.string(),
  userId: z.string().optional(),
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const contentvalidation = contentZod.safeParse(req.body);

  if (!contentvalidation.success) {
    res.status(411).json({
      message: "Invalid inputs",
    });
  } else {
    const { link, type, title } = contentvalidation.data;
    try {
      const content = await Content.create({
        link,
        type,
        title,
        tags: [],
        //@ts-ignore
        userId: req.userId,
      });
      res.status(200).json({
        message: "Content created successfully!",
      });
    } catch (e) {
      res.status(500).json({
        //@ts-ignore
        error: e.message,
        message: "Internal Server Error",
      });
    }
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  try {
    const content = await Content.find({
      userId,
    }).populate("userId", "username");

    res.status(200).json({
      content,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const contentId = req.body.contentId;
  try {
    await Content.deleteMany({
      userId,
      _id:contentId,
    });
    res.status(200).json({
      message: "Content deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const share = req.body.share;

  if (share) {
    const existingLink = await Link.findOne({
      //@ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.status(200).json({
        hash: existingLink.hash,
      });
    } else {
      try {
        const link = await Link.create({
          hash: linkstring(10),
          //@ts-ignore
          userId: req.userId,
        });
        res.status(200).json({
          message: "Link updated successfully!",
          hash: link.hash,
        });
      } catch (e: any) {
        res.status(500).json({
          message: "Internal Server Error",
          error: e.message,
        });
      }
    }
  } else {
    try {
      const deleteLink = await Link.deleteMany({
        //@ts-ignore
        userId: req.userId,
      });
      res.status(200).json({
        message: "Link deleted successfully",
      });
    } catch (e: any) {
      res.status(500).json({
        message: "Internal Server Error",
        error: e.message,
      });
    }
  }
});

app.get("/api/v1/brain/:sharelink", async (req, res) => {
  const hashvalue = req.params.sharelink;

  try {
    const link = await Link.findOne({
      hash: hashvalue,
    });
    if (!link) {
      throw new Error("Link not found");
    }

    const user = await User.findOne({ _id: link.userId });
    if (!user) {
      throw new Error("User not found");
    }

    const content = await Content.find({ userId: link.userId });

    res.status(200).json({
      username: user.username,
      content,
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Internal Server Error!",
      error: e.message,
    });
  }
});

app.listen(3000);
