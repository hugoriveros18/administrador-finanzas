import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Chip } from "@nextui-org/chip";

import { HandleTablaProps } from "./useHandleTablaTransacciones";

import {
  formatearComoPesosColombianos,
  formatoFecha,
} from "@/components/utils";
import { LISTA_MOVIMIENTOS } from "@/graphql/movimientos/movimientos.query";
import BotonEditarMovimiento from "@/components/atoms/BotonEditarMovimiento";
import EliminarMovimientoModal from "@/components/molecules/EliminarMovimientoModal";

export default function useHandleTablaMovimientos({
  year,
  month,
  onSuccessfulMutation,
}: HandleTablaProps) {
  const [registrosPorPagina, setRegistrosPorPagina] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data, loading, error, refetch } = useQuery(LISTA_MOVIMIENTOS, {
    variables: {
      pagina: page,
      itemsPorPagina: registrosPorPagina,
      year: Number(year),
      month: Number(month),
    },
  });

  const renderCell = useCallback(
    (item: any, key: any, disableActions?: boolean) => {
      switch (key) {
        case "cuentaOrigen":
          return (
            <Chip
              className="capitalize border-none gap-1"
              size="sm"
              startContent={
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: item.cuentaOrigen.color,
                  }}
                />
              }
              variant="dot"
            >
              {item.cuentaOrigen.nombre}
            </Chip>
          );
        case "cuentaDestino":
          return (
            <Chip
              className="capitalize border-none gap-1"
              size="sm"
              startContent={
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: item.cuentaDestino.color,
                  }}
                />
              }
              variant="dot"
            >
              {item.cuentaDestino.nombre}
            </Chip>
          );
        case "valor":
          return (
            <span className="font-semibold">
              {formatearComoPesosColombianos(item.valor)}
            </span>
          );
        case "descripcion":
          return <span>{item.descripcion}</span>;
        case "fecha":
          return <span>{formatoFecha(item.fecha)}</span>;
        case "acciones":
          if (disableActions) return null;

          return (
            <div className="flex gap-2">
              <BotonEditarMovimiento
                movimiento={{
                  id: item.id,
                  cuentaOrigen: item.cuentaOrigen.id,
                  cuentaDestino: item.cuentaDestino.id,
                  valor: item.valor,
                  descripcion: item.descripcion,
                  fecha: item.fecha,
                }}
                onSuccessfulMutation={refetch}
              />
              <EliminarMovimientoModal
                cuentaDestino={item.cuentaDestino.nombre}
                cuentaOrigen={item.cuentaOrigen.nombre}
                descripcion={item.descripcion}
                fecha={item.fecha}
                id={item.id}
                valor={item.valor}
                onSuccessfulMutation={refetch}
              />
            </div>
          );
        default:
          return null;
      }
    },
    [],
  );

  const handleValuesUpdate = () => {
    refetch();
    onSuccessfulMutation?.();
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleRegistrosPorPaginaChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setRegistrosPorPagina(Number(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [refetch]);

  return {
    data,
    error,
    loading,
    registrosPorPagina,
    page,
    renderCell,
    handleValuesUpdate,
    handlePageChange,
    handleRegistrosPorPaginaChange,
  };
}
