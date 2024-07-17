const { Op, literal } = require('sequelize')
const { sequelize } = require('../../context/index.js')
const { models } = sequelize
const { validarJwt, obtenerMovimiento, verificarPermisosRolId, obtenerCuenta, disponibleCuenta } = require("../utils")
const boom = require('@hapi/boom')

const movimiento = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const movimientoData = await obtenerMovimiento(id)

  verificarPermisosRolId(userRol, userId, movimientoData.dataValues.usuario)

  const movimiento = {
    id: movimientoData.dataValues.id,
    cuentaOrigen: movimientoData.cuentaOrigenAsociada.dataValues,
    cuentaDestino: movimientoData.cuentaDestinoAsociada.dataValues,
    valor: movimientoData.dataValues.valor,
    descripcion: movimientoData.dataValues.descripcion,
    fecha: new Date(movimientoData.dataValues.fecha).toISOString().split('T')[0],
    usuario: movimientoData.usuarioAsociado.dataValues,
  }

  return movimiento
}
const listaMovimientos = async (_, args, context) => {
  const { userId } = await validarJwt(context)
  const { year, month, cuentaOrigenId, cuentaDestinoId, pagina, itemsPorPagina } = args

  const whereConditions = {
    [Op.and]: []
  }
  whereConditions[Op.and].push({ usuario: userId })
  if (year) whereConditions[Op.and].push(literal(`EXTRACT(YEAR FROM "fecha_transaccion") = ${year}`))
  if (month) whereConditions[Op.and].push(literal(`EXTRACT(MONTH FROM "fecha_transaccion") = ${month}`))
  if (cuentaOrigenId) whereConditions[Op.and].push({ cuentaOrigen: cuentaOrigenId })
  if (cuentaDestinoId) whereConditions[Op.and].push({ cuentaDestino: cuentaDestinoId })

  const limit = itemsPorPagina ?? 10
  const offset = pagina ? (pagina - 1) * itemsPorPagina : 0

  if (limit < 1) throw boom.badRequest('El numero de items por pagina debe ser mayor a 0')
  if (offset < 0) throw boom.badRequest('El numero de pagina debe ser mayor a 0')

  const totalMovimientos = await models.Movimiento.count({
    where: whereConditions,
  })

  const totalPaginas = Math.ceil(totalMovimientos / limit)

  const movimientosData = await models.Movimiento.findAll({
    include: [
      'cuentaOrigenAsociada',
      'cuentaDestinoAsociada',
    ],
    where: whereConditions,
    limit,
    offset,
    order: [['fecha_transaccion', 'DESC']]
  })

  const movimientos = movimientosData.map(movimiento => {
    return {
      id: movimiento.dataValues.id,
      cuentaOrigen: movimiento.cuentaOrigenAsociada.dataValues,
      cuentaDestino: movimiento.cuentaDestinoAsociada.dataValues,
      valor: movimiento.dataValues.valor,
      descripcion: movimiento.dataValues.descripcion,
      fecha: new Date(movimiento.dataValues.fecha).toISOString().split('T')[0],
      usuario: movimiento.usuario.dataValues,
    }
  })

  return {
    movimientos,
    totalPaginas,
    totalMovimientos
  }
}
const existenMovimientos = async (_, args, context) => {
  const { userId } = await validarJwt(context)
  const movimientos = await models.Movimiento.count({
    where: {
      usuario: userId
    },
    limit: 1
  })
  return movimientos > 0
}
const crearMovimiento = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { cuentaOrigen, cuentaDestino, valor, descripcion, fecha, usuarioId } = args

  if(userRol === 'admin' && !usuarioId) {
    throw boom.badRequest('El campo usuarioId es requerido para crear un movimiento como administrador')
  }
  
  if(cuentaOrigen === cuentaDestino) {
    throw boom.badRequest('La cuenta de origen y la cuenta de destino no pueden ser iguales')
  }

  const saldoCuentaOrigen = await disponibleCuenta(cuentaOrigen, userId)
  if(saldoCuentaOrigen < valor) {
    throw boom.badRequest('El saldo de la cuenta de origen no es suficiente para realizar el movimiento')
  }

  const movimiento = await models.Movimiento.create({
    cuentaOrigen,
    cuentaDestino,
    valor,
    descripcion,
    fecha,
    usuario: userRol === 'admin' ? usuarioId : userId,
  })

  return movimiento.dataValues
}
const eliminarMovimiento = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const movimiento = await obtenerMovimiento(id)

  verificarPermisosRolId(userRol, userId, movimiento.dataValues.usuario)

  const saldoCuentaDestino = await disponibleCuenta(movimiento.dataValues.cuentaDestino, userId)
  const saldoCuentaDestinoSinMovimiento = saldoCuentaDestino - movimiento.dataValues.valor
  if (saldoCuentaDestinoSinMovimiento < 0) throw boom.badRequest('El saldo de la cuenta de destino no es suficiente para eliminar el movimiento')

  await movimiento.destroy()
  return {
    id: movimiento.dataValues.id,
    cuentaOrigen: movimiento.cuentaOrigenAsociada.dataValues,
    cuentaDestino: movimiento.cuentaDestinoAsociada.dataValues,
    valor: movimiento.dataValues.valor,
    descripcion: movimiento.dataValues.descripcion,
    fecha: new Date(movimiento.dataValues.fecha).toISOString().split('T')[0],
    usuario: movimiento.usuario.dataValues,
  }
}
const modificarMovimiento = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, cuentaOrigen, cuentaDestino, ...cambios } = args
  const movimiento = await obtenerMovimiento(id)
  const cuentaOrigenOriginal = movimiento.dataValues.cuentaOrigen
  const cuentaDestinoOriginal = movimiento.dataValues.cuentaDestino
  const valorOriginal = movimiento.dataValues.valor

  verificarPermisosRolId(userRol, userId, movimiento.dataValues.usuario)

  if(cuentaOrigen === cuentaDestino) {
    throw boom.badRequest('La cuenta de origen y la cuenta de destino no pueden ser iguales')
  }

  if (cuentaOrigenOriginal !== cuentaOrigen) {
    const saldoCuentaOrigen = await disponibleCuenta(cuentaOrigen, userId)
    if(saldoCuentaOrigen < cambios.valor) throw boom.badRequest('El saldo de la cuenta de origen no es suficiente para realizar el movimiento')
  } else {
    const diferenciaValor = cambios.valor - valorOriginal
    if (diferenciaValor > 0) {
      const saldoCuentaOrigen = await disponibleCuenta(cuentaOrigen, userId)
      if((saldoCuentaOrigen - diferenciaValor) < 0) throw boom.badRequest('El saldo de la cuenta de origen no es suficiente para realizar el movimiento')
    }
  }

  if (cuentaDestinoOriginal !== cuentaDestino) {
    const saldoCuentaDestino = await disponibleCuenta(cuentaDestinoOriginal, userId)
    if ((saldoCuentaDestino - valorOriginal) < 0) throw boom.badRequest('El saldo de la cuenta de destino no es suficiente para realizar el movimiento')
  } else {
    const diferenciaValor = cambios.valor - valorOriginal
    if (diferenciaValor < 0) {
      const saldoCuentaDestino = await disponibleCuenta(cuentaDestinoOriginal, userId)
      if ((saldoCuentaDestino + diferenciaValor) < 0) throw boom.badRequest('El saldo de la cuenta de destino no es suficiente para realizar el movimiento')
    }
  }



  if (cuentaOrigenOriginal !== cuentaOrigen) {
    const cuenta = await obtenerCuenta(cuentaOrigen)
    if (cuenta) await movimiento.setCuentaOrigenAsociada(cuenta)
  }
  if (cuentaDestino) {
    const cuenta = await obtenerCuenta(cuentaDestino)
    if (cuenta) await movimiento.setCuentaDestinoAsociada(cuenta)
  }

  await movimiento.update(cambios)
  const rta = await movimiento.reload()

  const movimientoActualizado = {
    id: rta.dataValues.id,
    cuentaOrigen: rta.cuentaOrigenAsociada.dataValues,
    cuentaDestino: rta.cuentaDestinoAsociada.dataValues,
    valor: rta.dataValues.valor,
    descripcion: rta.dataValues.descripcion,
    fecha: new Date(rta.dataValues.fecha).toISOString().split('T')[0],
    usuario: rta.usuario.dataValues,
  }

  return movimientoActualizado
}

const resolvers = {
  Query: {
    movimiento,
    listaMovimientos,
    existenMovimientos
  },
  Mutation: {
    crearMovimiento,
    eliminarMovimiento,
    modificarMovimiento
  }
};

module.exports = resolvers;