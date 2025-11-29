"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const router = (0, express_1.Router)();
// Public
router.get("/", blog_controller_1.listBlog);
router.get("/slug/:slug", blog_controller_1.getBlogBySlug);
// Admin
router.get("/:idOrSlug", blog_controller_1.getBlog); //authenticate, requireAdmin, require2FA,
router.post("/", blog_controller_1.createBlog);
router.put("/:id", blog_controller_1.updateBlog);
router.delete("/:id", blog_controller_1.deleteBlog);
exports.default = router;
//# sourceMappingURL=blog.route.js.map