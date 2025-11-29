"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentModel = void 0;
// src/models/Document.ts
const mongoose_1 = require("mongoose");
const scanSchema = new mongoose_1.Schema({
    passed: { type: Boolean, required: true },
    engine: String,
    at: Date,
}, { _id: false });
const documentSchema = new mongoose_1.Schema({
    loanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Loan' },
    debtorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Debtor' },
    type: {
        type: String,
        enum: ['legal-notice', 'repayment-agreement', 'id', 'collateral', 'audit', 'other'],
        required: true,
    },
    fileKey: { type: String, required: true },
    fileName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    checksum: { type: String, required: true },
    uploadedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    scanned: scanSchema,
    retentionPolicy: String,
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.DocumentModel = (0, mongoose_1.model)('Document', documentSchema);
//# sourceMappingURL=Document.js.map