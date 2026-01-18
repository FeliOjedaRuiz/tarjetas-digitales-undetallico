const cors = require("cors");

module.exports = cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
});
