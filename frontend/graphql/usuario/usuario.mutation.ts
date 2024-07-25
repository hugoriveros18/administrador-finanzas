import { gql } from "@apollo/client";

export const CREAR_USUARIO = gql`
  mutation CrearUsuario(
    $nombre: String!
    $apellidos: String!
    $email: String!
    $password: String!
    $terminos: Boolean!
  ) {
    crearUsuario(
      nombre: $nombre
      apellidos: $apellidos
      email: $email
      password: $password
      terminos: $terminos
    ) {
      usuario {
        id
        nombre
        apellidos
        email
      }
    }
  }
`;

export const LOGIN_USUARIO = gql`
  mutation LoginUsuario($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      usuario {
        id
        nombre
        apellidos
        email
      }
    }
  }
`;
