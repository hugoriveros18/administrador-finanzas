const typeDefs = `#graphql

  enum TipoCuenta {
    efectivo
    ahorros
    bolsillo
  }

  type Cuenta {
    id: Int!
    nombre: String!
    entidadFinanciera: String!
    tipoCuenta: TipoCuenta!
    numeroCuenta: String!
  }

  type Query {
    cuenta(id: Int!): Cuenta
    listaCuentas(usuario: String): [Cuenta]!
  }

  type Mutation {
    crearCuenta(
      nombre: String!
      entidadFinanciera: String!
      tipoCuenta: TipoCuenta!
      numeroCuenta: String!
      usuario: String
    ): Cuenta!
    eliminarCuenta(id: Int!): Cuenta
    modificarCuenta(
      id: Int!
      nombre: String
      entidadFinanciera: String
      tipoCuenta: TipoCuenta
      numeroCuenta: String
    ): Cuenta
  }
`

module.exports = typeDefs