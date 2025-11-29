"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const loan_controller_1 = require("../controllers/loan.controller");
const validate_1 = require("../middleware/validate");
const loan_validation_1 = require("../validations/loan.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), loan_controller_1.getLoans);
router.get('/:id', (0, auth_1.auth)(), loan_controller_1.getLoanById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(loan_validation_1.createLoanSchema), loan_controller_1.createLoan);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(loan_validation_1.updateLoanSchema), loan_controller_1.updateLoan);
router.delete('/:id', (0, auth_1.auth)(['Admin']), loan_controller_1.deleteLoan);
exports.default = router;
//# sourceMappingURL=loan.routes.js.map