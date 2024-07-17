import { useMutation, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useMemo, useState } from "react";
import { CalendarDate } from "@internationalized/date";

import { TipoCuenta } from "./useHandleCuenta";

import {
  revalidateInterestPathsData,
  revalidatePathData,
} from "@/components/actions";
import {
  convertStringToCalendarDate,
  getCalendarDate,
} from "@/components/utils";
import { LISTA_CUENTAS } from "@/graphql/cuentas/cuentas.query";

type TipoCuentaMovimiento = "origen" | "destino";

interface FormValue {
  id?: number;
  cuentaOrigen: number;
  cuentaDestino: number;
  valor: number;
  descripcion: string;
  fecha: CalendarDate | string;
}

interface Props {
  id?: number;
  cuentaOrigen?: number;
  cuentaDestino?: number;
  valor?: number;
  descripcion?: string;
  fecha?: CalendarDate | string;
  gqlMutation: DocumentNode;
}

export default function useHandleMovimiento({
  id,
  cuentaOrigen = 0,
  cuentaDestino = 0,
  valor = 0,
  descripcion = "",
  fecha = getCalendarDate(),
  gqlMutation,
}: Props) {
  // QUERIES
  const [handleMovimiento, { error }] = useMutation(gqlMutation);
  const { data: cuentasData } = useQuery(LISTA_CUENTAS);

  // STATES
  const [tipoCuentaOrigen, setTipoCuentaOrigen] = useState<TipoCuenta>(
    "" as TipoCuenta,
  );
  const [tipoCuentaDestino, setTipoCuentaDestino] = useState<TipoCuenta>(
    "" as TipoCuenta,
  );
  const [formValues, setFormValues] = useState<FormValue>({
    cuentaOrigen,
    cuentaDestino,
    valor,
    descripcion,
    fecha:
      typeof fecha === "string" ? convertStringToCalendarDate(fecha) : fecha,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  // MEMO
  const listaActualDeCuentasOrigen = useMemo(() => {
    if (cuentasData && tipoCuentaOrigen) {
      return cuentasData.listaCuentas.filter(
        (cuenta: any) => cuenta.tipoCuenta === tipoCuentaOrigen,
      );
    }

    return [];
  }, [cuentasData, tipoCuentaOrigen]);
  const listaActualDeCuentasDestino = useMemo(() => {
    if (cuentasData && tipoCuentaDestino) {
      return cuentasData.listaCuentas.filter(
        (cuenta: any) => cuenta.tipoCuenta === tipoCuentaDestino,
      );
    }

    return [];
  }, [cuentasData, tipoCuentaDestino]);

  // FUNCTIONS
  function handleValorChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.valueAsNumber > 0) setErrorMessage("");

    setFormValues({
      ...formValues,
      valor: event.target.valueAsNumber,
    });
  }

  function handleDescripcionChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) setErrorMessage("");

    setFormValues({
      ...formValues,
      descripcion: event.target.value,
    });
  }

  function handleFechaChange(value: CalendarDate) {
    setFormValues({
      ...formValues,
      fecha: value,
    });
  }

  function handleCuentaChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    tipo: TipoCuentaMovimiento,
  ) {
    const cuentaId = Number(event.target.value);

    if (tipo === "origen") {
      setFormValues({
        ...formValues,
        cuentaOrigen: cuentaId,
      });
    } else {
      setFormValues({
        ...formValues,
        cuentaDestino: cuentaId,
      });
    }
  }

  function actualizarTipoCuenta(
    event: React.ChangeEvent<HTMLSelectElement>,
    tipo: TipoCuentaMovimiento,
  ) {
    if (tipo === "origen") {
      setTipoCuentaOrigen(event.target.value as TipoCuenta);
      setFormValues({
        ...formValues,
        cuentaOrigen: 0,
      });
    } else {
      setTipoCuentaDestino(event.target.value as TipoCuenta);
      setFormValues({
        ...formValues,
        cuentaDestino: 0,
      });
    }
  }

  async function guardarTransaccion() {
    if (formValues.valor === 0 || Number.isNaN(formValues.valor)) {
      setErrorMessage("El valor es obligatorio y debe ser mayor a 0");

      return;
    }

    if (formValues.descripcion === "") {
      setErrorMessage("La descripción es obligatoria");

      return;
    }

    if (formValues.cuentaOrigen === 0) {
      setErrorMessage("La cuenta de origen es obligatoria");

      return;
    }

    if (formValues.cuentaDestino === 0) {
      setErrorMessage("La cuenta de destino es obligatoria");

      return;
    }

    if (formValues.cuentaOrigen === formValues.cuentaDestino) {
      setErrorMessage("Las cuentas de origen y destino no pueden ser iguales");

      return;
    }

    const finalFormValues = {
      ...formValues,
      fecha: formValues.fecha.toString(),
    };

    if (id) {
      finalFormValues.id = id;
    }

    try {
      await handleMovimiento({
        variables: finalFormValues,
      });

      revalidatePathData({ path: "/movimientos" });
      revalidateInterestPathsData();

      return true;
    } catch (error) {
      return false;
    }
  }

  // EFFECTS
  useEffect(() => {
    if (cuentaOrigen > 0 && cuentasData) {
      const cuenta = cuentasData.listaCuentas.find(
        (cuenta: any) => cuenta.id === cuentaOrigen,
      );

      if (cuenta) {
        setTipoCuentaOrigen(cuenta.tipoCuenta);
      }
    }
  }, [cuentaOrigen, cuentasData]);
  useEffect(() => {
    if (cuentaDestino > 0 && cuentasData) {
      const cuenta = cuentasData.listaCuentas.find(
        (cuenta: any) => cuenta.id === cuentaDestino,
      );

      if (cuenta) {
        setTipoCuentaDestino(cuenta.tipoCuenta);
      }
    }
  }, [cuentaDestino, cuentasData]);
  useEffect(() => {
    if (error) {
      setErrorMessage(
        error?.graphQLErrors?.[0]?.message ||
          "Se produjo un error, intenta de nuevo",
      );
    }
  }, [error]);

  return {
    formValues,
    errorMessage,
    tipoCuentaOrigen,
    tipoCuentaDestino,
    listaActualDeCuentasOrigen,
    listaActualDeCuentasDestino,
    handleValorChange,
    handleDescripcionChange,
    handleFechaChange,
    handleCuentaChange,
    actualizarTipoCuenta,
    guardarTransaccion,
  };
}
