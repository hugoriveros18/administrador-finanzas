import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

import { formatearComoPesosColombianos } from "../utils";

type TipoDato = "ingreso" | "egreso" | "saldo" | "disponible";

interface Props {
  title: string;
  value: number;
  tipoDato: TipoDato;
}

export default function SummaryCard({ title, value, tipoDato }: Props) {
  const calcTitleColor = (tipoDato: TipoDato) => {
    switch (tipoDato) {
      case "ingreso":
        return "text-green-600";
      case "egreso":
        return "text-red-600";
      case "saldo":
        return "text-blue-600";
      case "disponible":
        return "text-yellow-600";
    }
  };

  return (
    <Card className={`bg-transparent min-w-[150px]`} shadow="sm">
      <CardBody>
        <h4 className={`mb-2 font-bold ${calcTitleColor(tipoDato)}`}>
          {title}
        </h4>
        <Divider className="bg-blueCharcoal" />
        <p
          className={`mt-2 ${tipoDato === "disponible" ? "font-semibold" : undefined}`}
        >
          {formatearComoPesosColombianos(value)}
        </p>
      </CardBody>
    </Card>
  );
}
