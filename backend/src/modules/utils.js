const { GraphQLError } = require('graphql');
const { sequelize } = require('../context/index.js');
const { models } = sequelize;
const { randomUUID } = require('crypto');
const boom = require('@hapi/boom');

const obtenerCategoria = async (id) => {
  const categoria = await models.Categoria.findByPk(id)
  if(!categoria) {
    throw boom.notFound('Categoría no encontrada')
  }
  return categoria
}

const obtenerCuenta = async (id) => {
  const cuenta = await models.Cuenta.findByPk(id)
  if(!cuenta) {
    throw boom.notFound('Cuenta no encontrada')
  }
  return cuenta
}

const obtenerTransaccion = async (id) => {
  const transaccion = await models.Transaccion.findByPk(id, {
    include: ['cuentaAsociada', 'categoriaAsociada', 'usuarioAsociado']
  })
  if(!transaccion) {
    throw boom.notFound('Transacción no encontrada')
  }
  return transaccion
}

const obtenerUsuarioPorId = async (id) => {
  const usuario = await models.Usuario.findOne({ where: { id } })
  if(!usuario) {
    throw boom.notFound('Usuario no encontrado')
  }
  return usuario
}

const validarJwt = async (context) => {
  const { user } = await context.authenticate('jwt', { session: false })
  if(!user) {
    throw boom.unauthorized('Usuario no autenticado')
  }
  return user
}

const verificarPermisosRolId = (rol, payloadUserId, recordUserId) => {
  if(rol !== 'admin' && payloadUserId !== recordUserId) {
    throw boom.unauthorized('No tienes permisos para acceder a este recurso')
  }
}

async function findOrCreateUser(profile) {
  const usuario = await models.Usuario.findOne({ where: { email: profile.email } })
  if(!usuario) {
    const id = randomUUID();
    const usuarioNuevo = {
      id,
      nombre: profile.given_name,
      apellidos: profile.family_name,
      email: profile.email,
      rol: 'user'
    }

    usuarioNuevo.googleId = profile.sub
    const usuarioCreado = await models.Usuario.create(usuarioNuevo)
    return usuarioCreado.dataValues
  }

  const providerIdValue = usuario.dataValues.googleId
  if(!providerIdValue) {
    const usuarioActualizado = await usuario.update({ googleId: profile.sub })

    return usuarioActualizado.dataValues
  }

  return usuario.dataValues
}

module.exports = {
  obtenerCategoria,
  obtenerCuenta,
  obtenerTransaccion,
  obtenerUsuarioPorId,
  verificarPermisosRolId,
  validarJwt,
  findOrCreateUser
}