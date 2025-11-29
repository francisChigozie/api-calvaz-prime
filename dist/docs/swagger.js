"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
exports.swaggerSpec = {
    openapi: "3.0.3",
    info: { title: "CALVAZ PRIME CONCEPTS API", version: "1.0.0" },
    servers: [{ url: "/api" }],
    paths: {
        "/auth/login": { post: { summary: "Login", requestBody: {}, responses: { "200": { description: "OK" } } } },
        "/blog": { get: { summary: "List blog" }, post: { summary: "Create blog (admin)" } }
        // Extend similarly for all endpoints
    }
};
//# sourceMappingURL=swagger.js.map