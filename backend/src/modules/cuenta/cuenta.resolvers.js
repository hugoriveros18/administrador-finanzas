const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCuenta, verificarPermisosRolId, validarJwt } = require('../utils.js');
const boom = require('@hapi/boom');

const cuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const cuenta = await obtenerCuenta(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  return cuenta.dataValues
}
const listaCuentas = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { usuario } = args

  const cuentasData = userRol === 'admin' 
  ? await models.Cuenta.findAll({ where: usuario ? { usuario } : null}) 
  : await models.Cuenta.findAll({ where: { usuario: userId }})

  const cuentas = cuentasData.map(cuenta => cuenta.dataValues)

  return cuentas
}
const crearCuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { nombre, tipoCuenta, numeroCuenta, usuario, color } = args

  if(userRol === 'admin' && !usuario) {
    throw boom.badRequest('El campo usuario es requerido para crear una cuenta como administrador')
  }

  try {
    const cuenta = await models.Cuenta.create({
      nombre,
      tipoCuenta,
      numeroCuenta,
      color,
      usuario: userRol === 'admin' ? usuario : userId
    })
  
    return cuenta.dataValues
  } catch (error) {
    const errorType = error.errors?.[0]?.validatorKey
    if(errorType === 'not_unique') {
      throw boom.badRequest('El nombre de la cuenta ya existe')
    }
  }

}
const eliminarCuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const cuenta = await obtenerCuenta(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  const count = await models.Transaccion.count({ where: { cuenta: id }})

  if(count > 0) {
    throw boom.badRequest('No puedes eliminar una cuenta con transacciones asociadas')
  }

  await cuenta.destroy()
  return cuenta.dataValues
}
const modificarCuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, ...cambios } = args
  const cuenta = await obtenerCuenta(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  try {
    const rta = await cuenta.update(cambios)

    return rta.dataValues
  } catch (error) {
    const errorType = error.errors?.[0]?.validatorKey
    if(errorType === 'not_unique') {
      throw boom.badRequest('El nombre de la cuenta ya existe')
    }
  }
}

const resolvers = {
  Query: {
    cuenta,
    listaCuentas
  },
  Mutation: {
    crearCuenta,
    eliminarCuenta,
    modificarCuenta
  }
};

module.exports = resolvers;