"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
// @ts-ignore
const mail_1 = __importDefault(require("@sendgrid/mail"));
const env_js_1 = require("../config/env.js");
if (env_js_1.env.SENDGRID_API_KEY) {
    mail_1.default.setApiKey(env_js_1.env.SENDGRID_API_KEY);
}
async function sendEmail(opts) {
    if (!env_js_1.env.SENDGRID_API_KEY)
        return;
    await mail_1.default.send({
        to: opts.to,
        from: env_js_1.env.EMAIL_FROM,
        subject: opts.subject,
        html: opts.html
    });
}
//# sourceMappingURL=email.js.map