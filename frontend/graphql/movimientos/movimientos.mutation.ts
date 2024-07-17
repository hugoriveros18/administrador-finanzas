import { gql } from "@apollo/client";

export const CREAR_MOVIMIENTO = gql`
  mutation CrearMovimiento(
    $cuentaOrigen: Int!
    $cuentaDestino: Int!
    $valor: Int!
    $descripcion: String!
    $fecha: String!
    $usuarioId: String
  ) {
    crearMovimiento(
      cuentaOrigen: $cuentaOrigen
      cuentaDestino: $cuentaDestino
      valor: $valor
      descripcion: $descripcion
      fecha: $fecha
      usuarioId: $usuarioId
    ) {
      id
      cuentaOrigen
      cuentaDestino
      valor
      descripcion
      fecha
      usuario
    }
  }
`;

export const EDITAR_MOVIMIENTO = gql`
  mutation EditarMovimiento(
    $id: Int!
    $cuentaOrigen: Int!
    $cuentaDestino: Int!
    $valor: Int
    $descripcion: String
    $fecha: String
    $usuario: String
  ) {
    modificarMovimiento(
      id: $id
      cuentaOrigen: $cuentaOrigen
      cuentaDestino: $cuentaDestino
      valor: $valor
      descripcion: $descripcion
      fecha: $fecha
      usuario: $usuario
    ) {
      id
      cuentaOrigen {
        id
      }
      cuentaDestino {
        id
      }
      valor
      descripcion
      fecha
    }
  }
`;

export const ELIMINAR_MOVIMIENTO = gql`
  mutation EliminarMovimiento($id: Int!) {
    eliminarMovimiento(id: $id) {
      id
    }
  }
`;
