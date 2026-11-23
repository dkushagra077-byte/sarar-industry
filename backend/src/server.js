const app = require('./app');
const config = require('./config/environment');
const logger = require('./utils/logger');
const { verifyDatabaseConnection } = require('./config/database');

let server;

const startServer = async () => {
  if (config.NODE_ENV === 'production') {
    if (!config.FRONTEND_URL) throw new Error('Set FRONTEND_URL to the public website origin before starting in production.');
    await verifyDatabaseConnection();
  }

  server = app.listen(config.PORT, '0.0.0.0', () => {
    logger.info('========================================================');
    logger.info('  SARAR INDUSTRIES BACKEND SERVER RUNNING');
    logger.info(`  Port: ${config.PORT}`);
    logger.info(`  Environment: ${config.NODE_ENV}`);
    logger.info(`  Health Check: http://localhost:${config.PORT}/api/health`);
    logger.info('========================================================');
  });
};

startServer().catch((error) => {
  logger.error('Backend startup checks failed:', error.message);
  process.exitCode = 1;
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received. Closing HTTP server...');
  if (!server) return process.exit(0);
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  if (!server) return process.exit(0);
  server.close(() => process.exit(0));
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
