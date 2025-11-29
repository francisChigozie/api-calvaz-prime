"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const validate_1 = require("../middleware/validate");
const payment_validation_1 = require("../validations/payment.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), payment_controller_1.getPayments);
router.get('/:id', (0, auth_1.auth)(), payment_controller_1.getPaymentById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(payment_validation_1.createPaymentSchema), payment_controller_1.createPayment);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(payment_validation_1.updatePaymentSchema), payment_controller_1.updatePayment);
router.delete('/:id', (0, auth_1.auth)(['Admin']), payment_controller_1.deletePayment);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map