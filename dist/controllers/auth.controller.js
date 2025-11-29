"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMe = exports.refreshToken = exports.login = exports.createUser = void 0;
// @ts-ignore
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || '<JWT_SECRET>';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '<JWT_REFRESH_SECRET>';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
function signToken(id) {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
function signRefreshToken(id) {
    return jsonwebtoken_1.default.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });
}
function sanitizeUser(u) {
    if (!u)
        return u;
    const obj = typeof u.toObject === 'function' ? u.toObject() : { ...u };
    delete obj.password;
    return obj;
}
// Registration
const createUser = async (req, res, next) => {
    try {
        const { email, password, ...rest } = req.body || {};
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const normalizedEmail = String(email).toLowerCase();
        const existing = await User_1.default.findOne({ email: normalizedEmail });
        if (existing) {
            return res.status(409).json({ message: 'Email already in use' });
        }
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ ...rest, email: normalizedEmail, password: hash, role: 'Agent' }); // or whatever role
        const token = signToken(String(user._id));
        const refreshToken = signRefreshToken(String(user._id));
        res.status(201).json({ data: sanitizeUser(user), token, refreshToken });
    }
    catch (err) {
        next(err);
    }
};
exports.createUser = createUser;
// Login
const login = async (req, res, next) => {
    const start = Date.now();
    console.log('[LOGIN] request started');
    try {
        const { email, password } = req.body || {};
        console.log('[LOGIN] body:', { email });
        // Validate email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const normalizedEmail = String(email).toLowerCase();
        const user = await User_1.default.findOne({ email: normalizedEmail }).select('+password');
        console.log('[LOGIN] user found?', !!user);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(String(password), String(user.password));
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = signToken(String(user._id));
        const refreshToken = signRefreshToken(String(user._id));
        console.log('[LOGIN] success in', Date.now() - start, 'ms');
        /*res.status(200).json({
          data: sanitizeUser(user),
          token, refreshToken,
        });*/
        res.status(200).json({
            data: {
                email: user.email,
                role: user.role // Ensure this field is included
            },
            token,
            refreshToken
        });
    }
    catch (err) {
        console.error('[LOGIN] error after', Date.now() - start, 'ms', err);
        next(err);
    }
};
exports.login = login;
// Refresh Token
const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token is required' });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
        const userId = decoded.id;
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newToken = signToken(String(user._id));
        const newRefreshToken = signRefreshToken(String(user._id));
        res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
    }
    catch (err) {
        console.error('[REFRESH TOKEN] error:', err);
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
};
exports.refreshToken = refreshToken;
// Me
const getMe = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        const token = authHeader.split(' ')[0];
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        }
        catch (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        const userId = decoded.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
        }
        const user = await User_1.default.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ data: sanitizeUser(user) });
    }
    catch (err) {
        next(err);
    }
};
exports.getMe = getMe;
// Logout (stateless)
const logout = async (req, res, next) => {
    try {
        // If you are not storing refresh tokens server-side, there is nothing to "invalidate" here.
        // Just respond success so the client can clear its local tokens.
        return res.status(200).json({ message: 'Logged out successfully' });
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map