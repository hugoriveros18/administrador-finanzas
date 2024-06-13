import { gql } from "@apollo/client";

export const LISTA_CATEGORIAS = gql`
  query ListaCategorias {
    listaCategorias {
      ingreso {
        id
        nombre
        tipo
      }
      egreso {
        id
        nombre
        tipo
      }
      count
    }
  }
`;
