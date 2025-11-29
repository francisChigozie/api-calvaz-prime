"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const createUser = async (req, res, next) => {
    try {
        const user = await User_1.default.create(req.body);
        res.status(201).json({ data: user });
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
const getUsers = async (_req, res, next) => {
    try {
        const users = await User_1.default.find().lean();
        res.json({ data: users });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ data: user });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.json({ data: user });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map