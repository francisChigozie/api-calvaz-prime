"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/loan.routes.ts
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middleware/validate");
const user_validation_1 = require("../validations/user.validation");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.auth)(), user_controller_1.getUsers);
router.get('/:id', (0, auth_1.auth)(), user_controller_1.getUserById);
router.post('/', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(user_validation_1.createUserSchema), user_controller_1.createUser);
router.put('/:id', (0, auth_1.auth)(['Officer', 'Supervisor', 'Admin']), (0, validate_1.validateBody)(user_validation_1.updateUserSchema), user_controller_1.updateUser);
router.delete('/:id', (0, auth_1.auth)(['Admin']), user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map