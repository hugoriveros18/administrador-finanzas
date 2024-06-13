import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import BotonEditarCuenta from "../atoms/BotonEditarCuenta";

import EliminarCuentaModal from "./EliminarCuentaModal";

import { TipoCuenta } from "@/hooks/useHandleCuenta";

export interface CuentaItemProps {
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

export default function CuentaItem({ ...cuenta }: CuentaItemProps) {
  return (
    <Card
      className={`bg-transparent min-w-[300px]`}
      shadow="sm"
      style={{
        border: `solid 3px ${cuenta.color}`,
      }}
    >
      <CardBody>
        <div className="w-full flex justify-between items-start gap-3">
          <div className="w-full">
            <h3 className="font-bold">{cuenta.nombre}</h3>
            <p className="text-sm opacity-50">{cuenta.numeroCuenta}</p>
            <div className="flex mt-1">
              <p
                className={`text-sm font-semibold text-white px-2 py-1 rounded-sm ${calcTipoColor(cuenta.tipoCuenta)}`}
              >
                {cuenta.tipoCuenta}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <BotonEditarCuenta {...cuenta} />
            <EliminarCuentaModal {...cuenta} />
          </div>
        </div>
      </CardBody>
      <Divider className="bg-blueCharcoal" />
      <CardFooter>
        <p>
          <span className="font-semibold">Disponible:</span> $0
        </p>
      </CardFooter>
    </Card>
  );
}
