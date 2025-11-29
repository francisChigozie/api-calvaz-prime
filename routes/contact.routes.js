"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const router = (0, express_1.Router)();
// @ts-ignore
router.post("/", contact_controller_1.contactSubmit);
router.get("/", contact_controller_1.listContacts);
router.delete("/:id", contact_controller_1.deleteContact);
exports.default = router;
//# sourceMappingURL=contact.routes.js.map