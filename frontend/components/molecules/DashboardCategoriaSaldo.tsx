import { useQuery } from "@apollo/client";

import { formatearComoPesosColombianos } from "../utils";

import { SALDO_CATEGORIA } from "@/graphql/categorias/categorias.query";

interface Props {
  id: number;
  year?: number;
  month?: number;
}

export default function DashboardCategoriaSaldo({ id, year, month }: Props) {
  const { data, loading, error } = useQuery(SALDO_CATEGORIA, {
    variables: {
      id,
      year: Number(year),
      month: Number(month),
    },
    pollInterval: 1000,
  });

  if (loading || !data) return <span>Cargando...</span>;
  if (error) return <p>Error</p>;

  return <span>{formatearComoPesosColombianos(data.saldoCategoria) ?? 0}</span>;
}
