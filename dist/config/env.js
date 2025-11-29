"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 4000),
    MONGO_URI: process.env.MONGO_URI ?? "mongodb+srv://calvazprimeconcepts:calvazprimeconcepts@cluster0.jqjrlyz.mongodb.net/calvazprimeconcepts?appName=Cluster0",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ?? "super-calvaz-prime-concepts",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET ?? "concepts-super-calvaz",
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES ?? "15m",
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES ?? "7d",
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY ?? "",
    EMAIL_FROM: process.env.EMAIL_FROM ?? "no-reply@calvazprimeconcepts.com",
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
    FILE_STORAGE: process.env.FILE_STORAGE ?? "local",
    UPLOAD_DIR: process.env.UPLOAD_DIR ?? "uploads",
    BASE_URL: process.env.BASE_URL ?? "http://localhost:4000",
    ENABLE_2FA: (process.env.ENABLE_2FA ?? "true") === "true"
};
//# sourceMappingURL=env.js.map