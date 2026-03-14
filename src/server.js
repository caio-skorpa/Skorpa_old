import express from "express";
import aporteRoutes from "./routes/aporte.js";
import path from "path";

const port = 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve("public")));

app.use(aporteRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
