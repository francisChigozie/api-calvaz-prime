"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debtor = void 0;
// src/models/Debtor.ts
const mongoose_1 = require("mongoose");
const debtorSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    aliases: [{ type: String }],
    nationalIdType: { type: String, required: true },
    nationalIdNumber: { type: String, required: true, unique: true },
    dateOfBirth: Date,
    addresses: [{ type: String }],
    phones: [{ type: String }],
    emails: [{ type: String }],
    employer: String,
    nextOfKin: String,
    riskRating: String,
}, { timestamps: true });
exports.Debtor = (0, mongoose_1.model)('Debtor', debtorSchema);
//# sourceMappingURL=Debtor.js.map