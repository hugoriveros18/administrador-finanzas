const typeDefs = `#graphql

  enum TipoTransaccion {
    ingreso
    egreso
  }

  type Transaccion {
    id: Int!
    valor: Int!
    descripcion: String!
    tipo: TipoTransaccion!
    fecha: String!
    usuario: Usuario!
    cuenta: Cuenta!
    categoria: Categoria!
  }

  type RespuestaListaTransacciones {
    transacciones: [Transaccion]!
    totalPaginas: Int!
    totalTransacciones: Int!
  }

  type RespuestaGeneralTransaccion {
    id: Int!
    valor: Int!
    descripcion: String!
    tipo: TipoTransaccion!
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
      tipo: TipoTransaccion
      pagina: Int
      itemsPorPagina: Int
    ): RespuestaListaTransacciones
    existenTransacciones: Boolean!
  }

  type Mutation {
    crearTransaccion(
      valor: Int!
      descripcion: String!
      tipo: TipoTransaccion!
      fecha: String!
      cuentaId: Int!
      categoriaId: Int!
      usuarioId: String
    ): RespuestaGeneralTransaccion!
    eliminarTransaccion(id: Int!): Transaccion
    modificarTransaccion(
      id: Int!
      valor: Int!
      descripcion: String
      tipo: TipoTransaccion!
      fecha: String
      usuarioId: String
      cuentaId: Int!
      categoriaId: Int!
    ): Transaccion
  }
`

module.exports = typeDefs