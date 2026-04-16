const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pacientes = require("./modules/pacientes/pacientes.routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1/pacientes", pacientes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => {
  res.status(404).json({ error_code: "ERR_ROUTE_NOT_FOUND" });
});

app.listen(PORT, () => {
  console.log(`Backend Node.js rodando na porta ${PORT}`);
});
