const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCuenta, generarErrorGQL, verificarPermisosRolId, validarJwt } = require('../utils.js');

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
  const { nombre, entidadFinanciera, tipoCuenta, numeroCuenta, usuario } = args

  if(userRol === 'admin' && !usuario) {
    generarErrorGQL(
      'El campo usuario es requerido para crear una cuenta como administrador',
      'CAMPO_REQUERIDO',
      400
    )
  }

  const cuenta = await models.Cuenta.create({
    nombre,
    entidadFinanciera,
    tipoCuenta,
    numeroCuenta,
    usuario: userRol === 'admin' ? usuario : userId
  })

  return cuenta.dataValues
}
const eliminarCuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const cuenta = await obtenerCuenta(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  await cuenta.destroy()
  return cuenta.dataValues
}
const modificarCuenta = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, ...cambios } = args
  const cuenta = await obtenerCuenta(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  const rta = await cuenta.update(cambios)
  return rta.dataValues
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