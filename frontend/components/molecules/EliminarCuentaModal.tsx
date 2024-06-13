"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from "@nextui-org/modal";

import { TrashItemIcon } from "../atoms/Icons";

import { CuentaItemProps } from "./CuentaItem";

import useEliminarRegistro from "@/hooks/useEliminarRegistro";
import { ELIMINAR_CUENTA } from "@/graphql/cuentas/cuentas.mutation";

export default function EliminarCuentaModal({
  id,
  nombre,
  tipoCuenta,
}: CuentaItemProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    eliminar: eliminarCuenta,
    errorMessage,
    handleErrorMessage,
  } = useEliminarRegistro({
    id,
    gqlMutation: ELIMINAR_CUENTA,
    pathToValidate: "/cuentas",
  });

  return (
    <>
      <Button
        isIconOnly
        className="bg-transparent text-red-500 min-w-[auto] min-h-[auto] w-[auto] h-[auto]"
        radius="none"
        onPress={onOpen}
      >
        <TrashItemIcon />
      </Button>
      <Modal
        classNames={{
          base: "bg-white",
          header: "text-black",
        }}
        isOpen={isOpen}
        placement="center"
        size="sm"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader />
              <ModalBody>
                <h4 className="text-black">
                  ¿Estás seguro que deseas eliminar la cuenta{" "}
                  <span className="font-semibold">{nombre}</span> de tipo{" "}
                  <span className="font-semibold capitalize">{tipoCuenta}</span>
                  ?
                </h4>
                {errorMessage && (
                  <p className="text-redVerminton font-semibold mt-1">
                    *{errorMessage}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  onPress={() => {
                    onClose();
                    handleErrorMessage("");
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    const result = await eliminarCuenta();

                    if (result) {
                      onClose();
                    }
                  }}
                >
                  Eliminar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
