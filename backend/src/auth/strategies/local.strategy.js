const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { GraphQLLocalStrategy } = require('graphql-passport');
const bcrypt = require('bcrypt');
const { generarErrorGQL } = require('../../modules/utils.js');

const LocalStrategy = new GraphQLLocalStrategy(
  async (email, password, done) => {
    try {
      const usuario = await models.Usuario.findOne({ where: { email } })
      if (!usuario) {
        generarErrorGQL(
          'No se encontró el usuario con el email proporcionado',
          'USUARIO_NO_EXISTE',
          404
        )
      }

      if(!usuario.dataValues.password) {
        generarErrorGQL(
          'El proceso de autenticación debe realizarse con la plataforma de registro correspondiente',
          'AUTENTICACION_NO_PERMITIDA',
          401
        )
      }

      const isValid = await bcrypt.compare(password, usuario.dataValues.password)
      if (!isValid) {
        generarErrorGQL(
          'El correo y/o la contraseña no coinciden',
          'CONTRASENA_INCORRECTA',
          401
        )
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