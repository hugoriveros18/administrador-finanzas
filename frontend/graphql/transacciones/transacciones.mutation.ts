import { gql } from "@apollo/client";

export const CREAR_TRANSACCION = gql`
  mutation CrearTransaccion(
    $valor: Int!
    $descripcion: String!
    $tipo: TipoTransaccion!
    $fecha: String!
    $cuentaId: Int!
    $categoriaId: Int!
  ) {
    crearTransaccion(
      valor: $valor
      descripcion: $descripcion
      tipo: $tipo
      fecha: $fecha
      cuentaId: $cuentaId
      categoriaId: $categoriaId
    ) {
      id
      valor
      descripcion
      tipo
      fecha
      usuario
      cuenta
      categoria
    }
  }
`;

export const EDITAR_TRANSACCION = gql`
  mutation EditarTransaccion(
    $id: Int!
    $valor: Int!
    $descripcion: String
    $tipo: TipoTransaccion!
    $fecha: String
    $cuentaId: Int!
    $categoriaId: Int!
  ) {
    modificarTransaccion(
      id: $id
      valor: $valor
      descripcion: $descripcion
      tipo: $tipo
      fecha: $fecha
      cuentaId: $cuentaId
      categoriaId: $categoriaId
    ) {
      id
      valor
      descripcion
      tipo
      fecha
      cuenta {
        id
      }
      categoria {
        id
      }
    }
  }
`;

export const ELIMINAR_TRANSACCION = gql`
  mutation EliminarTransaccion($id: Int!) {
    eliminarTransaccion(id: $id) {
      id
    }
  }
`;
