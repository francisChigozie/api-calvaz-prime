"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDebtorSchema = exports.createDebtorSchema = void 0;
// src/validations/debtor.validation.ts
const zod_1 = require("zod");
exports.createDebtorSchema = zod_1.z.object({
    fullName: zod_1.z.string().min(1),
    aliases: zod_1.z.array(zod_1.z.string()).optional().default([]),
    nationalIdType: zod_1.z.string().min(1),
    nationalIdNumber: zod_1.z.string().min(1),
    dateOfBirth: zod_1.z.string().datetime().optional(),
    addresses: zod_1.z.array(zod_1.z.string()).optional().default([]),
    phones: zod_1.z.array(zod_1.z.string()).optional().default([]),
    emails: zod_1.z.array(zod_1.z.string().email()).optional().default([]),
    employer: zod_1.z.string().optional(),
    nextOfKin: zod_1.z.string().optional(),
    riskRating: zod_1.z.string().optional(),
});
exports.updateDebtorSchema = exports.createDebtorSchema.partial();
//# sourceMappingURL=debtor.validation.js.map