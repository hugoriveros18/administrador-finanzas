import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import DashboardSaldoCuenta from "../atoms/DashboardSaldoCuenta";

import { TipoCuenta } from "@/hooks/useHandleCuenta";

interface CuentaItemProps {
  id: number;
  nombre: string;
  numeroCuenta: string;
  tipoCuenta: TipoCuenta;
  color: string;
}

const calcTipoColor = (tipoCuenta: TipoCuenta) => {
  switch (tipoCuenta) {
    case "ahorros":
      return "bg-green-600";
    case "efectivo":
      return "bg-yellow-600";
    case "bolsillo":
      return "bg-blue-600";
  }
};

export default function DashboardCuentaItem({ ...cuenta }: CuentaItemProps) {
  return (
    <Card
      className={`bg-transparent`}
      radius="none"
      shadow="sm"
      style={{
        border: `solid 3px ${cuenta.color}`,
      }}
    >
      <CardBody>
        <div className="w-full">
          <div className="flex justify-between gap-2">
            <h3 className="font-bold text-sm">{cuenta.nombre}</h3>
            <div className="flex">
              <p
                className={`text-xs font-semibold text-white p-1 rounded-sm ${calcTipoColor(cuenta.tipoCuenta)}`}
              >
                {cuenta.tipoCuenta}
              </p>
            </div>
          </div>
        </div>
      </CardBody>
      <Divider className="bg-blueCharcoal" />
      <CardFooter>
        <DashboardSaldoCuenta id={cuenta.id} />
      </CardFooter>
    </Card>
  );
}
