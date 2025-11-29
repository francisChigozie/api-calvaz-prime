"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoan = exports.updateLoan = exports.getLoanById = exports.getLoans = exports.createLoan = void 0;
const Loan_1 = require("../models/Loan");
const createLoan = async (req, res, next) => {
    try {
        const loan = await Loan_1.Loan.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: loan });
    }
    catch (err) {
        next(err);
    }
};
exports.createLoan = createLoan;
const getLoans = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const loans = await Loan_1.Loan.find(filter).populate('debtorId').lean();
        res.json({ data: loans });
    }
    catch (err) {
        next(err);
    }
};
exports.getLoans = getLoans;
const getLoanById = async (req, res, next) => {
    try {
        const loan = await Loan_1.Loan.findById(req.params.id).populate('debtorId');
        if (!loan)
            return res.status(404).json({ message: 'Loan not found' });
        res.json({ data: loan });
    }
    catch (err) {
        next(err);
    }
};
exports.getLoanById = getLoanById;
const updateLoan = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const loan = await Loan_1.Loan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!loan)
            return res.status(404).json({ message: 'Loan not found' });
        res.json({ data: loan });
    }
    catch (err) {
        next(err);
    }
};
exports.updateLoan = updateLoan;
const deleteLoan = async (req, res, next) => {
    try {
        const loan = await Loan_1.Loan.findByIdAndDelete(req.params.id);
        if (!loan)
            return res.status(404).json({ message: 'Loan not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteLoan = deleteLoan;
//# sourceMappingURL=loan.controller.js.map