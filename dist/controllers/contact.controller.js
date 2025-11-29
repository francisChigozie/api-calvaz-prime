"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSubmit = contactSubmit;
exports.listContacts = listContacts;
exports.deleteContact = deleteContact;
const Contact_1 = __importDefault(require("../models/Contact"));
async function contactSubmit(req, res) {
    const file = req.file?.filename;
    const submission = await Contact_1.default.create({
        ...req.body,
        file,
        meta: {
            ip: req.ip,
            ua: req.get("user-agent"),
            referer: req.get("referer")
        }
    });
    /* await sendEmail({
         to: "emekaezekwem5@gmail.com",
         subject: "New Contact Submission - CALVAZ PRIME CONCEPTS",
         html: `
       <h3>New Contact Submission</h3>
       <p><b>Name:</b> ${submission.name}</p>
       <p><b>Email:</b> ${submission.email}</p>
       <p><b>Message:</b></p>
       <p>${submission.message}</p>
       ${file ? `<p><b>File:</b> ${file}</p>` : ""}
       <p><small>IP: ${submission.meta?.ip} | UA: ${submission.meta?.ua}</small></p>
     `
     });*/
    res.status(201).json({ message: "Received", id: submission.id });
}
async function listContacts(_req, res) {
    const docs = await Contact_1.default.find().sort({ createdAt: -1 }).limit(200);
    res.json(docs);
}
async function deleteContact(req, res) {
    // @ts-ignore
    await Contact_1.default.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "Contact Removed Successfully" });
}
//# sourceMappingURL=contact.controller.js.map