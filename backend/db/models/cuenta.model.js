const { Model, DataTypes } = require('sequelize')
const { USUARIOS_TABLE } = require('./usuario.model')

const CUENTAS_TABLE = 'Cuentas'

const cuentaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  tipoCuenta: {
    allowNull: false,
    field: 'tipo_cuenta',
    type: DataTypes.ENUM('efectivo' ,'ahorros','bolsillo',)
  },
  numeroCuenta: {
    allowNull: false,
    field: 'numero_cuenta',
    type: DataTypes.STRING
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING
  },
  usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_id',
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    }
  },
}

class Cuenta extends Model {
  static associate(models) {
    this.hasMany(models.Transaccion, {
      as: 'transacciones',
      foreignKey: 'cuenta',
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
    this.belongsTo(models.Usuario, {
      as: 'usuarioAsociado',
      foreignKey: 'usuario'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CUENTAS_TABLE,
      modelName: 'Cuenta',
      timestamps: false
    }
  }
}

module.exports = {
  CUENTAS_TABLE,
  cuentaSchema,
  Cuenta
}