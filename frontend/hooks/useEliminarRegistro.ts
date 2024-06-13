import { DocumentNode, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

import { revalidatePathData } from "@/components/actions";

interface Props {
  id: number | string;
  gqlMutation: DocumentNode;
  pathToValidate?: string;
}

export default function useEliminarRegistro({
  id,
  gqlMutation,
  pathToValidate,
}: Props) {
  const [eliminarRegistro, { error }] = useMutation(gqlMutation);
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function eliminar() {
    try {
      await eliminarRegistro({
        variables: {
          id,
        },
      });
      if (pathToValidate) {
        revalidatePathData({ path: pathToValidate });
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  function handleErrorMessage(input: string) {
    setErrorMessage(input);
  }

  useEffect(() => {
    if (error) {
      setErrorMessage(
        error?.graphQLErrors?.[0]?.message ||
          "Error al eliminar registro, intenta de nuevo",
      );
    }
  }, [error]);

  return { eliminar, handleErrorMessage, errorMessage };
}
