import { gql } from "@apollo/client";

export const CREAR_CATEGORIA = gql`
  mutation CrearCategoria($nombre: String!, $tipo: TipoTransaccion!) {
    crearCategoria(nombre: $nombre, tipo: $tipo) {
      id
      nombre
      tipo
    }
  }
`;

export const ELIMINAR_CATEGORIA = gql`
  mutation EliminarCategoria($id: Int!) {
    eliminarCategoria(id: $id) {
      id
      nombre
      tipo
    }
  }
`;

export const EDITAR_CATEGORIA = gql`
  mutation EditarCategoria($id: Int!, $nombre: String) {
    modificarCategoria(id: $id, nombre: $nombre) {
      id
      nombre
      tipo
    }
  }
`;
