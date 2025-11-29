"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/debtor.routes.ts
const express_1 = require("express");
const concession_controller_1 = require("../controllers/concession.controller");
const validate_1 = require("../middleware/validate");
const concession_validation_1 = require("../validations/concession.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), concession_controller_1.getConcessions);
router.get('/:id', (0, auth_1.auth)(), concession_controller_1.getConcessionById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(concession_validation_1.createConcessionSchema), concession_controller_1.createConcession);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(concession_validation_1.updateCessionSchema), concession_controller_1.updateConcession);
router.delete('/:id', (0, auth_1.auth)(['Admin']), concession_controller_1.deleteConcession);
exports.default = router;
//# sourceMappingURL=concession.routes.js.map