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
    totalIngresos: Int!
    totalEgresos: Int!
    totalAhorro: Int!
    rol: Rol!
  }

  type Login {
    usuario: Usuario!
    token: String!
  }

  type Query {
    listaUsuarios: [Usuario]
  }

  type Mutation {
    crearUsuario(
      nombre: String!
      apellidos: String!
      email: String!
      password: String!
    ): Usuario!
    modificarInfoGeneralUsuario(
      id: String
      nombre: String
      apellidos: String
    ): Usuario!
    login(
      email: String!
      password: String!
    ): Login!
  }
`

module.exports = typeDefs