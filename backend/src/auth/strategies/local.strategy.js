const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { GraphQLLocalStrategy } = require('graphql-passport');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const LocalStrategy = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const usuario = await models.Usuario.findOne({ where: { email } })
      if (!usuario) {
        throw boom.notFound('No se encontró el usuario con el email proporcionado')
      }

      if(!usuario.dataValues.password) {
        throw boom.badRequest('El usuario no tiene una contraseña establecida')
      }

      const isValid = await bcrypt.compare(password, usuario.dataValues.password)
      if (!isValid) {
        throw boom.unauthorized('El correo y/o la contraseña no coinciden')
      }

      const usuarioInfo = {
        ...usuario.dataValues
      }
      delete usuarioInfo.password
      
      done(null, usuarioInfo)
    } catch (error) {
      done(error, false)
    }
  }
)

module.exports = LocalStrategy