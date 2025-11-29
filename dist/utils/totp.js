"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTOTPSecret = generateTOTPSecret;
exports.verifyTOTP = verifyTOTP;
exports.generateQRCode = generateQRCode;
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
function generateTOTPSecret(label) {
    const secret = speakeasy_1.default.generateSecret({ length: 20, name: label });
    return secret;
}
function verifyTOTP(token, secret) {
    return speakeasy_1.default.totp.verify({ secret, encoding: "ascii", token, window: 1 });
}
async function generateQRCode(otpauthUrl) {
    return qrcode_1.default.toDataURL(otpauthUrl);
}
//# sourceMappingURL=totp.js.map