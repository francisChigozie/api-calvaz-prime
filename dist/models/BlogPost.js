"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BlogPostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("BlogPost", BlogPostSchema);
//# sourceMappingURL=BlogPost.js.map