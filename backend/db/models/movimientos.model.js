const { Model, DataTypes } = require('sequelize')
const { USUARIOS_TABLE } = require('./usuario.model')
const { CUENTAS_TABLE } = require('./cuenta.model')

const MOVIMIENTOS_TABLE = 'Movimientos'

const movimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  cuentaOrigen: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cuenta_origen',
    references: {
      model: CUENTAS_TABLE,
      key: 'id'
    }
  },
  cuentaDestino: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cuenta_destino',
    references: {
      model: CUENTAS_TABLE,
      key: 'id'
    }
  },
  valor: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  fecha: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'fecha_transaccion'
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

class Movimiento extends Model {
  static associate(models) {
    this.belongsTo(models.Cuenta, {
      as: 'cuentaOrigenAsociada',
      foreignKey: 'cuentaOrigen'
    })
    this.belongsTo(models.Cuenta, {
      as: 'cuentaDestinoAsociada',
      foreignKey: 'cuentaDestino'
    })
    this.belongsTo(models.Usuario, {
      as: 'usuarioAsociado',
      foreignKey: 'usuario'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIMIENTOS_TABLE,
      modelName: 'Movimiento',
      timestamps: false
    }
  }
}

module.exports = {
  MOVIMIENTOS_TABLE,
  movimientoSchema,
  Movimiento
}