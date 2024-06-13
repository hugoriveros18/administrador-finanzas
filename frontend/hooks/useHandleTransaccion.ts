import { useMutation, useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useEffect, useMemo, useState } from "react";
import { CalendarDate } from "@internationalized/date";

import { Tipo } from "./useHandleCategoria";

import { revalidatePathData } from "@/components/actions";
import {
  convertStringToCalendarDate,
  getCalendarDate,
} from "@/components/utils";
import { LISTA_CATEGORIAS } from "@/graphql/categorias/categorias.query";

interface FormValue {
  id?: number;
  valor: number;
  descripcion: string;
  fecha: CalendarDate | string;
  cuentaId: number;
  categoriaId: number;
}

interface Props {
  id?: number;
  valor?: number;
  descripcion?: string;
  fecha?: CalendarDate | string;
  cuentaId?: number;
  categoriaId?: number;
  gqlMutation: DocumentNode;
}

export default function useHandleTransaccion({
  id,
  valor = 0,
  descripcion = "",
  fecha = getCalendarDate(),
  cuentaId = 0,
  categoriaId = 0,
  gqlMutation,
}: Props) {
  const [handleTransaccion, { error }] = useMutation(gqlMutation);
  const { data: categoriasData } = useQuery(LISTA_CATEGORIAS);

  const [tipoCategoria, setTipoCategoria] = useState<Tipo>("ingreso");

  const [formValues, setFormValues] = useState<FormValue>({
    valor,
    descripcion,
    fecha:
      typeof fecha === "string" ? convertStringToCalendarDate(fecha) : fecha,
    cuentaId,
    categoriaId,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const listaActualDeCategorias = useMemo(() => {
    if (categoriasData) {
      return tipoCategoria === "ingreso"
        ? categoriasData.listaCategorias.ingreso
        : categoriasData.listaCategorias.egreso;
    }

    return [];
  }, [categoriasData, tipoCategoria]);

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

  function handleCuentaChange(cuentaId: number) {
    setFormValues({
      ...formValues,
      cuentaId,
    });
  }

  function handleCategoriaChange(categoriaId: number) {
    setFormValues({
      ...formValues,
      categoriaId,
    });
  }
  function actualizarTipoCategoria(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setTipoCategoria(event.target.value as Tipo);
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

      return true;
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    if (categoriaId > 0 && categoriasData) {
      const categoria = categoriasData.listaCategorias.ingreso.find(
        (categoria: any) => categoria.id === categoriaId,
      );

      if (categoria) {
        setTipoCategoria("ingreso");
      } else {
        setTipoCategoria("egreso");
      }
    }
  }, [categoriaId, categoriasData]);
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
    tipoCategoria,
    listaActualDeCategorias,
    handleValorChange,
    handleDescripcionChange,
    handleFechaChange,
    handleCuentaChange,
    handleCategoriaChange,
    actualizarTipoCategoria,
    guardarTransaccion,
  };
}
