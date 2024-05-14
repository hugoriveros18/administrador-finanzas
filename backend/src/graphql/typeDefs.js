const typeDefs = `#graphql

  enum TipoTransaccion {
    ingreso
    egreso
    ahorro
  }

  enum TipoCuenta {
    efectivo
    ahorros
    bolsillo
  }

  type Categoria {
    id: Int!
    nombre: String!
    tipo: TipoTransaccion!
  }

  type Cuenta {
    id: Int!
    nombre: String!
    entidadFinanciera: String!
    tipoCuenta: TipoCuenta!
    numeroCuenta: String!
  }

  type Transaccion {
    id: Int!
    valor: Int!
    descripcion: String!
    fecha: String!
    cuenta: Cuenta!
    categoria: Categoria!
  }

  type Query {
    categoria(id: Int!): Categoria
    listaCategorias: [Categoria]!
    cuenta(id: Int!): Cuenta
    listaCuentas: [Cuenta]!
    transaccion(id: Int!): Transaccion
    listaTransacciones: [Transaccion]!
  }

  type Mutation {
    crearCategoria(
      nombre: String!
      tipo: TipoTransaccion!
    ): Categoria!
    eliminarCategoria(id: Int!): Categoria
    modificarCategoria(id: Int!, nombre: String, tipo: TipoTransaccion): Categoria
    crearCuenta(
      nombre: String!
      entidadFinanciera: String!
      tipoCuenta: TipoCuenta!
      numeroCuenta: String!
    ): Cuenta!
    eliminarCuenta(id: Int!): Cuenta
    modificarCuenta(
      id: Int!
      nombre: String
      entidadFinanciera: String
      tipoCuenta: TipoCuenta
      numeroCuenta: String
    ): Cuenta
    crearTransaccion(
      valor: Int!
      descripcion: String!
      fecha: String!
      cuentaId: Int!
      categoriaId: Int!
    ): Transaccion!
    eliminarTransaccion(id: Int!): Transaccion
    modificarTransaccion(
      id: Int!
      valor: Int
      descripcion: String
      fecha: String
      cuentaId: Int
      categoriaId: Int
    ): Transaccion
  }
`

module.exports = typeDefs