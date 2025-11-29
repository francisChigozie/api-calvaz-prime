"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDelinquency = exports.updateDelinquency = exports.getDelinquencyById = exports.getDelinquencies = exports.createDelinquency = void 0;
const Delinquency_1 = require("../models/Delinquency");
const createDelinquency = async (req, res, next) => {
    try {
        const delinquency = await Delinquency_1.Delinquency.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: delinquency });
    }
    catch (err) {
        next(err);
    }
};
exports.createDelinquency = createDelinquency;
const getDelinquencies = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const delinquencies = await Delinquency_1.Delinquency.find(filter).populate('debtorId').lean();
        res.json({ data: delinquencies });
    }
    catch (err) {
        next(err);
    }
};
exports.getDelinquencies = getDelinquencies;
const getDelinquencyById = async (req, res, next) => {
    try {
        const delinquency = await Delinquency_1.Delinquency.findById(req.params.id).populate('debtorId');
        if (!delinquency)
            return res.status(404).json({ message: 'Delinquency not found' });
        res.json({ data: delinquency });
    }
    catch (err) {
        next(err);
    }
};
exports.getDelinquencyById = getDelinquencyById;
const updateDelinquency = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const delinquency = await Delinquency_1.Delinquency.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!delinquency)
            return res.status(404).json({ message: 'Delinquency not found' });
        res.json({ data: delinquency });
    }
    catch (err) {
        next(err);
    }
};
exports.updateDelinquency = updateDelinquency;
const deleteDelinquency = async (req, res, next) => {
    try {
        const delinquency = await Delinquency_1.Delinquency.findByIdAndDelete(req.params.id);
        if (!delinquency)
            return res.status(404).json({ message: 'Delinquency not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteDelinquency = deleteDelinquency;
//# sourceMappingURL=delinquency.controller.js.map