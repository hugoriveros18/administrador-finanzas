'use strict';

const { CATEGORIAS_TABLE, categoriaSchema } = require("../models/categoria.model");
const { CUENTAS_TABLE, cuentaSchema } = require("../models/cuenta.model");
const { USUARIOS_TABLE, usuarioSchema } = require("../models/usuario.model");
const { TRANSACCIONES_TABLE, transaccionSchema } = require("../models/transaccion.model");
const { MOVIMIENTOS_TABLE, movimientoSchema } = require("../models/movimientos.model");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USUARIOS_TABLE, usuarioSchema)
    await queryInterface.createTable(CUENTAS_TABLE, cuentaSchema)
    await queryInterface.createTable(CATEGORIAS_TABLE, categoriaSchema)
    await queryInterface.createTable(TRANSACCIONES_TABLE, transaccionSchema)
    await queryInterface.createTable(MOVIMIENTOS_TABLE, movimientoSchema)
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(USUARIOS_TABLE)
    await queryInterface.dropTable(CUENTAS_TABLE)
    await queryInterface.dropTable(CATEGORIAS_TABLE)
    await queryInterface.dropTable(TRANSACCIONES_TABLE)
    await queryInterface.dropTable(MOVIMIENTOS_TABLE)
  }
}
