"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryLog = void 0;
// src/models/RecoveryLog.ts
const mongoose_1 = require("mongoose");
const geoSchema = new mongoose_1.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    accuracy: Number,
}, { _id: false });
const promiseSchema = new mongoose_1.Schema({
    amount: Number,
    date: Date,
    status: String,
}, { _id: false });
const recoveryLogSchema = new mongoose_1.Schema({
    loanId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Loan', required: true },
    agentId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    channel: {
        type: String,
        enum: ['call', 'visit', 'email', 'sms', 'letter', 'legal'],
        required: true,
    },
    timestamp: { type: Date, required: true, default: Date.now },
    geo: geoSchema,
    notes: String,
    promiseToPay: promiseSchema,
    outcome: {
        type: String,
        enum: ['no-answer', 'contacted', 'promise', 'broken', 'paid', 'escalated'],
        required: true,
    },
    attachments: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Document' }],
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.RecoveryLog = (0, mongoose_1.model)('RecoveryLog', recoveryLogSchema);
//# sourceMappingURL=RecoverLog.js.map