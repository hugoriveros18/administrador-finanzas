const { GraphQLError } = require('graphql');
const sequelize = require('../libs/sequelize.js');
const { models } = sequelize

const generarErrorGQL = (mensaje, codigo) => {
  throw new GraphQLError(mensaje, {
    extensions: {
      code: codigo
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
    include: ['cuentaAsociada', 'categoriaAsociada']
  })
  if(!transaccion) {
    generarErrorGQL(
      'No se encontró la transacción con el ID proporcionado',
      'TRANSACCION_NO_EXISTE'
    )
  }
  return transaccion
}

module.exports = {
  obtenerCategoria,
  obtenerCuenta,
  obtenerTransaccion
}