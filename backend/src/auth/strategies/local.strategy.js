const { sequelize } = require('../../context/index.js');
const { models } = sequelize
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { obtenerUsuario, generarErrorGQL } = require('../../modules/utils');

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, done) => {
    try {
      const usuario = await models.Usuario.findOne({ where: { email } })
      if (!usuario) {
        return done(null, false, { message: 'El correo no esta registrado' })
      }

      const isValid = await bcrypt.compare(password, usuario.dataValues.password)
      if (!isValid) {
        return done(null, false, { message: 'El correo y/o la contraseña no coinciden' })
      }

      return done(null, usuario.dataValues)
    } catch (error) {
      done(error, false)
    }
  })

module.exports = LocalStrategy