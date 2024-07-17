import { formatearComoPesosColombianos } from "../utils";

import { SALDO_CUENTA } from "@/graphql/cuentas/cuentas.query";
import { getClient } from "@/graphql/lib/apollorClient";

async function getSaldoCuenta(id: number) {
  try {
    const { data } = await getClient().query({
      query: SALDO_CUENTA,
      variables: {
        id,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

interface Props {
  id: number;
}

export default async function SaldoCuenta({ id }: Props) {
  const { saldoCuenta } = await getSaldoCuenta(id);

  return (
    <div>
      <span>Saldo: {formatearComoPesosColombianos(saldoCuenta) ?? 0}</span>
    </div>
  );
}
