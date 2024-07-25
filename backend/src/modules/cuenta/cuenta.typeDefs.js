const typeDefs = `#graphql

  enum TipoCuenta {
    efectivo
    ahorros
    bolsillo
  }

  type Cuenta {
    id: Int!
    nombre: String!
    tipoCuenta: TipoCuenta!
    numeroCuenta: String!
    color: String!
  }

  type Query {
    cuenta(id: Int!): Cuenta
    saldoCuenta(id: Int!): Int!
    listaCuentas(usuario: String): [Cuenta]!
  }

  type Mutation {
    crearCuenta(
      nombre: String!
      tipoCuenta: TipoCuenta!
      numeroCuenta: String!
      color: String!
      usuario: String
    ): Cuenta!
    eliminarCuenta(id: Int!): Cuenta
    modificarCuenta(
      id: Int!
      nombre: String
      tipoCuenta: TipoCuenta
      numeroCuenta: String
      color: String
    ): Cuenta
  }
`

module.exports = typeDefs