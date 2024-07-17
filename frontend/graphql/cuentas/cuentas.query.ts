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

export const SALDO_CUENTA = gql`
  query SaldoCuenta($id: Int!) {
    saldoCuenta(id: $id)
  }
`;
