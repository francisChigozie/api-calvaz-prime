"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBlog = listBlog;
exports.getBlogBySlug = getBlogBySlug;
exports.getBlog = getBlog;
exports.createBlog = createBlog;
exports.updateBlog = updateBlog;
exports.deleteBlog = deleteBlog;
const mongoose_1 = __importDefault(require("mongoose"));
const BlogPost_1 = __importDefault(require("../models/BlogPost"));
const slug_1 = require("../utils/slug");
// Safely decode once or twice to handle accidental double-encoding
function fullyDecodeSlug(value) {
    let decoded = value;
    for (let i = 0; i < 2; i++) {
        try {
            const next = decodeURIComponent(decoded);
            if (next === decoded)
                break;
            decoded = next;
        }
        catch {
            break;
        }
    }
    return decoded;
}
async function listBlog(req, res) {
    const { q, page = 1, limit = 10 } = req.query;
    const filter = q ? { title: { $regex: q, $options: "i" } } : {};
    const docs = await BlogPost_1.default.find(filter)
        .sort({ createdAt: -1 })
        .skip((+page - 1) * +limit)
        .limit(+limit);
    const count = await BlogPost_1.default.countDocuments(filter);
    res.json({ data: docs, total: count });
}
async function getBlogBySlug(req, res) {
    const raw = req.params.slug;
    if (!raw)
        return res.status(400).json({ message: "Missing slug" });
    // Decode and normalize to match how slugs are stored
    const decoded = fullyDecodeSlug(raw);
    const normalized = (0, slug_1.slugify)(decoded);
    const post = await BlogPost_1.default.findOne({ slug: normalized, published: true });
    if (!post)
        return res.status(404).json({ message: "Not found" });
    res.json(post);
}
async function getBlog(req, res, next) {
    try {
        const idOrSlug = req.params.idOrSlug ??
            req.params.id ??
            req.params.slug;
        if (!idOrSlug) {
            return res.status(400).json({ message: "Missing blog identifier" });
        }
        let post = null;
        if (mongoose_1.default.Types.ObjectId.isValid(idOrSlug)) {
            post = await BlogPost_1.default.findById(idOrSlug);
        }
        else {
            // Decode once or twice to handle accidental double-encoding
            const fullyDecode = (value) => {
                let decoded = value;
                for (let i = 0; i < 2; i++) {
                    try {
                        const next = decodeURIComponent(decoded);
                        if (next === decoded)
                            break;
                        decoded = next;
                    }
                    catch {
                        break;
                    }
                }
                return decoded;
            };
            const decoded = fullyDecode(idOrSlug);
            const normalized = (0, slug_1.slugify)(decoded);
            // First try normalized/published slug (recommended)
            post = await BlogPost_1.default.findOne({ slug: normalized, published: true });
            // Fallback: try raw slug as-is (in case older records stored differently)
            if (!post && idOrSlug !== normalized) {
                post = await BlogPost_1.default.findOne({ slug: idOrSlug });
            }
        }
        if (!post) {
            return res.status(404).json({ message: "Blog post not found" });
        }
        return res.status(200).json(post);
    }
    catch (err) {
        next(err);
    }
}
async function createBlog(req, res) {
    const slug = (0, slug_1.slugify)(req.body.title);
    const post = await BlogPost_1.default.create({
        ...req.body,
        slug,
        coverImage: req.file?.filename ?? undefined,
        publishedAt: req.body.published ? new Date() : undefined
    });
    res.status(201).json(post);
}
async function updateBlog(req, res) {
    const update = { ...req.body };
    if (update.title)
        update.slug = (0, slug_1.slugify)(update.title);
    if (req.file?.filename)
        update.coverImage = req.file.filename;
    if (typeof update.published === "boolean") {
        update.publishedAt = update.published ? new Date() : undefined;
    }
    const post = await BlogPost_1.default.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!post)
        return res.status(404).json({ message: "Not found" });
    res.json(post);
}
async function deleteBlog(req, res) {
    await BlogPost_1.default.findByIdAndDelete(req.params.id);
    res.status(204).send();
}
//# sourceMappingURL=blog.controller.js.map