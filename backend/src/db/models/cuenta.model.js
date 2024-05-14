const { Model, DataTypes } = require('sequelize')

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
  entidadFinanciera: {
    allowNull: false,
    field: 'entidad_financiera',
    type: DataTypes.STRING
  },
  tipoCuenta: {
    allowNull: false,
    field: 'tipo_cuenta',
    type: DataTypes.ENUM('efectivo' ,'ahorros', 'corriente', 'bolsillo', 'tarjeta de credito')
  },
  numeroCuenta: {
    allowNull: false,
    field: 'numero_cuenta',
    type: DataTypes.STRING
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