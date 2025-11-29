"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecoverLogSchema = exports.createRecoverLogSchema = void 0;
// src/validations/recoverLog.validation.ts
const zod_1 = require("zod");
const collateralSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    registryRef: zod_1.z.string().optional(),
    value: zod_1.z.number().optional(),
    perfected: zod_1.z.boolean().default(false),
    documents: zod_1.z.array(zod_1.z.string()).optional().default([]),
});
exports.createRecoverLogSchema = zod_1.z.object({
    debtorId: zod_1.z.string().min(1),
    accountNumber: zod_1.z.string().min(1),
    originationDate: zod_1.z.string().datetime(),
    purpose: zod_1.z.string().optional(),
    approvalConditions: zod_1.z.array(zod_1.z.string()).optional().default([]),
    principal: zod_1.z.number().positive(),
    interestRate: zod_1.z.number().min(0),
    tenureMonths: zod_1.z.number().int().positive(),
    collateral: zod_1.z.array(collateralSchema).optional().default([]),
    status: zod_1.z.string().optional(),
});
exports.updateRecoverLogSchema = exports.createRecoverLogSchema.partial();
//# sourceMappingURL=recoverLog.validation.js.map