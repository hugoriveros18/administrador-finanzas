"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";

import { TrashItemIcon } from "../atoms/Icons";
import { formatearComoPesosColombianos } from "../utils";

import useEliminarRegistro from "@/hooks/useEliminarRegistro";
import { ELIMINAR_MOVIMIENTO } from "@/graphql/movimientos/movimientos.mutation";

interface Props {
  id: number;
  cuentaOrigen: string;
  cuentaDestino: string;
  valor: number;
  descripcion: string;
  fecha: string;
  onSuccessfulMutation?: () => void;
}

export default function EliminarMovimientoModal({
  id,
  cuentaOrigen,
  cuentaDestino,
  valor,
  descripcion,
  fecha,
  onSuccessfulMutation,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    eliminar: eliminarMovimiento,
    errorMessage,
    handleErrorMessage,
  } = useEliminarRegistro({
    id,
    gqlMutation: ELIMINAR_MOVIMIENTO,
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
              <ModalBody>
                <div>
                  <p className="text-black font-bold">
                    ¿Estás seguro de eliminar el siguiente movimiento?
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-semibold">Cuenta Origen:</span>{" "}
                    {cuentaOrigen}
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-semibold">Cuenta Destino:</span>{" "}
                    {cuentaDestino}
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-semibold">Valor:</span>{" "}
                    {formatearComoPesosColombianos(valor)}
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-semibold">Descripción:</span>{" "}
                    {descripcion}
                  </p>
                  <p className="text-black mt-1">
                    <span className="font-semibold">Fecha:</span> {fecha}
                  </p>
                </div>
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
                    const result = await eliminarMovimiento();

                    if (result) {
                      onClose();
                      onSuccessfulMutation && onSuccessfulMutation();
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
