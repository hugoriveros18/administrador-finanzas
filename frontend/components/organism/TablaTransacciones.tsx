"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";

import { tablaTransaccionesColumnas } from "../utils";
import BotonCrearTransaccion from "../atoms/BotonCrearTransaccion";

import useHandleTablaTransacciones from "@/hooks/useHandleTablaTransacciones";

export interface TableProps {
  year?: string;
  month?: string;
  disableActions?: boolean;
  onSuccessfulMutation?: () => void;
}

export default function TablaTransacciones({
  year,
  month,
  disableActions,
  onSuccessfulMutation,
}: TableProps) {
  const {
    data,
    error,
    loading,
    registrosPorPagina,
    page,
    renderCell,
    handleValuesUpdate,
    handlePageChange,
    handleRegistrosPorPaginaChange,
  } = useHandleTablaTransacciones({ year, month, onSuccessfulMutation });

  if (loading || !data) return <p>Cargando...</p>;
  if (error) return <p>Error...</p>;

  const { transacciones, totalPaginas, totalTransacciones } =
    data.listaTransacciones;

  return (
    <div className="w-full">
      <div className="w-full flex justify-end mb-3">
        <BotonCrearTransaccion onSuccessfulMutation={handleValuesUpdate} />
      </div>
      <div className="w-full flex justify-between mb-4">
        <p>
          <span className="font-semibold mr-1">{totalTransacciones}</span>
          Transacciones encontradas
        </p>
        <p>
          Registros por página:
          <select
            className="ml-2"
            value={registrosPorPagina}
            onChange={handleRegistrosPorPaginaChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </p>
      </div>
      <Table
        isStriped
        bottomContent={
          <Pagination
            isCompact
            showControls
            showShadow
            classNames={{
              base: "flex justify-center",
            }}
            color="secondary"
            page={page}
            total={totalPaginas}
            onChange={handlePageChange}
          />
        }
      >
        <TableHeader
          columns={
            disableActions
              ? tablaTransaccionesColumnas.slice(0, -1)
              : tablaTransaccionesColumnas
          }
        >
          {(column) => (
            <TableColumn key={column.key} className="text-sm">
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={transacciones}>
          {(item: any) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey, disableActions)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
