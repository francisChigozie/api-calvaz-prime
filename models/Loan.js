"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
// src/models/Loan.ts
const mongoose_1 = require("mongoose");
const collateralSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    registryRef: String,
    value: Number,
    perfected: { type: Boolean, default: false },
    documents: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Document' }],
}, { _id: false });
const loanSchema = new mongoose_1.Schema({
    debtorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Debtor', required: true },
    accountNumber: { type: String, required: true, unique: true },
    originationDate: { type: Date, required: true },
    purpose: String,
    approvalConditions: [{ type: String }],
    principal: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    tenureMonths: { type: Number, required: true },
    collateral: [collateralSchema],
    status: { type: String, default: 'active' },
}, { timestamps: true });
exports.Loan = (0, mongoose_1.model)('Loan', loanSchema);
//# sourceMappingURL=Loan.js.map