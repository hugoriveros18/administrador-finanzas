const { Model, DataTypes } = require('sequelize')

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