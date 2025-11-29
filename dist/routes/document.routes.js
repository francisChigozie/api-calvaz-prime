"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const document_controller_1 = require("../controllers/document.controller");
const validate_1 = require("../middleware/validate");
const document_validation_1 = require("../validations/document.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), document_controller_1.getDocuments);
router.get('/:id', (0, auth_1.auth)(), document_controller_1.getDocumentById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(document_validation_1.createDocumentSchema), document_controller_1.createDocument);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(document_validation_1.updateDocumentSchema), document_controller_1.updateDocument);
router.delete('/:id', (0, auth_1.auth)(['Admin']), document_controller_1.deleteDocument);
exports.default = router;
//# sourceMappingURL=document.routes.js.map