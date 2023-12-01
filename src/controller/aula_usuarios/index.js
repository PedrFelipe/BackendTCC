const { object, string, mixed } = require("yup");
const { apiEndpoints } = require("../../api/index");

class AulaUsuarios {


  async store(req, res, next) {
    
    req.body = { ...req.body, created_at: new Date(), updated_at: "" };

    const presenca = apiEndpoints.db
    .get("aula_usuarios")
    .find({ aula_id: req.body.aula_id, usuario_id: req.body.usuario_id })
    .cloneDeep()
    .value();
    
    if (presenca) {
      console.log(presenca)
      return res.status(201).json(presenca)
    }
    // console.log(req.body);
    next();
  }

  async update(req, res, next) {
    req.body = { ...req.body, updated_at: new Date() };
    next();
  }

}

module.exports = new AulaUsuarios();
