const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')
const jwt = require('jsonwebtoken')
const { config } = require('../../../config/config.js');
const { generarErrorGQL, validarJwt, obtenerUsuarioPorId, verificarPermisosRolId } = require('../utils.js')

const listaUsuarios = async (_, args, context) => {
  const { userRol } = await validarJwt(context)
  if(userRol !== 'admin') {
    generarErrorGQL(
      'No tienes permisos para realizar esta acción',
      'PERMISOS_INSUFICIENTES',
      403
    )
  }
  const usuariosData = await models.Usuario.findAll()
  const usuarios = usuariosData.map(usuario => usuario.dataValues)
  return usuarios
}
const crearUsuario = async (_, args) => {
  const { nombre, apellidos, email, password } = args

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(password, 10)
  const usuario = await models.Usuario.create({
    id,
    nombre,
    apellidos,
    email,
    password: passwordHash,
    rol: 'user'
  })
  return usuario.dataValues
}
const modificarInfoGeneralUsuario = async (_, args, context) => {
  const { id, ...cambios } = args
  const { userRol, userId } = await validarJwt(context)

  if(userRol === 'admin' && !id) {
    generarErrorGQL(
      'el parametro id es requerido para realizar esta acción como administrador',
      'ID_REQUERIDO',
      400
    )
  }

  const userQueryId = userRol === 'admin' ? id : userId
  const usuario = await obtenerUsuarioPorId(userQueryId)

  verificarPermisosRolId(userRol, userId, usuario.dataValues.id)

  const usuarioModificado = await usuario.update(cambios)
  console.log('usuarioModificado.dataValues',usuarioModificado.dataValues)
  return usuarioModificado.dataValues
}
const login = async (_, args, contextValue) => {
  const { email, password } = args
  const { user } = await contextValue.authenticate('graphql-local', { email, password })
  const payload = {
    userId: user.id,
    userRol: user.rol
  }

  const SECRET_KEY = config.jwtSecret
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  return {
    usuario: user,
    token
  }
}

const resolvers = {
  Query: {
    listaUsuarios
  },
  Mutation: {
    crearUsuario,
    modificarInfoGeneralUsuario,
    login
  }
};

module.exports = resolvers;