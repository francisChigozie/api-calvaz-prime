"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDocument = exports.updateDocument = exports.getDocumentById = exports.getDocuments = exports.createDocument = void 0;
// @ts-ignore
const Document_1 = require("../models/Document");
const createDocument = async (req, res, next) => {
    try {
        const document = await Document_1.Document.create({
            ...req.body,
            originationDate: new Date(req.body.originationDate),
        });
        res.status(201).json({ data: document });
    }
    catch (err) {
        next(err);
    }
};
exports.createDocument = createDocument;
const getDocuments = async (req, res, next) => {
    try {
        const filter = {};
        if (req.query.debtorId)
            filter.debtorId = req.query.debtorId;
        if (req.query.status)
            filter.status = req.query.status;
        const documents = await Document_1.Document.find(filter).populate('debtorId').lean();
        res.json({ data: documents });
    }
    catch (err) {
        next(err);
    }
};
exports.getDocuments = getDocuments;
const getDocumentById = async (req, res, next) => {
    try {
        const document = await Document_1.Document.findById(req.params.id).populate('debtorId');
        if (!document)
            return res.status(404).json({ message: 'Document not found' });
        res.json({ data: document });
    }
    catch (err) {
        next(err);
    }
};
exports.getDocumentById = getDocumentById;
const updateDocument = async (req, res, next) => {
    try {
        if (req.body.originationDate) {
            req.body.originationDate = new Date(req.body.originationDate);
        }
        const document = await Document_1.Document.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!document)
            return res.status(404).json({ message: 'Document not found' });
        res.json({ data: document });
    }
    catch (err) {
        next(err);
    }
};
exports.updateDocument = updateDocument;
const deleteDocument = async (req, res, next) => {
    try {
        const document = await Document_1.Document.findByIdAndDelete(req.params.id);
        if (!document)
            return res.status(404).json({ message: 'Document not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteDocument = deleteDocument;
//# sourceMappingURL=document.controller.js.map