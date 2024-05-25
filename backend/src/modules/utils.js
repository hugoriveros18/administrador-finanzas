const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const { sequelize } = require('../context/index.js');
const { models } = sequelize
const { randomUUID } = require('crypto')

const generarErrorGQL = (mensaje, codigo, httpStatus = 500) => {
  throw new GraphQLError(mensaje, {
    extensions: {
      code: codigo,
      http: {
        status: httpStatus
      }
    }
  });
}

const obtenerCategoria = async (id) => {
  const categoria = await models.Categoria.findByPk(id)
  if(!categoria) {
    generarErrorGQL(
      'No se encontró la categoría con el ID proporcionado',
      'CATEGORIA_NO_EXISTE'
    )
  }
  return categoria
}

const obtenerCuenta = async (id) => {
  const cuenta = await models.Cuenta.findByPk(id)
  if(!cuenta) {
    generarErrorGQL(
      'No se encontró la cuenta con el ID proporcionado',
      'CUENTA_NO_EXISTE'
    )
  }
  return cuenta
}

const obtenerTransaccion = async (id) => {
  const transaccion = await models.Transaccion.findByPk(id, {
    include: ['cuentaAsociada', 'categoriaAsociada', 'usuarioAsociado']
  })
  if(!transaccion) {
    generarErrorGQL(
      'No se encontró la transacción con el ID proporcionado',
      'TRANSACCION_NO_EXISTE'
    )
  }
  return transaccion
}

const obtenerUsuarioPorId = async (id) => {
  const usuario = await models.Usuario.findOne({ where: { id } })
  if(!usuario) {
    generarErrorGQL(
      'No se encontró el usuario con el email proporcionado',
      'USUARIO_NO_EXISTE'
    )
  }
  return usuario
}

const validarJwt = async (context) => {
  const { user } = await context.authenticate('jwt', { session: false })
  if(!user) {
    generarErrorGQL(
      'Usuario no autenticado',
      'UNAUTHENTICATED',
      401
    )
  }
  return user
}

const verificarPermisosRolId = (rol, payloadUserId, recordUserId) => {
  if(rol !== 'admin' && payloadUserId !== recordUserId) {
    generarErrorGQL(
      'No tienes permisos para realizar esta acción',
      'PERMISOS_INSUFICIENTES',
      403
    )
  }
}

async function findOrCreateUser(profile, provider) {
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

    provider === 'google' ? usuarioNuevo.googleId = profile.sub : usuarioNuevo.facebookId = profile.sub

    console.log('usuarioNuevo', usuarioNuevo)
    const usuarioCreado = await models.Usuario.create(usuarioNuevo)
    return usuarioCreado.dataValues
  }

  const providerIdValue = provider === 'google' ? usuario.dataValues.googleId : usuario.dataValues.facebookId
  if(!providerIdValue) {
    const usuarioActualizado = provider === 'google' 
    ? await usuario.update({ googleId: profile.id }) 
    : await usuario.update({ facebookId: profile.id })
    
    return usuarioActualizado.dataValues
  }

  return usuario.dataValues
}

module.exports = {
  generarErrorGQL,
  obtenerCategoria,
  obtenerCuenta,
  obtenerTransaccion,
  obtenerUsuarioPorId,
  verificarPermisosRolId,
  validarJwt,
  findOrCreateUser
}