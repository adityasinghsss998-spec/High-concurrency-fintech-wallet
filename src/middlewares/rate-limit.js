import rateLimit from 'express-rate-limit';

export const transferLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: {
    success: false,
    message: "Too many transfer requests from this IP. Please try again in 15 minutes.",
    data: {},
    err: {}
  },
  standardHeaders: true,
  legacyHeaders: false,
});