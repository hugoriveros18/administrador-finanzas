const { sequelize } = require('../context/index.js');
const { models } = sequelize;
const { Op, literal } = require('sequelize');
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

const obtenerMovimiento = async (id) => {
  const movimiento = await models.Movimiento.findByPk(id, {
    include: ['cuentaOrigenAsociada', 'cuentaDestinoAsociada', 'usuarioAsociado']
  })
  if(!movimiento) {
    throw boom.notFound('Movimiento no encontrado')
  }
  return movimiento
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

async function disponibleCuenta(cuentaId, userId) {
  const cuenta = await obtenerCuenta(cuentaId)

  if(cuenta.usuario !== userId) {
    throw boom.unauthorized('No tienes permisos para acceder a esta cuenta')
  }


  // Total transacciones de ingreso de la cuenta
  const ingresosTransaccionesCuenta = await models.Transaccion.sum('valor', {
    where: {
      cuenta: cuentaId,
      tipo: 'ingreso'
    },
  })

  // Total transacciones de egresos de la cuenta
  const egresosTransaccionesCuenta = await models.Transaccion.sum('valor' ,{
    where: {
      cuenta: cuentaId,
      tipo: 'egreso'
    },
  })

  // Total movimientos de ingreso de la cuenta
  const ingresosMovimientosCuenta = await models.Movimiento.sum('valor', {
    where: { cuentaDestino: cuentaId },
  })

  // Total movimientos de egresos de la cuenta
  const egresosMovimientosCuenta = await models.Movimiento.sum('valor', {
    where: { cuentaOrigen: cuentaId },
  })

  const total = (ingresosTransaccionesCuenta ?? 0) + (ingresosMovimientosCuenta ?? 0) - (egresosTransaccionesCuenta ?? 0) - (egresosMovimientosCuenta ?? 0)
  return total
}

async function disponibleCategoria(categoriaId, year, month, userId) {
  const categoria = await obtenerCategoria(categoriaId)

  if(categoria.usuario !== userId) {
    throw boom.unauthorized('No tienes permisos para acceder a esta categoría')
  }

  const whereConditions = {
    [Op.and]: [{ categoria: categoriaId }]
  }

  if (year) whereConditions[Op.and].push(literal(`EXTRACT(YEAR FROM "fecha_transaccion") = ${year}`))
  if (month) whereConditions[Op.and].push(literal(`EXTRACT(MONTH FROM "fecha_transaccion") = ${month}`))

  const totalTransaccionesCategoria = await models.Transaccion.sum('valor', {
    where: whereConditions,
  })

  return totalTransaccionesCategoria ?? 0
}

module.exports = {
  obtenerCategoria,
  obtenerCuenta,
  obtenerTransaccion,
  obtenerMovimiento,
  obtenerUsuarioPorId,
  verificarPermisosRolId,
  validarJwt,
  findOrCreateUser,
  disponibleCuenta,
  disponibleCategoria,
}