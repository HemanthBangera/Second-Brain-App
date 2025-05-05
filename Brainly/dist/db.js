"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Content = exports.Tag = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://Hemanth:YZGhWSZoUAOJnyev@cluster0.lbhyr.mongodb.net/brainly");
const UserSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
const TagSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});
const contentTypes = ['youtube', 'twitter', 'linkedin', 'instagram', 'reddit'];
const ContentSchema = new mongoose_1.default.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag",
            required: true,
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Tag = mongoose_1.default.model("Tag", TagSchema);
exports.Content = mongoose_1.default.model("Content", ContentSchema);
exports.Link = mongoose_1.default.model("Link", LinkSchema);
