"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/User.ts
const mongoose_1 = require("mongoose");
// Allowed values
const roleEnum = ['Agent', 'Officer', 'Supervisor', 'Admin'];
const allowedOrgs = ['CALVAZ PRIME CONCEPTS', 'client'];
// External-to-internal mappings
const roleMap = {
    user: 'Agent', // accept "user" and map to "Agent"
};
// Normalizers used by schema setters
function normalizeRoleValue(input) {
    if (!input)
        return input;
    const mapped = roleMap[input.trim().toLowerCase()] ?? input;
    const title = mapped.charAt(0).toUpperCase() + mapped.slice(1).toLowerCase();
    return title;
}
function normalizeOrgValue(input) {
    if (!input)
        return input;
    const v = input.trim();
    if (v.toLowerCase() === 'client')
        return 'client';
    if (v.toUpperCase() === 'CALVAZ PRIME CONCEPTS')
        return 'CALVAZ PRIME CONCEPTS';
    return v;
}
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    role: {
        type: String,
        enum: roleEnum,
        required: true,
        set: normalizeRoleValue, // maps "user" -> "Agent", title-cases inputs
    },
    status: { type: String, default: 'active', trim: true },
    org: {
        type: String,
        enum: allowedOrgs,
        required: true,
        set: normalizeOrgValue, // coerces "Client"/"client" to "client"
    },
    oauthProvider: { type: String, trim: true },
    twoFAEnabled: { type: Boolean, default: false },
    lastLoginAt: Date,
    password: String,
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map