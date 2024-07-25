import { DocumentNode, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import { revalidatePathData } from "@/components/actions";

export type Tipo = "ingreso" | "egreso";

interface FormValue {
  id?: number | string;
  nombre: string;
  tipo: Tipo;
}

interface Props {
  id?: number | string;
  nombre?: string;
  tipo?: Tipo;
  gqlMutation: DocumentNode;
}

export default function useHandleCategoria({
  id,
  nombre = "",
  tipo = "ingreso",
  gqlMutation,
}: Props) {
  const [handleCategoria, { error }] = useMutation(gqlMutation);

  const [formValues, setFormValues] = useState<FormValue>({
    nombre,
    tipo,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleNombreChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length > 0) setErrorMessage("");
    setFormValues({
      ...formValues,
      nombre: event.target.value,
    });
  }

  function handleTipoChange(value: string) {
    setFormValues({
      ...formValues,
      tipo: value as Tipo,
    });
  }

  async function guardarCategoria() {
    if (!formValues.nombre) {
      setErrorMessage("El nombre es obligatorio");

      return;
    }

    const finalFormValues = {
      ...formValues,
    };

    if (id) {
      finalFormValues.id = id;
    }

    try {
      await handleCategoria({
        variables: finalFormValues,
      });
      revalidatePathData({ path: "/categorias" });

      if (!id) setFormValues({ nombre: "", tipo: "ingreso" });

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
    handleTipoChange,
    guardarCategoria,
  };
}
