"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDebtor = exports.updateDebtor = exports.getDebtorById = exports.getDebtors = exports.createDebtor = void 0;
const Debtor_1 = require("../models/Debtor");
const createDebtor = async (req, res, next) => {
    try {
        const debtor = await Debtor_1.Debtor.create(req.body);
        res.status(201).json({ data: debtor });
    }
    catch (err) {
        next(err);
    }
};
exports.createDebtor = createDebtor;
const getDebtors = async (_req, res, next) => {
    try {
        const debtors = await Debtor_1.Debtor.find().lean();
        res.json({ data: debtors });
    }
    catch (err) {
        next(err);
    }
};
exports.getDebtors = getDebtors;
const getDebtorById = async (req, res, next) => {
    try {
        const debtor = await Debtor_1.Debtor.findById(req.params.id);
        if (!debtor)
            return res.status(404).json({ message: 'Debtor not found' });
        res.json({ data: debtor });
    }
    catch (err) {
        next(err);
    }
};
exports.getDebtorById = getDebtorById;
const updateDebtor = async (req, res, next) => {
    try {
        const debtor = await Debtor_1.Debtor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!debtor)
            return res.status(404).json({ message: 'Debtor not found' });
        res.json({ data: debtor });
    }
    catch (err) {
        next(err);
    }
};
exports.updateDebtor = updateDebtor;
const deleteDebtor = async (req, res, next) => {
    try {
        const debtor = await Debtor_1.Debtor.findByIdAndDelete(req.params.id);
        if (!debtor)
            return res.status(404).json({ message: 'Debtor not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteDebtor = deleteDebtor;
//# sourceMappingURL=debtor.controller.js.map