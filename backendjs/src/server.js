const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const pacientes = require("./modules/pacientes/pacientes.routes");

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error_code: "ERR_TOO_MANY_REQUESTS",
    message: "Muitas requisições, tente novamente mais tarde.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

app.use("/api/v1/pacientes", pacientes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => {
  res.status(404).json({ error_code: "ERR_ROUTE_NOT_FOUND" });
});

app.listen(PORT, () => {
  console.log(`Backend Node.js rodando na porta ${PORT}`);
});
