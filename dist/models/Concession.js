"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Concession = void 0;
// src/models/Concession.ts
const mongoose_1 = require("mongoose");
const proposalSchema = new mongoose_1.Schema({
    terms: { type: String, required: true },
    rationale: String,
    documents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Document' }],
}, { _id: false });
const approvalSchema = new mongoose_1.Schema({
    approverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, required: true },
    decision: { type: String, required: true },
    reason: String,
    date: { type: Date, required: true },
}, { _id: false });
const concessionSchema = new mongoose_1.Schema({
    loanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Loan', required: true },
    type: {
        type: String,
        enum: ['interest-waiver', 'restructure', 'write-off', 'moratorium'],
        required: true,
    },
    proposal: { type: proposalSchema, required: true },
    status: {
        type: String,
        enum: ['draft', 'submitted', 'approved', 'rejected'],
        default: 'draft',
    },
    submittedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    approvals: [approvalSchema],
}, { timestamps: true });
exports.Concession = (0, mongoose_1.model)('Concession', concessionSchema);
//# sourceMappingURL=Concession.js.map