import { DocumentNode, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import { revalidatePathData } from "@/components/actions";
import { getRandomColor } from "@/components/utils";

export type TipoCuenta = "ahorros" | "efectivo" | "bolsillo";

interface FormValue {
  id?: number | string;
  nombre: string;
  tipoCuenta: TipoCuenta;
  numeroCuenta: string;
  color: string;
}

interface Props {
  id?: number | string;
  nombre?: string;
  tipoCuenta?: TipoCuenta;
  numeroCuenta?: string;
  color?: string;
  gqlMutation: DocumentNode;
}

export default function useHandleCuenta({
  id,
  nombre = "",
  tipoCuenta = "ahorros",
  numeroCuenta = "",
  color = "",
  gqlMutation,
}: Props) {
  const [handleCuenta, { error }] = useMutation(gqlMutation);

  const [formValues, setFormValues] = useState<FormValue>({
    nombre,
    tipoCuenta,
    numeroCuenta,
    color,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleNombreChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) setErrorMessage("");

    setFormValues({
      ...formValues,
      nombre: event.target.value,
    });
  }

  function handleNumeroCuentaChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setFormValues({
      ...formValues,
      numeroCuenta: event.target.value,
    });
  }

  function handleTipoChange(value: string) {
    setFormValues({
      ...formValues,
      tipoCuenta: value as TipoCuenta,
    });
  }

  async function guardarCuenta() {
    if (!formValues.nombre) {
      setErrorMessage("El nombre es obligatorio");

      return;
    }

    if (!formValues.numeroCuenta) {
      setErrorMessage("El número de cuenta es obligatorio");

      return;
    }

    const finalFormValues = {
      ...formValues,
    };

    if (id) {
      finalFormValues.id = id;
    }

    if (!formValues.color) {
      finalFormValues.color = getRandomColor();
    }

    try {
      await handleCuenta({
        variables: finalFormValues,
      });

      revalidatePathData({ path: "/cuentas" });

      return true;
    } catch (error) {
      return false;
    }
  }

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
    handleNombreChange,
    handleNumeroCuentaChange,
    handleTipoChange,
    guardarCuenta,
  };
}
