const { Categoria, categoriaSchema } = require("./categoria/categoria.model.js");
const { Cuenta, cuentaSchema } = require("./cuenta/cuenta.model.js");
const { Transaccion, transaccionSchema } = require("./transaccion/transaccion.model.js");
const { Usuario, usuarioSchema } = require("./usuario/usuario.model.js");


function setupModels(sequelize) {
  Cuenta.init(cuentaSchema, Cuenta.config(sequelize));
  Categoria.init(categoriaSchema, Categoria.config(sequelize));
  Transaccion.init(transaccionSchema, Transaccion.config(sequelize));
  Usuario.init(usuarioSchema, Usuario.config(sequelize));

  Cuenta.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Transaccion.associate(sequelize.models);
  Usuario.associate(sequelize.models);
}

module.exports = {
  setupModels
}
