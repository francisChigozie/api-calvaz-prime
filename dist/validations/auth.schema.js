"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twofaVerifySchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8)
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8)
    })
});
exports.twofaVerifySchema = zod_1.z.object({
    body: zod_1.z.object({
        token: zod_1.z.string().min(6).max(6)
    })
});
//# sourceMappingURL=auth.schema.js.map