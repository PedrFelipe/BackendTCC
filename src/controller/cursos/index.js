const { object, string, mixed } = require("yup");

class Cursos {


  async store(req, res, next) {
    
    req.body = { ...req.body, created_at: new Date(), updated_at: "" };
    next();
  }

  async update(req, res, next) {
    req.body = { ...req.body, updated_at: new Date() };
    next();
  }

}

module.exports = new Cursos();
