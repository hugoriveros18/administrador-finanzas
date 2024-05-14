'use strict';

const { CATEGORIAS_TABLE, categoriaSchema } = require('../models/categoria.model');
const { CUENTAS_TABLE, cuentaSchema } = require('../models/cuenta.model');
const { TRANSACCIONES_TABLE, transaccionSchema } = require('../models/transaccion.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(CUENTAS_TABLE, cuentaSchema)
    await queryInterface.createTable(CATEGORIAS_TABLE, categoriaSchema)
    await queryInterface.createTable(TRANSACCIONES_TABLE, transaccionSchema)
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(CUENTAS_TABLE)
    await queryInterface.dropTable(CATEGORIAS_TABLE)
    await queryInterface.dropTable(TRANSACCIONES_TABLE)
  }
}
