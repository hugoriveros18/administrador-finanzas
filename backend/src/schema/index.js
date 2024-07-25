const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

// TYPEDEFS
const categoriaTypeDefs = require('../modules/categoria/categoria.typeDefs')
const cuentaTypeDefs = require('../modules/cuenta/cuenta.typeDefs')
const usuarioTypeDefs = require('../modules/usuario/usuario.typeDefs')
const transaccionTypeDefs = require('../modules/transaccion/transaccion.typeDefs')
const movimientoTypeDefs = require('../modules/movimiento/movimiento.typeDefs')

// RESOLVERS
const categoriaResolvers = require('../modules/categoria/categoria.resolvers')
const cuentaResolvers = require('../modules/cuenta/cuenta.resolvers')
const usuarioResolvers = require('../modules/usuario/usuario.resolvers')
const transaccionResolvers = require('../modules/transaccion/transaccion.resolvers')
const movimientoResolvers = require('../modules/movimiento/movimiento.resolvers')


const typeDefs = mergeTypeDefs([categoriaTypeDefs, cuentaTypeDefs, usuarioTypeDefs, transaccionTypeDefs, movimientoTypeDefs]);
const resolvers = mergeResolvers([categoriaResolvers, cuentaResolvers, usuarioResolvers, transaccionResolvers, movimientoResolvers]);

module.exports = {
  typeDefs,
  resolvers
};