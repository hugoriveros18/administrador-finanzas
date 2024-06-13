import { gql } from "@apollo/client";

export const LISTA_CUENTAS = gql`
  query ListaCuentas {
    listaCuentas {
      id
      nombre
      tipoCuenta
      numeroCuenta
      color
    }
  }
`;
