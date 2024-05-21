const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const { sequelize } = require('../context/index.js');
const { models } = sequelize
const { config } = require('../../config/config.js');

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

const obtenerUsuario = async (email) => {
  const usuario = await models.Usuario.findOne({ where: { email } })
  if(!usuario) {
    generarErrorGQL(
      'No se encontró el usuario con el email proporcionado',
      'USUARIO_NO_EXISTE'
    )
  }
  return usuario
}

const verificarToken = (token) => {
  if(!token) {
    generarErrorGQL(
      'Usuario no autenticado',
      'UNAUTHENTICATED',
      401
    )
  }

  const SECRET_KEY = config.jwtSecret
  try {
    const payload = jwt.verify(token, SECRET_KEY)
    return payload
  } catch (error) {
    generarErrorGQL(
      error,
      'TOKEN_INVALIDO',
      401
    )
  }
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

module.exports = {
  generarErrorGQL,
  obtenerCategoria,
  obtenerCuenta,
  obtenerTransaccion,
  obtenerUsuario,
  verificarToken,
  verificarPermisosRolId
}