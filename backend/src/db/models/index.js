const { Categoria, categoriaSchema } = require("./categoria.model.js");
const { Cuenta, cuentaSchema } = require("./cuenta.model.js");
const { Transaccion, transaccionSchema } = require("./transaccion.model.js");


function setupModels(sequelize) {
  Cuenta.init(cuentaSchema, Cuenta.config(sequelize));
  Categoria.init(categoriaSchema, Categoria.config(sequelize));
  Transaccion.init(transaccionSchema, Transaccion.config(sequelize));

  Cuenta.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Transaccion.associate(sequelize.models);
}

module.exports = {
  setupModels
}
