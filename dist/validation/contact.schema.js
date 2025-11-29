"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = void 0;
const zod_1 = require("zod");
exports.contactSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email address"),
        subject: zod_1.z.string().min(1, "Subject is required").max(120),
        message: zod_1.z.string().min(1, "Message is required").max(2000),
    }),
});
//# sourceMappingURL=contact.schema.js.map