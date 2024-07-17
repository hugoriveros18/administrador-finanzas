import { useQuery } from "@apollo/client";

import { formatearComoPesosColombianos } from "../utils";

import { SALDO_CUENTA } from "@/graphql/cuentas/cuentas.query";

interface Props {
  id: number;
}

export default function DashboardSaldoCuenta({ id }: Props) {
  const { data, loading, error } = useQuery(SALDO_CUENTA, {
    variables: {
      id,
    },
    pollInterval: 1000,
  });

  if (loading || !data) return <p>Cargado...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <p className="m-0">
        {" "}
        <span className="font-semibold">Saldo:</span>{" "}
        {formatearComoPesosColombianos(data.saldoCuenta) ?? 0}
      </p>
    </div>
  );
}
