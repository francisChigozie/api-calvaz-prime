// app.js
'use strict';
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const routesModule = require('./routes/index');
const routes = routesModule.default || routesModule; // handle both cases
const { notFound, errorHandler } = require('./middleware/errorHandler');
/**
 * Simple string sanitizer (in-place). Consider replacing with a robust lib like "xss" or "sanitize-html".
 * It escapes these characters: < > & " ' `
 */
const sanitizeString = (val) => {
    if (typeof val !== 'string')
        return val;
    const map = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;',
    };
    return val.replace(/[<>&"'`]/g, (c) => map[c] || c);
};
function deepSanitizeInPlace(obj) {
    if (!obj || typeof obj !== 'object')
        return;
    for (const [k, v] of Object.entries(obj)) {
        if (typeof v === 'string') {
            obj[k] = sanitizeString(v);
        }
        else if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
                if (typeof v[i] === 'string')
                    v[i] = sanitizeString(v[i]);
                else if (v[i] && typeof v[i] === 'object')
                    deepSanitizeInPlace(v[i]);
            }
        }
        else if (v && typeof v === 'object') {
            deepSanitizeInPlace(v);
        }
    }
}
/**
 * Middleware: sanitize query, body, params in-place
 */
function sanitizerMiddleware(req, _res, next) {
    if (req.query)
        deepSanitizeInPlace(req.query);
    if (req.body)
        deepSanitizeInPlace(req.body);
    if (req.params)
        deepSanitizeInPlace(req.params);
    next();
}
/**
 * Prevent parameter pollution for query params.
 * Keeps last value for duplicate params unless in whitelist.
 */
function preventParamPollution(whitelist = []) {
    const allowed = new Set(whitelist);
    return (req, _res, next) => {
        const q = req.query;
        if (q && typeof q === 'object') {
            for (const key of Object.keys(q)) {
                const val = q[key];
                if (Array.isArray(val) && !allowed.has(key)) {
                    q[key] = val[val.length - 1];
                }
            }
        }
        next();
    };
}
/**
 * Create and configure the Express app
 */
function createApp() {
    const app = express();
    // If behind a proxy (Render, Heroku, etc.), trust it so req.ip is correct
    app.set('trust proxy', 1);
    // Security headers
    app.use(helmet({
        contentSecurityPolicy: process.env.NODE_ENV === 'development' ? false : undefined,
        crossOriginResourcePolicy: { policy: 'cross-origin' }, // adjust for your asset needs
    }));
    // CORS – adjust origins to your domains
    app.use(cors({
        origin: 'https://calvaz-prime.onrender.com',
        credentials: true,
        optionsSuccessStatus: 204,
    }));
    // Request logger in development
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    // Serve static assets (Vite/React build assumed at npl-app/dist)
    /*  const staticDir = path.join(__dirname, 'npl-app', 'dist');
     app.use(
         express.static(staticDir, {
             index: false,
             maxAge: '1y',
             setHeaders: (res, filePath) => {
                 if (filePath.endsWith('.html')) {
                     // HTML should not be aggressively cached
                     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                 }
             },
         })
     ); */
    // Body and cookie parsing
    app.use(bodyParser.json({ limit: '50mb' }));
    // urlencoded limit specified in bytes; keep a reasonable limit
    app.use(express.urlencoded({ extended: true, limit: '10kb' }));
    app.use(cookieParser());
    // Basic rate limiting for API routes
    const limiter = rateLimit({
        windowMs: 60 * 60 * 1000, // 1 hour
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
        message: 'Too many requests from this IP, please try again in an hour!',
        skip: (req) => req.path === '/health',
    });
    app.use('/api', limiter);
    // Sanitize and prevent param pollution
    app.use(sanitizerMiddleware);
    app.use(preventParamPollution(['debtor', 'delinquency', 'loan', 'concession']));
    // Health-check
    app.get('/health', (_req, res) => res.json({ status: 'ok' }));
    // API routes
    app.use('/api', routes);
    // Return 404 for unknown API routes
    app.use('/api', (_req, res) => {
        res.status(404).json({ message: 'Not Found' });
    });
    // Handle bad JSON early (bodyParser errors)
    app.use((err, _req, res, next) => {
        if (err && err.type === 'entity.parse.failed') {
            return res.status(400).json({ message: 'Invalid JSON body' });
        }
        next(err);
    });
    // 404 handler for everything else (e.g., non-API routes)
    app.use(notFound);
    // Final error handler
    app.use(errorHandler);
    return app;
}
module.exports = { createApp };
//# sourceMappingURL=app.js.map