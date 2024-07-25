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

export const SALDO_CATEGORIA = gql`
  query SaldoCategoria($id: Int!, $year: Int, $month: Int) {
    saldoCategoria(id: $id, year: $year, month: $month)
  }
`;
