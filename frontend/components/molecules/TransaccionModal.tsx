"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { DatePicker } from "@nextui-org/date-picker";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { DocumentNode } from "graphql";
import { Button } from "@nextui-org/button";
import { CalendarDate } from "@internationalized/date";

import { convertStringToCalendarDate, getCalendarDate } from "../utils";

import useHandleTransaccion from "@/hooks/useHandleTransaccion";

interface Transaccion {
  id?: number;
  valor: number;
  descripcion: string;
  fecha: CalendarDate | string;
  cuentaId: number;
  categoriaId: number;
}

interface Props {
  transaccion?: Transaccion;
  modalTrigger: (onOpen: () => void) => JSX.Element;
  tituloModal: string;
  botonConfirmacion: string;
  gqlMutation: DocumentNode;
}

const DEFAULT_TRANSACCION: Transaccion = {
  valor: 0,
  descripcion: "",
  fecha: getCalendarDate(),
  cuentaId: 0,
  categoriaId: 0,
};

export default function TransaccionModal({
  transaccion = DEFAULT_TRANSACCION,
  modalTrigger,
  tituloModal,
  botonConfirmacion,
  gqlMutation,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    formValues: { descripcion, fecha, cuentaId, categoriaId },
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
  } = useHandleTransaccion({
    gqlMutation,
    ...transaccion,
  });

  return (
    <>
      {modalTrigger(onOpen)}
      <Modal
        classNames={{
          base: "bg-white",
          header: "text-black",
        }}
        isDismissable={false}
        isOpen={isOpen}
        placement="center"
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="">
                <h4>{tituloModal}</h4>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  classNames={{
                    input: "group-data-[has-value=true]:text-black",
                    inputWrapper:
                      "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                    label: "group-data-[filled-within=true]:text-black",
                  }}
                  color="default"
                  label="Valor"
                  labelPlacement="outside"
                  placeholder="25000"
                  radius="none"
                  size="md"
                  type="number"
                  onChange={handleValorChange}
                />
                <Textarea
                  isRequired
                  classNames={{
                    input: "group-data-[has-value=true]:text-black",
                    inputWrapper:
                      "bg-trasparent hover:bg-trasparent border-[#3f3f46] border-[0.5px] text-black data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent",
                    label: "group-data-[filled-within=true]:text-black",
                  }}
                  label="Descripción"
                  labelPlacement="outside"
                  placeholder="Pago de servicios públicos"
                  radius="none"
                  size="md"
                  value={descripcion}
                  onChange={handleDescripcionChange}
                />
                <DatePicker
                  isRequired
                  showMonthAndYearPickers
                  label="Fecha"
                  labelPlacement="outside"
                  radius="none"
                  size="md"
                  value={
                    typeof fecha === "string"
                      ? convertStringToCalendarDate(fecha)
                      : fecha
                  }
                  onChange={handleFechaChange}
                />
                <div className="w-full flex gap-3">
                  <Select
                    isRequired
                    label="Tipo de Categoria"
                    labelPlacement="outside"
                    selectedKeys={[tipoCategoria]}
                    onChange={actualizarTipoCategoria}
                    classNames={{
                      value: "capitalize",
                    }}
                  >
                    {["ingreso", "egreso"].map((tipo) => (
                      <SelectItem
                        key={tipo}
                        className="capitalize"
                        value={tipo}
                      >
                        {tipo}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {errorMessage && (
                  <p className="text-redVerminton font-semibold">
                    *{errorMessage}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="success"
                  onPress={async () => {
                    const result = await guardarTransaccion();

                    if (result) {
                      onClose();
                    }
                  }}
                >
                  {botonConfirmacion}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
