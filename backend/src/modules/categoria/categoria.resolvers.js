const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { obtenerCategoria, verificarToken, verificarPermisosRolId } = require('../utils.js');

const categoria = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userRol = payload.rol
  const userId = payload.id

  const { id } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, cuenta.dataValues.usuario)

  return categoria.dataValues
}
const listaCategorias = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userId = payload.id
  const userRol = payload.rol

  const { usuario } = args
  const categoriasData = userRol === 'admin' 
  ? await models.Categoria.findAll({ where: usuario ? { usuario } : null}) 
  : await models.Categoria.findAll({ where: { usuario: userId }})

  const categorias = categoriasData.map(categoria => categoria.dataValues)
  return categorias.dataValues
}
const crearCategoria = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userRol = payload.rol
  const { nombre, tipo, usuario } = args

  if(userRol === 'admin' && !usuario) {
    generarErrorGQL(
      'El campo usuario es requerido para crear una categoria como administrador',
      'CAMPO_REQUERIDO'
    )
  }

  const userId = payload.id
  const categoria = await models.Categoria.create({
    nombre,
    tipo,
    usuario: userRol === 'admin' ? usuario : userId
  })

  return categoria.dataValues
}
const eliminarCategoria = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userRol = payload.rol
  const userId = payload.id

  const { id } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, categoria.dataValues.usuario)

  await categoria.destroy()
  return categoria.dataValues
}
const modificarCategoria = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userRol = payload.rol
  const userId = payload.id

  const { id, ...cambios } = args
  const categoria = await obtenerCategoria(id)

  verificarPermisosRolId(userRol, userId, categoria.dataValues.usuario)

  const rta = await categoria.update(cambios)
  return rta.dataValues
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