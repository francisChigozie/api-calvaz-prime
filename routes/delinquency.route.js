"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const delinquency_controller_1 = require("../controllers/delinquency.controller");
const validate_1 = require("../middleware/validate");
const delinquency_validation_1 = require("../validations/delinquency.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), delinquency_controller_1.getDelinquencies);
router.get('/:id', (0, auth_1.auth)(), delinquency_controller_1.getDelinquencyById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(delinquency_validation_1.createDelinquencySchema), delinquency_controller_1.createDelinquency);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(delinquency_validation_1.updateDelinquencySchema), delinquency_controller_1.updateDelinquency);
router.delete('/:id', (0, auth_1.auth)(['Admin']), delinquency_controller_1.deleteDelinquency);
exports.default = router;
//# sourceMappingURL=delinquency.route.js.map