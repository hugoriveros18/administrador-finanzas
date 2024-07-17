import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Chip } from "@nextui-org/chip";

import BotonEditarTransaccion from "@/components/atoms/BotonEditarTransaccion";
import EliminarTransaccionModal from "@/components/molecules/EliminarTransaccionModal";
import {
  formatearComoPesosColombianos,
  formatoFecha,
} from "@/components/utils";
import { LISTA_TRANSACCIONES } from "@/graphql/transacciones/transacciones.query";

export interface HandleTablaProps {
  year?: string;
  month?: string;
  onSuccessfulMutation?: () => void;
}

export default function useHandleTablaTransacciones({
  year,
  month,
  onSuccessfulMutation,
}: HandleTablaProps) {
  const [registrosPorPagina, setRegistrosPorPagina] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const { data, loading, error, refetch } = useQuery(LISTA_TRANSACCIONES, {
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
        case "valor":
          return (
            <span className="font-semibold">
              {formatearComoPesosColombianos(item.valor)}
            </span>
          );
        case "descripcion":
          return <span>{item.descripcion}</span>;
        case "tipo":
          return (
            <Chip
              className="capitalize"
              color={item.tipo === "ingreso" ? "success" : "danger"}
              size="md"
              variant="flat"
            >
              {item.tipo}
            </Chip>
          );
        case "categoria":
          return <span>{item.categoria.nombre}</span>;
        case "cuenta":
          return (
            <Chip
              className="capitalize border-none gap-1"
              size="sm"
              startContent={
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: item.cuenta.color,
                  }}
                />
              }
              variant="dot"
            >
              {item.cuenta.nombre}
            </Chip>
          );
        case "fecha":
          return <span>{formatoFecha(item.fecha)}</span>;
        case "acciones":
          if (disableActions) return null;

          return (
            <div className="flex gap-2">
              <BotonEditarTransaccion
                transaccion={{
                  id: item.id,
                  valor: item.valor,
                  descripcion: item.descripcion,
                  tipo: item.tipo,
                  fecha: item.fecha,
                  cuentaId: item.cuenta.id,
                  categoriaId: item.categoria.id,
                }}
                onSuccessfulMutation={refetch}
              />
              <EliminarTransaccionModal
                categoria={item.categoria.nombre}
                cuenta={item.cuenta.nombre}
                descripcion={item.descripcion}
                fecha={item.fecha}
                id={item.id}
                tipo={item.tipo}
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
