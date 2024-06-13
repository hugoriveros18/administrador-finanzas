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
    token: String!
  }

  type Query {
    usuario(id: String): Usuario!
    listaUsuarios: [Usuario]
    isAuth: Boolean!
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