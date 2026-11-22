const app = require('./app');
const config = require('./config/environment');
const logger = require('./utils/logger');

const server = app.listen(config.PORT, () => {
  logger.info(`========================================================`);
  logger.info(`  SARAR INDUSTRIES BACKEND SERVER RUNNING`);
  logger.info(`  Port: ${config.PORT}`);
  logger.info(`  Environment: ${config.NODE_ENV}`);
  logger.info(`  Health Check: http://localhost:${config.PORT}/api/health`);
  logger.info(`========================================================`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received. Closing HTTP server...');
  server.close(() => {
    logger.info('HTTP server closed.');
    process.exit(0);
  });
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
