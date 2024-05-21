const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const bcrypt = require('bcrypt')
const { randomUUID } = require('crypto')
const jwt = require('jsonwebtoken')
const { config } = require('../../../config/config.js');
const { generarErrorGQL, obtenerUsuario, verificarToken} = require('../utils.js')

const listaUsuarios = async (_, args, contextValue) => {
  const { token } = contextValue
  const payload = verificarToken(token)
  const userRol = payload.rol
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
const login = async (_, args) => {
  const { email, password } = args

  const usuario = await obtenerUsuario(email)
  const valid = await bcrypt.compare(password, usuario.dataValues.password)
  if (!valid) {
    generarErrorGQL(
      'El correo y/o la contraseña no coinciden',
      'CONTRASENA_INCORRECTA'
    )
  }

  const payload = {
    id: usuario.dataValues.id,
    rol: usuario.dataValues.rol
  }
  const SECRET_KEY = config.jwtSecret
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  return {
    usuario: usuario.dataValues,
    token
  }
}

const resolvers = {
  Query: {
    listaUsuarios
  },
  Mutation: {
    crearUsuario,
    login
  }
};

module.exports = resolvers;