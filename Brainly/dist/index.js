"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const zod_1 = require("zod");
const config_1 = require("./config");
const userMiddleware_1 = require("./userMiddleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const userzod = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, { message: "Username must be at least 3 characters" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = userzod.safeParse(req.body);
    if (!validation.success) {
        res.status(411).json({
            message: "Incorrect credentials",
        });
    }
    else {
        const { username, password } = validation.data;
        try {
            const user = yield db_1.User.create({
                username,
                password,
            });
            const token = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.jwt_secret);
            res.json({
                message: "User signed up",
                token,
            });
        }
        catch (e) {
            res.status(411).json({
                message: "User already exists",
            });
        }
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = userzod.safeParse(req.body);
    if (!validation.success) {
        res.status(411).json({
            message: "Incorrect credentials",
        });
    }
    else {
        const { username, password } = validation.data;
        try {
            const existinguser = yield db_1.User.findOne({
                username,
                password,
            });
            if (existinguser) {
                const token = jsonwebtoken_1.default.sign({ userId: existinguser._id }, config_1.jwt_secret);
                res.status(200).json({
                    message: "Login successful!",
                    token,
                });
            }
            else {
                res.status(403).json({
                    message: "User not found",
                });
            }
        }
        catch (e) {
            res.status(500).json({
                message: "Internal Server Error",
            });
        }
    }
}));
const contentZod = zod_1.z.object({
    link: zod_1.z.string(),
    type: zod_1.z.string(),
    title: zod_1.z.string(),
    userId: zod_1.z.string().optional(),
});
app.post("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentvalidation = contentZod.safeParse(req.body);
    if (!contentvalidation.success) {
        res.status(411).json({
            message: "Invalid inputs",
        });
    }
    else {
        const { link, type, title } = contentvalidation.data;
        try {
            const content = yield db_1.Content.create({
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
        }
        catch (e) {
            res.status(500).json({
                //@ts-ignore
                error: e.message,
                message: "Internal Server Error",
            });
        }
    }
}));
app.get("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db_1.Content.find({
            userId,
        }).populate("userId", "username");
        res.status(200).json({
            content,
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}));
app.delete("/api/v1/content", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;
    try {
        yield db_1.Content.deleteMany({
            userId,
            contentId,
        });
        res.status(200).json({
            message: "Content deleted",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}));
app.post("/api/v1/brain/share", userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield db_1.Link.findOne({
            //@ts-ignore
            userId: req.userId,
        });
        if (existingLink) {
            res.status(200).json({
                hash: existingLink.hash,
            });
        }
        else {
            try {
                const link = yield db_1.Link.create({
                    hash: (0, util_1.linkstring)(10),
                    //@ts-ignore
                    userId: req.userId,
                });
                res.status(200).json({
                    message: "Link updated successfully!",
                    hash: link.hash,
                });
            }
            catch (e) {
                res.status(500).json({
                    message: "Internal Server Error",
                    error: e.message,
                });
            }
        }
    }
    else {
        try {
            const deleteLink = yield db_1.Link.deleteMany({
                //@ts-ignore
                userId: req.userId,
            });
            res.status(200).json({
                message: "Link deleted successfully",
            });
        }
        catch (e) {
            res.status(500).json({
                message: "Internal Server Error",
                error: e.message,
            });
        }
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashvalue = req.params.sharelink;
    try {
        const link = yield db_1.Link.findOne({
            hash: hashvalue,
        });
        if (!link) {
            throw new Error("Link not found");
        }
        const user = yield db_1.User.findOne({ _id: link.userId });
        if (!user) {
            throw new Error("User not found");
        }
        const content = yield db_1.Content.find({ userId: link.userId });
        res.status(200).json({
            username: user.username,
            content,
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server Error!",
            error: e.message,
        });
    }
}));
app.listen(3000);
