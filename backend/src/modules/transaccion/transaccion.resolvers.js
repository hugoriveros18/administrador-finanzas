const { Op, literal } = require('sequelize');
const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCategoria, obtenerCuenta, obtenerTransaccion, verificarPermisosRolId, validarJwt } = require('../utils.js');

const transaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const transaccionData = await obtenerTransaccion(id)

  verificarPermisosRolId(userRol, userId, transaccionData.dataValues.usuario)

  const transaccion = {
    id: transaccionData.dataValues.id,
    valor: transaccionData.dataValues.valor,
    descripcion: transaccionData.dataValues.descripcion,
    fecha: new Date(transaccionData.dataValues.fecha).toISOString().split('T')[0],
    usuario: transaccionData.usuarioAsociado.dataValues,
    cuenta: transaccionData.cuentaAsociada.dataValues,
    categoria: transaccionData.categoriaAsociada.dataValues
  }
  return transaccion
}
const listaTransacciones = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { year, month, cuentaId, usuarioId, categoriaId, tipoTransaccion } = args

  const whereConditions = {
    [Op.and]: []
  }
  userRol === 'admin' 
  ? whereConditions[Op.and].push({ usuario: usuarioId ? usuarioId : null})
  : whereConditions[Op.and].push({ usuario: userId })
  if (year) whereConditions[Op.and].push(literal(`EXTRACT(YEAR FROM "fecha_transaccion") = ${year}`))
  if (month) whereConditions[Op.and].push(literal(`EXTRACT(MONTH FROM "fecha_transaccion") = ${month}`))
  if (cuentaId) whereConditions[Op.and].push({ cuenta: cuentaId })
  if (categoriaId) whereConditions[Op.and].push({ categoria: categoriaId })

  const transaccionesData = await models.Transaccion.findAll({
    include: [
      'cuentaAsociada',
      {
        model: models.Categoria,
        as: 'categoriaAsociada',
        where: tipoTransaccion ? { tipo: tipoTransaccion } : null
      },
    ],
    where: whereConditions
  })
  const transacciones = transaccionesData.map(transaccion => {
    return {
      id: transaccion.dataValues.id,
      valor: transaccion.dataValues.valor,
      descripcion: transaccion.dataValues.descripcion,
      fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
      usuario: transaccion.usuarioAsociado.dataValues,
      cuenta: transaccion.cuentaAsociada.dataValues,
      categoria: transaccion.categoriaAsociada.dataValues
    }
  })

  return transacciones
}
const crearTransaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { valor, descripcion, fecha, usuarioId, cuentaId, categoriaId } = args

  if(userRol === 'admin' && !usuarioId) {
    generarErrorGQL(
      'El campo usuarioId es requerido para crear una transaccion como administrador',
      'CAMPO_REQUERIDO',
      400
    )
  }

  const transaccion = await models.Transaccion.create({
    valor,
    descripcion,
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

  await transaccion.destroy()
  return {
    id: transaccion.dataValues.id,
    valor: transaccion.dataValues.valor,
    descripcion: transaccion.dataValues.descripcion,
    fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
    usuario: transaccion.usuarioAsociado.dataValues,
    cuenta: transaccion.cuentaAsociada.dataValues,
    categoria: transaccion.categoriaAsociada.dataValues
  }
}
const modificarTransaccion = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, cuentaId, categoriaId, ...cambios } = args
  const transaccion = await obtenerTransaccion(id)

  verificarPermisosRolId(userRol, userId, transaccion.dataValues.usuario)

  if (cuentaId) {
    const cuenta = await obtenerCuenta(cuentaId)
    if (cuenta) await transaccion.setCuentaAsociada(cuenta)
  }
  if (categoriaId) {
    const categoria = await obtenerCategoria(categoriaId)
    if (categoria) await transaccion.setCategoriaAsociada(categoria)
  }

  await transaccion.update(cambios)
  const rta = await transaccion.reload()

  const transaccionActualizada = {
    id: rta.dataValues.id,
    valor: rta.dataValues.valor,
    descripcion: rta.dataValues.descripcion,
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
    listaTransacciones
  },
  Mutation: {
    crearTransaccion,
    eliminarTransaccion,
    modificarTransaccion
  }
};

module.exports = resolvers;