"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogger = void 0;
const AuditLog_1 = require("../models/AuditLog");
const mongoose_1 = require("mongoose");
const auditLogger = (targetCollection, action) => async (req, res, next) => {
    const oldJson = JSON.stringify(res.locals.before || {});
    const send = res.json.bind(res);
    // @ts-ignore
    res.json = async (body) => {
        try {
            const newJson = JSON.stringify(body?.data || {});
            await AuditLog_1.AuditLog.create({
                // @ts-ignore
                actorId: req.user ? new mongoose_1.Types.ObjectId(req.user.id) : undefined,
                // @ts-ignore
                role: req.user?.role || 'anonymous',
                action,
                targetCollection,
                targetId: res.locals.targetId || undefined,
                beforeHash: Buffer.from(oldJson).toString('base64'),
                afterHash: Buffer.from(newJson).toString('base64'),
                ip: req.ip,
                userAgent: req.headers['user-agent'],
            });
        }
        catch (e) {
            console.error('AuditLog error', e);
        }
        return send(body);
    };
    next();
};
exports.auditLogger = auditLogger;
//# sourceMappingURL=auditLogger.js.map