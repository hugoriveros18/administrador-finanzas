const typeDefs = `#graphql

  type Movimiento {
    id: Int!
    cuentaOrigen: Cuenta!
    cuentaDestino: Cuenta!
    valor: Int!
    descripcion: String!
    fecha: String!
    usuario: Usuario!
  }

  type RespuestaListaMovimientos {
    movimientos: [Movimiento]!
    totalPaginas: Int!
    totalMovimientos: Int!
  }

  type RespuestaGeneralMovimiento {
    id: Int!
    cuentaOrigen: Int!
    cuentaDestino: Int!
    valor: Int!
    descripcion: String!
    fecha: String!
    usuario: String!
  }

  type Query {
    movimiento(id: Int!): Movimiento
    listaMovimientos(
      year: Int
      month: Int
      cuentaOrigenId: Int
      cuentaDestinoId:Int
      pagina: Int
      itemsPorPagina: Int
    ): RespuestaListaMovimientos
    existenMovimientos: Boolean!
  }

  type Mutation {
    crearMovimiento(
      cuentaOrigen: Int!
      cuentaDestino: Int!
      valor: Int!
      descripcion: String!
      fecha: String!
      usuarioId: String
    ): RespuestaGeneralMovimiento!
    eliminarMovimiento(id: Int!): Movimiento
    modificarMovimiento(
      id: Int!
      cuentaOrigen: Int!
      cuentaDestino: Int!
      valor: Int!
      descripcion: String
      fecha: String
      usuario: String
    ): Movimiento
  }
`

module.exports = typeDefs