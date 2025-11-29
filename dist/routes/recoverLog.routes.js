"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const recoverLog_controller_1 = require("../controllers/recoverLog.controller");
const validate_1 = require("../middleware/validate");
const recoverLog_validation_1 = require("../validations/recoverLog.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), recoverLog_controller_1.getRecoverLogs);
router.get('/:id', (0, auth_1.auth)(), recoverLog_controller_1.getRecoverLogById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(recoverLog_validation_1.createRecoverLogSchema), recoverLog_controller_1.createRecoverLog);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(recoverLog_validation_1.updateRecoverLogSchema), recoverLog_controller_1.updateRecoverLog);
router.delete('/:id', (0, auth_1.auth)(['Admin']), recoverLog_controller_1.deleteRecoverLog);
exports.default = router;
//# sourceMappingURL=recoverLog.routes.js.map