import { gql } from "@apollo/client";

export const GET_USUARIO_DATA = gql`
  query GetUsuarioData {
    usuario {
      nombre
      email
    }
  }
`;
