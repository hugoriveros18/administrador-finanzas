import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import DashboardCategoriaSaldo from "./DashboardCategoriaSaldo";

import { Tipo } from "@/hooks/useHandleCategoria";

export interface Categoria {
  id: number;
  nombre: string;
  tipo: Tipo;
}

interface Props {
  ingreso: Categoria[];
  egreso: Categoria[];
  year?: number;
  month?: number;
}

export default function DashboardCategoriaList({
  ingreso,
  egreso,
  year,
  month,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-3">
      <Card className={`bg-transparent`} radius="none" shadow="sm">
        <CardHeader className="pb-0">
          <h3 className="w-full font-semibold text-green-950 text-center">
            Ingresos
          </h3>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-1 list-none p-0">
            {ingreso.map((categoria) => (
              <>
                <li
                  key={categoria.id}
                  className="w-full flex justify-between gap-3"
                >
                  <span className="text-sm font-semibold">
                    {categoria.nombre}
                  </span>
                  <DashboardCategoriaSaldo
                    id={categoria.id}
                    month={month}
                    year={year}
                  />
                </li>
                <Divider className="bg-blueCharcoal" />
              </>
            ))}
          </ul>
        </CardBody>
      </Card>
      <Card className={`bg-transparent`} radius="none" shadow="sm">
        <CardHeader className="pb-0">
          <h3 className="w-full font-semibold text-red-700 text-center">
            Egresos
          </h3>
        </CardHeader>
        <CardBody>
          <ul className="flex flex-col gap-1 list-none p-0">
            {egreso.map((categoria) => (
              <>
                <li
                  key={categoria.id}
                  className="w-full flex justify-between gap-3"
                >
                  <span className="text-sm font-semibold">
                    {categoria.nombre}
                  </span>
                  <DashboardCategoriaSaldo
                    id={categoria.id}
                    month={month}
                    year={year}
                  />
                </li>
                <Divider className="bg-blueCharcoal" />
              </>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
