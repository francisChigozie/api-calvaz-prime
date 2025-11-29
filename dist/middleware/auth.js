"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET || '<JWT_SECRET>';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '<JWT_REFRESH_SECRET>';
/**
 * Auth middleware factory.
 * - `auth()` → just requires a valid token.
 * - `auth(['Admin'])` → requires valid token + role in ['Admin'].
 * - `auth(['Officer','Supervisor','Admin'])`
 */
function auth(allowedRoles) {
    return async (req, res, next) => {
        try {
            const header = req.headers['authorization'];
            if (!header || !header.toLowerCase().startsWith('bearer ')) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const token = header.slice(7).trim(); // remove "Bearer "
            let payload;
            // Try to verify the access token
            try {
                payload = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            }
            catch (err) {
                // If access token is expired or invalid, check for refresh token
                const refreshToken = req.headers['x-refresh-token']; // Assuming refresh token is sent in a custom header
                if (!refreshToken) {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
                // Verify the refresh token
                try {
                    const refreshPayload = jsonwebtoken_1.default.verify(refreshToken, JWT_REFRESH_SECRET);
                    const userId = refreshPayload.id;
                    // Load user and issue a new access token
                    const user = await User_1.default.findById(userId).select('role');
                    if (!user) {
                        return res.status(401).json({ message: 'Unauthorized' });
                    }
                    // Generate a new access token
                    const newToken = jsonwebtoken_1.default.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' }); // Adjust expiration as needed
                    // You can also send the new token back in the response if desired
                    res.setHeader('Authorization', `Bearer ${newToken}`);
                    // Set the payload to allow the request to proceed
                    payload = { id: userId };
                }
                catch (refreshError) {
                    return res.status(401).json({ message: 'Invalid refresh token' });
                }
            }
            // Attach user ID first
            req.user = { id: payload.id };
            // If no role restrictions, just continue
            if (!allowedRoles || allowedRoles.length === 0) {
                return next();
            }
            // If role-based access required, load user & check role
            const user = await User_1.default.findById(payload.id).select('role');
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const userRole = String(user.role || '');
            req.user.role = userRole;
            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            return next();
        }
        catch (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    };
}
//# sourceMappingURL=auth.js.map