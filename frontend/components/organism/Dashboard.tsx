"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Select, SelectItem } from "@nextui-org/select";

import { getCurrentMonth, getCurrentYear, meses } from "../utils";
import SummaryCard from "../atoms/SummaryCard";
import DashboardCuentaItem from "../molecules/DashboardCuentaItem";
import DashboardCategoriaList from "../molecules/DashboardCategoriaList";
import BotonCrearCuenta from "../atoms/BotonCrearCuenta";
import BotonCrearCategoria from "../atoms/BotonCrearCategoria";

import TablaTransacciones from "./TablaTransacciones";
import TablaMovimientos from "./TablaMovimientos";

import { RESUMEN_FINANCIERO } from "@/graphql/usuario/usuario.query";

export default function Dashboard() {
  const [year, setYear] = useState<string>(getCurrentYear().toString());
  const [month, setMonth] = useState<string>(getCurrentMonth().toString());

  const { data, loading, error, refetch } = useQuery(RESUMEN_FINANCIERO, {
    variables: {
      year,
      month,
    },
  });

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };
  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [refetch]);

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const {
    resumenFinanciero,
    disponibleCuenta,
    activeYears,
    listaCuentas,
    listaCategorias,
  } = data;

  return (
    <div className="w-full">
      <header className="w-full flex justify-between">
        <div className="flex gap-4">
          <SummaryCard
            tipoDato="ingreso"
            title="Ingresos"
            value={resumenFinanciero.ingresos}
          />
          <SummaryCard
            tipoDato="egreso"
            title="Egresos"
            value={resumenFinanciero.egresos}
          />
          <SummaryCard
            tipoDato="saldo"
            title="Balance"
            value={resumenFinanciero.balance}
          />
          <SummaryCard
            tipoDato="disponible"
            title="Total Disponible"
            value={disponibleCuenta}
          />
        </div>
        <div className="flex gap-3">
          <Select
            className="w-[100px]"
            classNames={{
              value: "capitalize",
            }}
            label="Año"
            labelPlacement="inside"
            radius="none"
            selectedKeys={[year]}
            onChange={handleYearChange}
          >
            {activeYears.map((year: any) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </Select>
          <Select
            className="w-[150px]"
            classNames={{
              value: "capitalize",
            }}
            label="Mes"
            labelPlacement="inside"
            radius="none"
            selectedKeys={[month]}
            onChange={handleMonthChange}
          >
            {meses.map((mes: any) => (
              <SelectItem key={mes.id} value={mes.id}>
                {mes.nombre}
              </SelectItem>
            ))}
          </Select>
        </div>
      </header>
      <div className="w-full flex justify-between gap-8 mt-9">
        <div className="flex flex-col gap-10 w-[75%]">
          <TablaTransacciones
            disableActions
            month={month}
            year={year}
            onSuccessfulMutation={refetch}
          />
          <TablaMovimientos
            disableActions
            month={month}
            year={year}
            onSuccessfulMutation={refetch}
          />
        </div>
        <div className="flex flex-col gap-10 w-[25%]">
          <div className="flex flex-col gap-2">
            {listaCuentas.length > 0 ? (
              listaCuentas.map((cuenta: any) => (
                <DashboardCuentaItem key={cuenta.id} {...cuenta} />
              ))
            ) : (
              <div className="w-full p-3 flex flex-col items-center gap-2 border-solid border-[1px] border-black">
                <p className="text-sm font-semibold">
                  No se encontraron cuentas registradas
                </p>
                <BotonCrearCuenta onSuccessfulMutation={refetch} />
              </div>
            )}
          </div>
          <div className="w-full">
            {listaCategorias.count > 0 ? (
              <DashboardCategoriaList
                {...listaCategorias}
                month={month}
                year={year}
              />
            ) : (
              <div className="w-full p-3 flex flex-col items-center gap-2 border-solid border-[1px] border-black">
                <p className="text-sm font-semibold">
                  No se encontraron categorías registradas
                </p>
                <BotonCrearCategoria onSuccessfulMutation={refetch} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
