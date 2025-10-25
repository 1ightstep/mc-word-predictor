const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

const { apiLimiter } = require("./middlewares/rateLimiter");
const connectDB = require("./config/db");
const healthRoute = require("./routes/health.route");
const predictRoute = require("./routes/predict.route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(apiLimiter);
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("mc-word-predictor says hello!");
});

app.use("/api/health", healthRoute);
app.use("/api/predict", predictRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
