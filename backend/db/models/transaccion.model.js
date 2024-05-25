const { Model, DataTypes } = require('sequelize')
const { USUARIOS_TABLE } = require('./usuario.model')
const { CUENTAS_TABLE } = require('./cuenta.model')
const { CATEGORIAS_TABLE } = require('./categoria.model')

const TRANSACCIONES_TABLE = 'Transacciones'

const transaccionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
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
  cuenta: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'cuenta_id',
    references: {
      model: CUENTAS_TABLE,
      key: 'id'
    }
  },
  categoria: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'categoria_id',
    references: {
      model: CATEGORIAS_TABLE,
      key: 'id'
    }
  }
}

class Transaccion extends Model {
  static associate(models) {
    this.belongsTo(models.Usuario, {
      as: 'usuarioAsociado',
      foreignKey: 'usuario'
    })
    this.belongsTo(models.Cuenta, {
      as: 'cuentaAsociada',
      foreignKey: 'cuenta'
    })
    this.belongsTo(models.Categoria, {
      as: 'categoriaAsociada',
      foreignKey: 'categoria'
    })
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: TRANSACCIONES_TABLE,
      modelName: 'Transaccion',
      timestamps: false
    }
  }
}

module.exports = {
  TRANSACCIONES_TABLE,
  transaccionSchema,
  Transaccion
}