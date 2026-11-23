const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/environment');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Respect the public proxy's client IP in production for per-customer rate limits.
const trustProxy = /^\d+$/.test(String(config.TRUST_PROXY)) ? Number(config.TRUST_PROXY) : config.TRUST_PROXY;
app.set('trust proxy', trustProxy);

// Keep local development convenient while applying a production CSP and HSTS.
app.use(helmet({
  contentSecurityPolicy: config.NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      connectSrc: ["'self'"],
      upgradeInsecureRequests: []
    }
  } : false,
  hsts: config.NODE_ENV === 'production' ? { maxAge: 31536000, includeSubDomains: true } : false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS configuration
const allowedOrigins = new Set([
  config.FRONTEND_URL,
  ...config.CORS_ORIGINS,
  ...(config.NODE_ENV === 'production' ? [] : [
    'http://localhost:3000', 'http://localhost:5000',
    'http://127.0.0.1:3000', 'http://127.0.0.1:5000',
    `http://localhost:${config.PORT}`, `http://127.0.0.1:${config.PORT}`
  ])
].filter(Boolean).map((value) => {
  try { return new URL(value).origin; } catch { return value; }
}));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS.'));
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Request logging
if (config.NODE_ENV !== 'test') {
  app.use(morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// Request parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply general rate limiter on API
app.use('/api', apiLimiter);

// Mount main API router
app.use('/api', routes);

// Serve frontend static build if available
const path = require('path');
const fs = require('fs');
const frontendDist = path.resolve(__dirname, '../../frontend/dist');

if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    return res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// 404 and global error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
