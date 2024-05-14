const sequelize = require('../libs/sequelize.js');
const { models } = sequelize
const { obtenerCategoria, obtenerCuenta, obtenerTransaccion } = require('./utils.js');

// CATEGORIAS
const categoria = async (_, args) => {
  const { id } = args
  const categoria = await obtenerCategoria(id)
  return categoria.dataValues
}
const listaCategorias = async () => {
  const categoriasData = await models.Categoria.findAll()
  const categorias = categoriasData.map(categoria => categoria.dataValues)
  return categorias.dataValues
}
const crearCategoria = async (_, args) => {
  const { nombre, tipo } = args
  const categoria = await models.Categoria.create({
    nombre,
    tipo
  })
  return categoria.dataValues
}
const eliminarCategoria = async (_, args) => {
  const { id } = args
  const categoria = await obtenerCategoria(id)
  await categoria.destroy()
  return categoria.dataValues
}
const modificarCategoria = async (_, args) => {
  const { id, ...cambios } = args
  const categoria = await obtenerCategoria(id)
  const rta = await categoria.update(cambios)
  return rta.dataValues
}

// CUENTAS
const cuenta = async (_, args) => {
  const { id } = args
  const cuenta = await obtenerCuenta(id)
  return cuenta.dataValues
}
const listaCuentas = async () => {
  const cuentasData = await models.Cuenta.findAll()
  const cuentas = cuentasData.map(cuenta => cuenta.dataValues)
  return cuentas
}
const crearCuenta = async (_, args) => {
  const { nombre, entidadFinanciera, tipoCuenta, numeroCuenta } = args
  const cuenta = await models.Cuenta.create({
    nombre,
    entidadFinanciera,
    tipoCuenta,
    numeroCuenta
  })
  return cuenta.dataValues
}
const eliminarCuenta = async (_, args) => {
  const { id } = args
  const cuenta = await obtenerCuenta(id)
  await cuenta.destroy()
  return cuenta.dataValues
}
const modificarCuenta = async (_, args) => {
  const { id, ...cambios } = args
  const cuenta = await obtenerCuenta(id)
  const rta = await cuenta.update(cambios)
  return rta.dataValues
}

// TRANSACCIONES
const transaccion = async (_, args) => {
  const { id } = args
  const transaccionData = await obtenerTransaccion(id)
  const transaccion = {
    id: transaccionData.dataValues.id,
    valor: transaccionData.dataValues.valor,
    descripcion: transaccionData.dataValues.descripcion,
    fecha: new Date(transaccionData.dataValues.fecha).toISOString().split('T')[0],
    cuenta: transaccionData.cuentaAsociada.dataValues,
    categoria: transaccionData.categoriaAsociada.dataValues
  }
  return transaccion
}
const listaTransacciones = async () => {
  const transaccionesData = await models.Transaccion.findAll({
    include: ['cuentaAsociada', 'categoriaAsociada']
  })
  const transacciones = transaccionesData.map(transaccion => {
    return {
      id: transaccion.dataValues.id,
      valor: transaccion.dataValues.valor,
      descripcion: transaccion.dataValues.descripcion,
      fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
      cuenta: transaccion.cuentaAsociada.dataValues,
      categoria: transaccion.categoriaAsociada.dataValues
    }
  })
  return transacciones
}
const crearTransaccion = async (_, args) => {
  const { valor, descripcion, fecha, cuentaId, categoriaId } = args
  const cuenta = await obtenerCuenta(cuentaId)
  const categoria = await obtenerCategoria(categoriaId)
  if(!cuenta || !categoria) return null
  const transaccionData = await models.Transaccion.create({
    valor,
    descripcion,
    fecha,
    cuenta: cuentaId,
    categoria: categoriaId
  })
  const transaccion = {
    ...transaccionData.dataValues,
    cuenta: cuenta.dataValues,
    categoria: categoria.dataValues
  }
  
  return transaccion
}
const eliminarTransaccion = async (_, args) => {
  const { id } = args
  const transaccion = await obtenerTransaccion(id)
  await transaccion.destroy()
  return {
    id: transaccion.dataValues.id,
    valor: transaccion.dataValues.valor,
    descripcion: transaccion.dataValues.descripcion,
    fecha: new Date(transaccion.dataValues.fecha).toISOString().split('T')[0],
    cuenta: transaccion.cuentaAsociada.dataValues,
    categoria: transaccion.categoriaAsociada.dataValues
  }
}
const modificarTransaccion = async (_, args) => {
  const { id, cuentaId, categoriaId, ...cambios } = args
  const transaccion = await obtenerTransaccion(id)
  
  if(cuentaId) {
    const cuenta = await obtenerCuenta(cuentaId)
    if(cuenta) await transaccion.setCuentaAsociada(cuenta)
  }
  if(categoriaId) {
    const categoria = await obtenerCategoria(categoriaId)
    if(categoria) await transaccion.setCategoriaAsociada(categoria)
  }

  await transaccion.update(cambios)
  const rta = await transaccion.reload()

  return {
    id: rta.dataValues.id,
    valor: rta.dataValues.valor,
    descripcion: rta.dataValues.descripcion,
    fecha: new Date(rta.dataValues.fecha).toISOString().split('T')[0],
    cuenta: rta.cuentaAsociada.dataValues,
    categoria: rta.categoriaAsociada.dataValues
  }
}

const resolvers = {
  Query: {
    categoria,
    listaCategorias,
    cuenta,
    listaCuentas,
    transaccion,
    listaTransacciones
  },
  Mutation: {
    crearCategoria,
    eliminarCategoria,
    modificarCategoria,
    crearCuenta,
    eliminarCuenta,
    modificarCuenta,
    crearTransaccion,
    eliminarTransaccion,
    modificarTransaccion
  }
};

module.exports = resolvers;