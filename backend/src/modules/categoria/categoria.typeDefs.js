const typeDefs = `#graphql

  enum TipoTransaccion {
    ingreso
    egreso
    ahorro
  }

  type Categoria {
    id: Int!
    nombre: String!
    tipo: TipoTransaccion!
  }

  type Query {
    categoria(id: Int!): Categoria
    listaCategorias(usuario: String): [Categoria]!
  }

  type Mutation {
    crearCategoria(
      nombre: String!
      tipo: TipoTransaccion!
      usuario: String
    ): Categoria!
    eliminarCategoria(id: Int!): Categoria
    modificarCategoria(id: Int!, nombre: String, tipo: TipoTransaccion): Categoria
  }
  
`

module.exports = typeDefs