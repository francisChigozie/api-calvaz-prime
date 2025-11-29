"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
// src/models/Payment.ts
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    loanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Loan', required: true },
    paidAt: { type: Date, required: true },
    amount: { type: Number, required: true },
    method: { type: String, required: true },
    reference: String,
    source: {
        type: String,
        enum: ['bank-statement', 'manual', 'api'],
        required: true,
    },
    recordedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.Payment = (0, mongoose_1.model)('Payment', paymentSchema);
//# sourceMappingURL=Payment.js.map