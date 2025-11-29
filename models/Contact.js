"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ContactSubmissionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    message: { type: String, required: true },
    file: { type: String },
    meta: { type: Object }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("ContactSubmission", ContactSubmissionSchema);
//# sourceMappingURL=Contact.js.map