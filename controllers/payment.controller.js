"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const Payment_1 = require("../models/Payment");
const createPayment = async (req, res, next) => {
    try {
        const payment = await Payment_1.Payment.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: payment });
    }
    catch (err) {
        next(err);
    }
};
exports.createPayment = createPayment;
const getPayments = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const payments = await Payment_1.Payment.find(filter).populate('debtorId').lean();
        res.json({ data: payments });
    }
    catch (err) {
        next(err);
    }
};
exports.getPayments = getPayments;
const getPaymentById = async (req, res, next) => {
    try {
        const payment = await Payment_1.Payment.findById(req.params.id).populate('debtorId');
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });
        res.json({ data: payment });
    }
    catch (err) {
        next(err);
    }
};
exports.getPaymentById = getPaymentById;
const updatePayment = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const payment = await Payment_1.Payment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });
        res.json({ data: payment });
    }
    catch (err) {
        next(err);
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (req, res, next) => {
    try {
        const payment = await Payment_1.Payment.findByIdAndDelete(req.params.id);
        if (!payment)
            return res.status(404).json({ message: 'Payment not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deletePayment = deletePayment;
//# sourceMappingURL=payment.controller.js.map