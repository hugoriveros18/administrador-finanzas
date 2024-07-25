import { gql } from "@apollo/client";

export const GET_USUARIO_DATA = gql`
  query GetUsuarioData {
    usuario {
      nombre
      email
    }
  }
`;

export const RESUMEN_FINANCIERO = gql`
  query ResumenFinanciero($year: String!, $month: String!) {
    resumenFinanciero(year: $year, month: $month) {
      ingresos
      egresos
      balance
    }
    disponibleCuenta
    activeYears
    listaCuentas {
      id
      nombre
      tipoCuenta
      numeroCuenta
      color
    }
    listaCategorias {
      ingreso {
        id
        nombre
        tipo
      }
      egreso {
        id
        nombre
        tipo
      }
      count
    }
  }
`;
