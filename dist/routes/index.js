"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/index.ts
const express_1 = require("express");
const debtor_routes_1 = __importDefault(require("./debtor.routes"));
const loan_routes_1 = __importDefault(require("./loan.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const delinquency_route_1 = __importDefault(require("./delinquency.route"));
const document_routes_1 = __importDefault(require("./document.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
const recoverLog_routes_1 = __importDefault(require("./recoverLog.routes"));
const concession_routes_1 = __importDefault(require("./concession.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const blog_route_1 = __importDefault(require("./blog.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_routes_1.default);
router.use('/debtors', debtor_routes_1.default);
router.use('/loans', loan_routes_1.default);
router.use('/delinquencies', delinquency_route_1.default);
router.use('/recovery-logs', recoverLog_routes_1.default);
router.use('/payments', payment_routes_1.default);
router.use('/concessions', concession_routes_1.default);
router.use('/users', user_routes_1.default);
router.use('/documents', document_routes_1.default);
router.use('/contacts', contact_routes_1.default);
router.use('/blogs', blog_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map