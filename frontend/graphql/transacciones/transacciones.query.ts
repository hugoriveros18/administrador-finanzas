import { gql } from "@apollo/client";

export const LISTA_TRANSACCIONES = gql`
  query ListaTransacciones(
    $year: Int
    $month: Int
    $cuentaId: Int
    $categoriaId: Int
    $tipo: TipoTransaccion
    $pagina: Int
    $itemsPorPagina: Int
  ) {
    listaTransacciones(
      year: $year
      month: $month
      cuentaId: $cuentaId
      categoriaId: $categoriaId
      tipo: $tipo
      pagina: $pagina
      itemsPorPagina: $itemsPorPagina
    ) {
      transacciones {
        id
        valor
        descripcion
        tipo
        fecha
        cuenta {
          id
          nombre
          color
        }
        categoria {
          id
          nombre
          tipo
        }
      }
      totalPaginas
      totalTransacciones
    }
  }
`;

export const EXISTEN_TRANSACCIONES = gql`
  query ExistenTransacciones {
    existenTransacciones
  }
`;
