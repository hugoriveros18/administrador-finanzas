const { Model, DataTypes } = require('sequelize')

const USUARIOS_TABLE = 'Usuarios'

const usuarioSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  apellidos: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING
  },
  rol: {
    allowNull: false,
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user'
  },
  googleId: {
    type: DataTypes.STRING,
  },
  terminos: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // facebookId: {
  //   type: DataTypes.STRING,
  // },
}

class Usuario extends Model {
  static associate(models) {
    this.hasMany(models.Transaccion, {
      as: 'transacciones',
      foreignKey: 'usuario',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USUARIOS_TABLE,
      modelName: 'Usuario',
      timestamps: false
    }
  }
}

module.exports = {
  USUARIOS_TABLE,
  usuarioSchema,
  Usuario
}