const typeDefs = `#graphql

  enum Rol {
    admin
    user
  }

  type Usuario {
    id: String!
    nombre: String!
    apellidos: String!
    email: String!
  }

  type LoginSuccess {
    usuario: Usuario!
  }

  type ResumenFinanciero {
    ingresos: Int!
    egresos: Int!
    balance: Int!
  }

  type Query {
    usuario(id: String): Usuario!
    listaUsuarios: [Usuario]
    isAuth: Boolean!
    resumenFinanciero(
      year: String
      month: String
    ): ResumenFinanciero!
    disponibleCuenta: Int!
    activeYears: [String]
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellidos: String!
      email: String!
      password: String!
      terminos: Boolean!
    ): LoginSuccess!
    modificarInfoGeneralUsuario(
      id: String
      nombre: String
      apellidos: String
    ): Usuario!
    login(
      email: String!
      password: String!
    ): LoginSuccess!
  }
`

module.exports = typeDefs