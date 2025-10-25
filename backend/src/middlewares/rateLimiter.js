const rateLimter = require("express-rate-limit");

const apiLimiter = rateLimter({
  windowMs: 1 * 60 * 1000,
  max: 60,
  message: {
    error: "Woahh calm down! Too many requests :(",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter };
