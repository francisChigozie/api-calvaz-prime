"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/debtor.routes.ts
const express_1 = require("express");
const debtor_controller_1 = require("../controllers/debtor.controller");
const validate_1 = require("../middleware/validate");
const debtor_validation_1 = require("../validations/debtor.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// No role requirement — just authenticated
router.get('/', (0, auth_1.auth)(), debtor_controller_1.getDebtors);
router.get('/:id', (0, auth_1.auth)(), debtor_controller_1.getDebtorById);
// Only Officer, Supervisor, Admin
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(debtor_validation_1.createDebtorSchema), debtor_controller_1.createDebtor);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(debtor_validation_1.updateDebtorSchema), debtor_controller_1.updateDebtor);
// Only Admin
router.delete('/:id', (0, auth_1.auth)(['Admin']), debtor_controller_1.deleteDebtor);
exports.default = router;
//# sourceMappingURL=debtor.routes.js.map