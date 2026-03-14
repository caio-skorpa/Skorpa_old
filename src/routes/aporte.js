import express from "express";
import path from "path";

const router = express.Router();//container de rotas
//“Estou definindo rotas em um módulo separado
//que será acoplado a um servidor Express já existente.”
router.post("/contribution", (req, res) => {
  console.log(req.body);
  res.send("<h2>Aporte incluído</h2>");
});


// router.post("/wallet", (req, res, next) = {


// });

router.post("/login", (req, res, next) => {
  const login = req.body;
  if (login.email === "admin@gmail.com" && login.password === "732714") {
    res.send("Login realizado")
  } else {
    res.send("E-mail ou senha incorretos")
  }
});

// router.get("/.*/", (req, res) => {
//   res.sendFile(path.resolve("public", "gp.html"))
// });

router.use((req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

export default router;