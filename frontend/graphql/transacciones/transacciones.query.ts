import { gql } from "@apollo/client";

export const LISTA_TRANSACCIONES = gql`
  query ListaTransacciones(
    $year: Int
    $month: Int
    $cuentaId: Int
    $categoriaId: Int
    $tipoTransaccion: TipoTransaccion
    $pagina: Int
    $itemsPorPagina: Int
  ) {
    listaTransacciones(
      year: $year
      month: $month
      cuentaId: $cuentaId
      categoriaId: $categoriaId
      tipoTransaccion: $tipoTransaccion
      pagina: $pagina
      itemsPorPagina: $itemsPorPagina
    ) {
      id
      valor
      descripcion
      fecha
      usuario
      cuenta
      categoria
    }
  }
`;

export const EXISTEN_TRANSACCIONES = gql`
  query ExistenTransacciones {
    existenTransacciones
  }
`;
