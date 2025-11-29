"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecoverLog = exports.updateRecoverLog = exports.getRecoverLogById = exports.getRecoverLogs = exports.createRecoverLog = void 0;
// @ts-ignore
const RecoverLog_1 = require("../models/RecoverLog");
const createRecoverLog = async (req, res, next) => {
    try {
        const recoverLog = await RecoverLog_1.RecoverLog.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: recoverLog });
    }
    catch (err) {
        next(err);
    }
};
exports.createRecoverLog = createRecoverLog;
const getRecoverLogs = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const recoverLogs = await RecoverLog_1.RecoverLog.find(filter).populate('debtorId').lean();
        res.json({ data: recoverLogs });
    }
    catch (err) {
        next(err);
    }
};
exports.getRecoverLogs = getRecoverLogs;
const getRecoverLogById = async (req, res, next) => {
    try {
        const recoverLog = await RecoverLog_1.RecoverLog.findById(req.params.id).populate('debtorId');
        if (!recoverLog)
            return res.status(404).json({ message: 'RecoverLog not found' });
        res.json({ data: recoverLog });
    }
    catch (err) {
        next(err);
    }
};
exports.getRecoverLogById = getRecoverLogById;
const updateRecoverLog = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const recoverLog = await RecoverLog_1.RecoverLog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!recoverLog)
            return res.status(404).json({ message: 'RecoverLog not found' });
        res.json({ data: recoverLog });
    }
    catch (err) {
        next(err);
    }
};
exports.updateRecoverLog = updateRecoverLog;
const deleteRecoverLog = async (req, res, next) => {
    try {
        const recoverLog = await RecoverLog_1.RecoverLog.findByIdAndDelete(req.params.id);
        if (!recoverLog)
            return res.status(404).json({ message: 'RecoverLog not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteRecoverLog = deleteRecoverLog;
//# sourceMappingURL=recoverLog.controller.js.map