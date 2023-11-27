const { log } = require("console");
const { object, string, mixed } = require("yup");
const { apiEndpoints } = require("../../api/index");

class Aulas {


  async store(req, res, next) {
    
    let aulaSchema = object({
      pro_nome: string()
        .required("Entre com o Nome")
        .min(7, "Mínimo de sete caracteres")
        .matches(/\s/, "O nome tem que ter um espaço"),

      com_nome: string()
      .required("Entre com o componente"),

      hor_datahora: string()
      .required("Entre com um horário"),

      alu_serie: string()
      .required("Entre com a série")
    });

    req.body = {
      ...req.body,
      created_at: new Date(),
      updated_at: ""
    };

    try {
     await aulaSchema.validate(req.body)

    } catch (error) {
      return res.status(400).end({ error: error.message });
    }

      next();
  }

  async update(req, res, next) {
    req.body = { ...req.body, updated_at: new Date() };
    next();
  }

  async index(req, res, next) {

    const aula = apiEndpoints.db
      .get("aulas")
      .find({ id: req.body.id })
      .cloneDeep()
      .value();

    next();
  }

}

module.exports = new Aulas();
