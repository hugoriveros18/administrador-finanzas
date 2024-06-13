import { gql } from "@apollo/client";

export const CREAR_TRANSACCION = gql`
  mutation CrearTransaccion(
    $valor: Int!
    $descripcion: String!
    $fecha: String!
    $cuentaId: Int!
    $categoriaId: Int!
  ) {
    crearTransaccion(
      valor: $valor
      descripcion: $descripcion
      fecha: $fecha
      cuentaId: $cuentaId
      categoriaId: $categoriaId
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
