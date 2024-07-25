import { gql } from "@apollo/client";

export const LISTA_MOVIMIENTOS = gql`
  query ListaMovimientos(
    $year: Int
    $month: Int
    $cuentaOrigenId: Int
    $cuentaDestinoId: Int
    $pagina: Int
    $itemsPorPagina: Int
  ) {
    listaMovimientos(
      year: $year
      month: $month
      cuentaOrigenId: $cuentaOrigenId
      cuentaDestinoId: $cuentaDestinoId
      pagina: $pagina
      itemsPorPagina: $itemsPorPagina
    ) {
      movimientos {
        id
        cuentaOrigen {
          id
          nombre
          color
        }
        cuentaDestino {
          id
          nombre
          color
        }
        valor
        descripcion
        fecha
      }
      totalPaginas
      totalMovimientos
    }
  }
`;

export const EXISTEN_MOVIMIENTOS = gql`
  query {
    existenMovimientos
  }
`;
