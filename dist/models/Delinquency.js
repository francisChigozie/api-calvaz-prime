"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delinquency = void 0;
// src/models/Delinquency.ts
const mongoose_1 = require("mongoose");
const escalationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['EFCC', 'Police', 'Litigation', 'Internal'],
        required: true,
    },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    approvalDocId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Document' },
    date: { type: Date, required: true },
}, { _id: false });
const delinquencySchema = new mongoose_1.Schema({
    loanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Loan', required: true },
    bucket: { type: String, enum: ['30', '60', '90', '180+'], required: true },
    firstDefaultDate: { type: Date, required: true },
    currentDPD: { type: Number, required: true },
    reasons: [{ type: String }],
    riskCategory: String,
    escalations: [escalationSchema],
}, { timestamps: true });
exports.Delinquency = (0, mongoose_1.model)('Delinquency', delinquencySchema);
//# sourceMappingURL=Delinquency.js.map