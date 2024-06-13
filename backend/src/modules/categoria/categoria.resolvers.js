const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCategoria, verificarPermisosRolId, validarJwt } = require('../utils.js');
const boom = require('@hapi/boom');

const categoria = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  return categoria.dataValues
}
const listaCategorias = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { usuario } = args

  const categoriasData = userRol === 'admin' 
  ? await models.Categoria.findAll({ where: usuario ? { usuario } : null}) 
  : await models.Categoria.findAll({ where: { usuario: userId }})

  const categorias = categoriasData.map(categoria => categoria.dataValues)
  const listaCategorias = {
    ingreso: categorias.filter(categoria => categoria.tipo === 'ingreso'),
    egreso: categorias.filter(categoria => categoria.tipo === 'egreso'),
    count: categorias.length
  }
  return listaCategorias
}
const crearCategoria = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { nombre, tipo, usuario } = args
  
  if(userRol === 'admin' && !usuario) {
    throw boom.badRequest('El campo usuario es requerido para crear una categoria como administrador')
  }

  try {
    const categoria = await models.Categoria.create({
      nombre,
      tipo,
      usuario: userRol === 'admin' ? usuario : userId
    })
    return categoria.dataValues
  } catch (error) {
    const errorType = error.errors?.[0]?.validatorKey
    if(errorType === 'not_unique') {
      throw boom.badRequest('El nombre de la categoria ya existe')
    }
  }
}
const eliminarCategoria = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, categoria.dataValues.usuario)

  const count = await models.Transaccion.count({ where: { categoria: id }})

  if(count > 0) {
    throw boom.badRequest('No puedes eliminar una categoria con transacciones asociadas')
  }

  await categoria.destroy()
  return categoria.dataValues
}
const modificarCategoria = async (_, args, context) => {
  const { userId, userRol } = await validarJwt(context)
  const { id, ...cambios } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, categoria.dataValues.usuario)
  try {
    const rta = await categoria.update(cambios)
    return rta.dataValues
  } catch (error) {
    const errorType = error.errors?.[0]?.validatorKey
    if(errorType === 'not_unique') {
      throw boom.badRequest('El nombre de la categoria ya existe')
    }
  }
}

const resolvers = {
  Query: {
    categoria,
    listaCategorias
  },
  Mutation: {
    crearCategoria,
    eliminarCategoria,
    modificarCategoria
  }
};

module.exports = resolvers;