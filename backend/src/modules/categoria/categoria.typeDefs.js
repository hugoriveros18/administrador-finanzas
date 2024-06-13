const typeDefs = `#graphql

  enum TipoTransaccion {
    ingreso
    egreso
  }

  type Categoria {
    id: Int!
    nombre: String!
    tipo: TipoTransaccion!
  }

  type ListaCategorias {
    ingreso: [Categoria]!
    egreso: [Categoria]!
    count: Int!
  }

  type Query {
    categoria(id: Int!): Categoria
    listaCategorias(usuario: String): ListaCategorias!
  }

  type Mutation {
    crearCategoria(
      nombre: String!
      tipo: TipoTransaccion!
      usuario: String
    ): Categoria!
    eliminarCategoria(id: Int!): Categoria
    modificarCategoria(id: Int!, nombre: String): Categoria
  }
  
`

module.exports = typeDefs