const { Op, literal } = require('sequelize');
const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCategoria, obtenerCuenta, obtenerTransaccion, verificarPermisosRolId, validarJwt, disponibleCuenta } = require('../utils.js');
const boom = require('@hapi/boom');

const transaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const transaccionData = await obtenerTransaccion(id)

  verificarPermisosRolId(userRol, userId, transaccionData.dataValues.usuario)

  const transaccion = {
    id: transaccionData.dataValues.id,
    valor: transaccionData.dataValues.valor,
    descripcion: transaccionData.dataValues.descripcion,
    tipo: transaccionData.dataValues.tipo,
    fecha: new Date(transaccionData.dataValues.fecha).toISOString().split('T')[0],
    usuario: transaccionData.usuarioAsociado.dataValues,
    cuenta: transaccionData.cuentaAsociada.dataValues,
    categoria: transaccionData.categoriaAsociada.dataValues
  }
  return transaccion
}
const listaTransacciones = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { year, month, cuentaId, usuarioId, categoriaId, tipo, pagina, itemsPorPagina } = args

  const whereConditions = {
    [Op.and]: []
  }
  userRol === 'admin' 
  ? whereConditions[Op.and].push({ usuario: usuarioId ? usuarioId : null})
  : whereConditions[Op.and].push({ usuario: userId })
  if (year) whereConditions[Op.and].push(literal(`EXTRACT(YEAR FROM "fecha_transaccion") = ${year}`))
  if (month) whereConditions[Op.and].push(literal(`EXTRACT(MONTH FROM "fecha_transaccion") = ${month}`))
  if (tipo) whereConditions[Op.and].push({ tipo: tipo })
  if (cuentaId) whereConditions[Op.and].push({ cuenta: cuentaId })
  if (categoriaId) whereConditions[Op.and].push({ categoria: categoriaId })

  const limit = itemsPorPagina ?? 10
  const offset = pagina ? (pagina - 1) * itemsPorPagina : 0

  if (limit < 1) throw boom.badRequest('El numero de items por pagina debe ser mayor a 0')
  if (offset < 0) throw boom.badRequest('El numero de pagina debe ser mayor a 0')

  const totalTransacciones = await models.Transaccion.count({
    where: whereConditions,
  })

  const totalPaginas = Math.ceil(totalTransacciones / limit)

  const transaccionesData = await models.Transaccion.findAll({
    include: [
      'cuentaAsociada',
      'categoriaAsociada',
    ],
    where: whereConditions,
    limit,
    offset,
    order: [['fecha_transaccion', 'DESC']]
  })

  const transacciones = transaccionesData.map(transaccion => {
    return {
      id: transaccion.dataValues.id,
      valor: transaccion.dataValues.valor,
      descripcion: transaccion.dataValues.descripcion,
      tipo: transaccion.dataValues.tipo,
      fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
      usuario: transaccion.usuario.dataValues,
      cuenta: transaccion.cuentaAsociada.dataValues,
      categoria: transaccion.categoriaAsociada.dataValues
    }
  })

  return {
    transacciones,
    totalPaginas,
    totalTransacciones
  }
}
const existenTransacciones = async (_, args, context) => {
  const { userId } = await validarJwt(context)
  const transacciones = await models.Transaccion.count({
    where: {
      usuario: userId
    },
    limit: 1
  })
  return transacciones > 0
}
const crearTransaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { valor, descripcion, tipo, fecha, usuarioId, cuentaId, categoriaId } = args

  if(userRol === 'admin' && !usuarioId) {
    throw boom.badRequest('El campo usuarioId es requerido para crear una transaccion como administrador')
  }

  const categoria = await obtenerCategoria(categoriaId)

  if(categoria.dataValues.tipo !== tipo) {
    throw boom.badRequest(`La categoria seleccionada no es de tipo ${tipo}`)
  }

  if (tipo === 'egreso') {
    const saldo = await disponibleCuenta(cuentaId, userId)
    if (saldo < valor) {
      throw boom.badRequest('No tienes suficiente saldo para realizar esta transaccion')
    }
  }
  

  const transaccion = await models.Transaccion.create({
    valor,
    descripcion,
    tipo,
    fecha,
    usuario: userRol === 'admin' ? usuarioId : userId,
    cuenta: cuentaId,
    categoria: categoriaId
  })

  return transaccion.dataValues
}
const eliminarTransaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const transaccion = await obtenerTransaccion(id)

  verificarPermisosRolId(userRol, userId, transaccion.dataValues.usuario)

  if (transaccion.dataValues.tipo === 'ingreso') {
    const saldoCuenta = await disponibleCuenta(transaccion.dataValues.cuenta, userId)
    const saldoSinTransaccion = saldoCuenta - transaccion.dataValues.valor
    if (saldoSinTransaccion < 0) throw boom.badRequest('No tienes suficiente saldo para eliminar esta transaccion')
  }

  await transaccion.destroy()
  return {
    id: transaccion.dataValues.id,
    valor: transaccion.dataValues.valor,
    descripcion: transaccion.dataValues.descripcion,
    tipo: transaccion.dataValues.tipo,
    fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
    usuario: transaccion.usuarioAsociado.dataValues,
    cuenta: transaccion.cuentaAsociada.dataValues,
    categoria: transaccion.categoriaAsociada.dataValues
  }
}
const modificarTransaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, cuentaId, categoriaId, tipo, ...cambios } = args
  const transaccion = await obtenerTransaccion(id)
  
  verificarPermisosRolId(userRol, userId, transaccion.dataValues.usuario)

  const idCuentaTransaccionOriginal = transaccion.dataValues.cuenta
  const tipoTransaccionOriginal = transaccion.dataValues.tipo
  const valorTransaccionOriginal = transaccion.dataValues.valor

  if (idCuentaTransaccionOriginal !== cuentaId) {

    if (tipoTransaccionOriginal === 'ingreso') {
      const saldoCuentaOriginal = await disponibleCuenta(idCuentaTransaccionOriginal, userId)
      const saldoSinTransaccion = saldoCuentaOriginal - valorTransaccionOriginal
      if (saldoSinTransaccion < 0) throw boom.badRequest('No tienes suficiente saldo para modificar esta transaccion')
    }
  
    if (tipo === 'egreso') {
      const saldoCuentaNueva = await disponibleCuenta(cuentaId, userId)
      const nuevoValorTransaccion = cambios.valor
      if (saldoCuentaNueva < nuevoValorTransaccion) throw boom.badRequest('No tienes suficiente saldo para modificar esta transaccion')
    }
    
  } else {
    const saldoCuentaOriginal = await disponibleCuenta(idCuentaTransaccionOriginal, userId)

    if (tipoTransaccionOriginal !== tipo) {
      if (tipoTransaccionOriginal === 'ingreso') {
        const saldoSinTransaccion = saldoCuentaOriginal - valorTransaccionOriginal
        if (saldoSinTransaccion < 0) throw boom.badRequest('No tienes suficiente saldo para modificar esta transaccion')
        
        const saldoConNuevaTransaccion = saldoSinTransaccion + cambios.valor
        if (saldoConNuevaTransaccion < 0) throw boom.badRequest('No tienes suficiente saldo para modificar esta transaccion')
      }

    } else {
      const diferenciaValorOriginalNuevo = tipoTransaccionOriginal === 'ingreso' ? valorTransaccionOriginal - cambios.valor : cambios.valor - valorTransaccionOriginal
      if (diferenciaValorOriginalNuevo > 0) {
        const saldoConVariacionDeValor = saldoCuentaOriginal - diferenciaValorOriginalNuevo
        if (saldoConVariacionDeValor < 0) throw boom.badRequest('No tienes suficiente saldo para modificar esta transaccion')
      }
    }
  }

  if (cuentaId) {
    const cuenta = await obtenerCuenta(cuentaId)
    if (cuenta) await transaccion.setCuentaAsociada(cuenta)
  }

  const categoria = await obtenerCategoria(categoriaId)
  if (categoria.dataValues.tipo !== tipo) {
    throw boom.badRequest(`La categoria seleccionada no es de tipo ${tipo}`)
  }
  await transaccion.setCategoriaAsociada(categoria)

  await transaccion.update({...cambios, tipo})
  const rta = await transaccion.reload()

  const transaccionActualizada = {
    id: rta.dataValues.id,
    valor: rta.dataValues.valor,
    descripcion: rta.dataValues.descripcion,
    tipo: rta.dataValues.tipo,
    fecha: new Date(rta.dataValues.fecha).toISOString().split('T')[0],
    usuario: rta.usuarioAsociado.dataValues,
    cuenta: rta.cuentaAsociada.dataValues,
    categoria: rta.categoriaAsociada.dataValues
  }

  return transaccionActualizada
}

const resolvers = {
  Query: {
    transaccion,
    listaTransacciones,
    existenTransacciones
  },
  Mutation: {
    crearTransaccion,
    eliminarTransaccion,
    modificarTransaccion
  }
};

module.exports = resolvers;