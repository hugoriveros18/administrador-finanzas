const typeDefs = `#graphql

  type Transaccion {
    id: Int!
    valor: Int!
    descripcion: String!
    fecha: String!
    usuario: Usuario!
    cuenta: Cuenta!
    categoria: Categoria!
  }

  type RespuestaGeneralTransaccion {
    id: Int!
    valor: Int!
    descripcion: String!
    fecha: String!
    usuario: String!
    cuenta: Int!
    categoria: Int!
  }

  type Query {
    transaccion(id: Int!): Transaccion
    listaTransacciones(
      year: Int
      month: Int
      usuarioId: String
      cuentaId: Int
      categoriaId:Int
      tipoTransaccion: TipoTransaccion
      pagina: Int
      itemsPorPagina: Int
    ): [Transaccion]!
    existenTransacciones: Boolean!
  }

  type Mutation {
    crearTransaccion(
      valor: Int!
      descripcion: String!
      fecha: String!
      usuarioId: String
      cuentaId: Int!
      categoriaId: Int!
    ): RespuestaGeneralTransaccion!
    eliminarTransaccion(id: Int!): Transaccion
    modificarTransaccion(
      id: Int!
      valor: Int
      descripcion: String
      fecha: String
      usuarioId: String
      cuentaId: Int
      categoriaId: Int
    ): Transaccion
  }
`

module.exports = typeDefs