"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConcession = exports.updateConcession = exports.getConcessionById = exports.getConcessions = exports.createConcession = void 0;
const Concession_1 = require("../models/Concession");
const createConcession = async (req, res, next) => {
    try {
        const concession = await Concession_1.Concession.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: concession });
    }
    catch (err) {
        next(err);
    }
};
exports.createConcession = createConcession;
const getConcessions = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const concessions = await Concession_1.Concession.find(filter).populate('debtorId').lean();
        res.json({ data: concessions });
    }
    catch (err) {
        next(err);
    }
};
exports.getConcessions = getConcessions;
const getConcessionById = async (req, res, next) => {
    try {
        const concession = await Concession_1.Concession.findById(req.params.id).populate('debtorId');
        if (!concession)
            return res.status(404).json({ message: 'Concession not found' });
        res.json({ data: concession });
    }
    catch (err) {
        next(err);
    }
};
exports.getConcessionById = getConcessionById;
const updateConcession = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const concession = await Concession_1.Concession.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!concession)
            return res.status(404).json({ message: 'Concession not found' });
        res.json({ data: concession });
    }
    catch (err) {
        next(err);
    }
};
exports.updateConcession = updateConcession;
const deleteConcession = async (req, res, next) => {
    try {
        const concession = await Concession_1.Concession.findByIdAndDelete(req.params.id);
        if (!concession)
            return res.status(404).json({ message: 'Concession not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteConcession = deleteConcession;
//# sourceMappingURL=concession.controller.js.map