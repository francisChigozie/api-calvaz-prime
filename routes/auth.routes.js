"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
router.post('/register', auth_controller_1.createUser);
router.post('/login', auth_controller_1.login);
router.post('/refresh-token', auth_controller_1.refreshToken); // New route for refresh token
router.get('/me', auth_controller_1.getMe);
// Protect logout if you want only authenticated users to call it
router.post('/logout', auth_controller_1.logout);
exports.default = router;
/*
router.get('/protected', auth(['Admin']), (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});*/
//# sourceMappingURL=auth.routes.js.map