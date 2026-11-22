const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/environment');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();

// Security HTTP headers
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// CORS configuration
const allowedOrigins = [
  config.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app')) {
      return callback(null, true);
    }
    return callback(null, true); // Allow all in dev/staging while maintaining credentials
  },
  credentials: true,
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
