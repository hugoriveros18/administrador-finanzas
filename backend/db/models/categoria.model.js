const { Model, DataTypes } = require('sequelize')
const { USUARIOS_TABLE } = require('./usuario.model')

const CATEGORIAS_TABLE = 'Categorias'

const categoriaSchema = {
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
  tipo: {
    allowNull: false,
    field: 'tipo_transaccion',
    type: DataTypes.ENUM('ingreso', 'egreso', 'ahorro')
  },
  usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'usuario_id',
    references: {
      model: USUARIOS_TABLE,
      key: 'id'
    }
  }
}

class Categoria extends Model {
  static associate(models) {
    this.hasMany(models.Transaccion, {
      as: 'transacciones',
      foreignKey: 'categoria',
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
      tableName: CATEGORIAS_TABLE,
      modelName: 'Categoria',
      timestamps: false
    }
  }
}

module.exports = {
  CATEGORIAS_TABLE,
  categoriaSchema,
  Categoria
}