// server.js
'use strict';
require('dotenv/config'); // load env vars from .env in non-production environments
const { createApp } = require('./app');
const { connectDB } = require('./config/db');
const PORT = Number(process.env.PORT) || 4000;
let server;
async function start() {
    try {
        // Connect to database (ensure connectDB throws on failure)
        await connectDB();
        console.log('✅ Database connected');
        // Create express app
        const app = createApp();
        // Start server
        server = app.listen(PORT, () => {
            const env = process.env.NODE_ENV || 'development';
            const url = `http://localhost:${PORT}`;
            console.log('\n==============================================');
            console.log(' 🚀 Server is running');
            console.log('----------------------------------------------');
            console.log(` URL: ${url}`);
            console.log(` Env: ${env}`);
            console.log(` PID: ${process.pid}`);
            console.log(` Time: ${new Date().toLocaleString()}`);
            console.log('==============================================\n');
        });
    }
    catch (err) {
        console.error('Failed to start server', err);
        // Non-zero exit code to signal failure to the platform
        process.exit(1);
    }
}
// Graceful shutdown for Render / Heroku / containers
function shutdown(signal) {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    if (server) {
        server.close(() => {
            console.log('Closed remaining connections.');
            // If you have DB close logic, call it here (optional)
            process.exit(0);
        });
        // Force exit if shutdown takes too long
        setTimeout(() => {
            console.error('Could not close connections in time, forcing shutdown');
            process.exit(1);
        }, 10_000).unref();
    }
    else {
        process.exit(0);
    }
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
// Start the app
start();
//# sourceMappingURL=server.js.map