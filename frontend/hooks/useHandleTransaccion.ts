import { useMutation, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useMemo, useState } from "react";
import { CalendarDate } from "@internationalized/date";

import { Tipo } from "./useHandleCategoria";
import { TipoCuenta } from "./useHandleCuenta";

import {
  revalidateInterestPathsData,
  revalidatePathData,
} from "@/components/actions";
import {
  convertStringToCalendarDate,
  getCalendarDate,
} from "@/components/utils";
import { LISTA_CATEGORIAS } from "@/graphql/categorias/categorias.query";
import { LISTA_CUENTAS } from "@/graphql/cuentas/cuentas.query";

interface FormValue {
  id?: number;
  valor: number;
  descripcion: string;
  tipo: Tipo;
  fecha: CalendarDate | string;
  cuentaId: number;
  categoriaId: number;
}

interface Props {
  id?: number;
  valor?: number;
  descripcion?: string;
  tipo: Tipo;
  fecha?: CalendarDate | string;
  cuentaId?: number;
  categoriaId?: number;
  gqlMutation: DocumentNode;
}

export default function useHandleTransaccion({
  id,
  valor = 0,
  descripcion = "",
  tipo = "ingreso",
  fecha = getCalendarDate(),
  cuentaId = 0,
  categoriaId = 0,
  gqlMutation,
}: Props) {
  // QUERIES
  const [handleTransaccion, { error }] = useMutation(gqlMutation);
  const { data: categoriasData } = useQuery(LISTA_CATEGORIAS);
  const { data: cuentasData } = useQuery(LISTA_CUENTAS);

  // STATES
  const [tipoCuenta, setTipoCuenta] = useState<TipoCuenta>("" as TipoCuenta);
  const [formValues, setFormValues] = useState<FormValue>({
    valor,
    descripcion,
    tipo,
    fecha:
      typeof fecha === "string" ? convertStringToCalendarDate(fecha) : fecha,
    cuentaId,
    categoriaId,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  // MEMO
  const listaActualDeCategorias = useMemo(() => {
    if (categoriasData) {
      return formValues.tipo === "ingreso"
        ? categoriasData.listaCategorias.ingreso
        : categoriasData.listaCategorias.egreso;
    }

    return [];
  }, [categoriasData, formValues.tipo]);

  const listaActualDeCuentas = useMemo(() => {
    if (cuentasData && tipoCuenta) {
      return cuentasData.listaCuentas.filter(
        (cuenta: any) => cuenta.tipoCuenta === tipoCuenta,
      );
    }

    return [];
  }, [cuentasData, tipoCuenta]);

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

  function handleCuentaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const cuentaId = Number(event.target.value);

    setFormValues({
      ...formValues,
      cuentaId,
    });
  }

  function handleCategoriaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const categoriaId = Number(event.target.value);

    setFormValues({
      ...formValues,
      categoriaId,
    });
  }

  function actualizarTipoCategoria(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    if (formValues.tipo === (event.target.value as Tipo) || !event.target.value)
      return;

    setFormValues({
      ...formValues,
      tipo: event.target.value as Tipo,
      categoriaId: 0,
    });
  }

  function actualizarTipoCuenta(event: React.ChangeEvent<HTMLSelectElement>) {
    setTipoCuenta(event.target.value as TipoCuenta);
    setFormValues({
      ...formValues,
      cuentaId: 0,
    });
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

    if (formValues.cuentaId === 0) {
      setErrorMessage("La cuenta es obligatoria");

      return;
    }

    if (formValues.categoriaId === 0) {
      setErrorMessage("La categoría es obligatoria");

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
      await handleTransaccion({
        variables: finalFormValues,
      });

      revalidatePathData({ path: "/transacciones" });
      revalidateInterestPathsData();

      return true;
    } catch (error) {
      return false;
    }
  }

  // EFFECTS
  // useEffect(() => {
  //   if (categoriaId > 0 && categoriasData) {
  //     const categoria = categoriasData.listaCategorias.ingreso.find(
  //       (categoria: any) => categoria.id === categoriaId,
  //     );

  //     if (categoria) {
  //       setTipoCategoria("ingreso");
  //     } else {
  //       setTipoCategoria("egreso");
  //     }
  //   }
  // }, [categoriaId, categoriasData]);
  useEffect(() => {
    if (cuentaId > 0 && cuentasData) {
      const cuenta = cuentasData.listaCuentas.find(
        (cuenta: any) => cuenta.id === cuentaId,
      );

      if (cuenta) {
        setTipoCuenta(cuenta.tipoCuenta);
      }
    }
  }, [cuentaId, cuentasData]);
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
    tipoCuenta,
    listaActualDeCategorias,
    listaActualDeCuentas,
    handleValorChange,
    handleDescripcionChange,
    handleFechaChange,
    handleCuentaChange,
    handleCategoriaChange,
    actualizarTipoCategoria,
    actualizarTipoCuenta,
    guardarTransaccion,
  };
}
