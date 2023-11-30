const { Router, static: expressStatic } = require("express");
const http = require("http");
const { storage, uploadFolder } = require("../config/upload");
const multer = require("multer");

const Aulas = require("../controller/aulas/index");
const AulaUsuarios = require("../controller/aula_usuarios/index");
const Cursos = require("../controller/cursos/index");
const CursoUsuarios = require("../controller/curso_usuarios/index");
const Materias = require("../controller/materias/index");
const Usuarios = require("../controller/usuarios/index");

const routes = new Router();
const upload = multer({ storage });

routes.get("/", (req, res) => {
  // return res.sendFile("/sandbox/public/index.html");
  return res.status(200).send("Servidor Funcionando").end();
});

routes.get("/refresh", (req, res) => {
  return res.sendFile("/sandbox/public/index.html");
  // return res.status(200).send("Servidor Funcionando").end();
});

routes.put("/api/*", (req, res) => {
  return res.status(400).end();
});

routes.get("/api/db", (req, res) => {
  return res.status(404).end(http.STATUS_CODES[404]);
});

routes.use("/files", expressStatic(uploadFolder));

routes.post("/api/auth", Usuarios.auth);
routes.post("/api/signup", Usuarios.signup);
routes.get("/activate/:chave", Usuarios.activate);

routes.get("/teste", (req, res, next) => {
  res.status(200).send("Teste de mensagem").end();
});

// routes.use("/api/*", Usuarios.signup);
//routes.use("/api/*", Usuarios.ensureAuthenticated);

// routes.use(Usuarios.ensureAuthenticated);

routes.post("/api/aulas", Aulas.store);
routes.patch("/api/aulas/:id", Aulas.update);

routes.post("/api/aula_usuarios", AulaUsuarios.store);
routes.patch("/api/aula_usuarios/:id", AulaUsuarios.update);

routes.post("/api/cursos", Cursos.store);
routes.patch("/api/cursos/:id", Cursos.update);

routes.post("/api/curso_usuarios", CursoUsuarios.store);
routes.patch("/api/curso_usuarios/:id", CursoUsuarios.update);

routes.post("/api/materias", Materias.store);
routes.patch("/api/materias/:id", Materias.update);

routes.post("/api/usuario", Usuarios.store);
routes.patch("/api/usuario/:id", Usuarios.update);
routes.patch("/api/avatar/:id", upload.single("avatar"), Usuarios.uploadPhoto);

module.exports = { routes };
