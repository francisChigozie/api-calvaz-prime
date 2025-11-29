"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLog = void 0;
// src/models/AuditLog.ts
const mongoose_1 = require("mongoose");
const auditLogSchema = new mongoose_1.Schema({
    actorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
    targetCollection: { type: String, required: true },
    targetId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    beforeHash: String,
    afterHash: String,
    ip: String,
    userAgent: String,
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.AuditLog = (0, mongoose_1.model)('AuditLog', auditLogSchema);
//# sourceMappingURL=AuditLog.js.map