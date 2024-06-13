import { gql } from "@apollo/client";

export const CREAR_CUENTA = gql`
  mutation CrearCuenta(
    $nombre: String!
    $color: String!
    $tipoCuenta: TipoCuenta!
    $numeroCuenta: String!
  ) {
    crearCuenta(
      nombre: $nombre
      color: $color
      tipoCuenta: $tipoCuenta
      numeroCuenta: $numeroCuenta
    ) {
      id
      nombre
      color
      tipoCuenta
      numeroCuenta
    }
  }
`;

export const ELIMINAR_CUENTA = gql`
  mutation EliminarCuenta($id: Int!) {
    eliminarCuenta(id: $id) {
      id
      nombre
      color
      tipoCuenta
      numeroCuenta
    }
  }
`;

export const EDITAR_CUENTA = gql`
  mutation EditarCuenta(
    $id: Int!
    $nombre: String
    $color: String
    $tipoCuenta: TipoCuenta
    $numeroCuenta: String
  ) {
    modificarCuenta(
      id: $id
      nombre: $nombre
      color: $color
      tipoCuenta: $tipoCuenta
      numeroCuenta: $numeroCuenta
    ) {
      id
      nombre
      color
      tipoCuenta
      numeroCuenta
    }
  }
`;
