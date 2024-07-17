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
import { Tipo } from "@/hooks/useHandleCategoria";

interface Transaccion {
  id?: number;
  valor: number;
  descripcion: string;
  tipo: Tipo;
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
  onSuccessfulMutation?: () => void;
}

const DEFAULT_TRANSACCION: Transaccion = {
  valor: 0,
  descripcion: "",
  tipo: "ingreso",
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
  onSuccessfulMutation,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    formValues: { valor, descripcion, tipo, fecha, cuentaId, categoriaId },
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
              <ModalHeader>
                <h4>{tituloModal}</h4>
              </ModalHeader>
              <ModalBody className="gap-4">
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
                  value={`${valor}`}
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
                <div className="w-full flex gap-3 p-3 border-solid border-[rgba(0,0,0,0.5)] border-[1px]">
                  <Select
                    isRequired
                    classNames={{
                      value: "capitalize",
                    }}
                    label="Tipo Transacción"
                    labelPlacement="outside"
                    placeholder="Selecciona una opción"
                    radius="none"
                    selectedKeys={[tipo]}
                    onChange={actualizarTipoCategoria}
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
                  <Select
                    isRequired
                    classNames={{
                      value: "capitalize",
                    }}
                    label="Categoria"
                    labelPlacement="outside"
                    placeholder="Transporte"
                    radius="none"
                    selectedKeys={[
                      categoriaId !== 0 ? categoriaId.toString() : "",
                    ]}
                    onChange={handleCategoriaChange}
                  >
                    {listaActualDeCategorias.map((ctg: any) => (
                      <SelectItem
                        key={ctg.id}
                        className="capitalize"
                        value={ctg.id}
                      >
                        {ctg.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="w-full flex gap-3 p-3 border-solid border-[rgba(0,0,0,0.5)] border-[1px]">
                  <Select
                    isRequired
                    classNames={{
                      value: "capitalize",
                    }}
                    label="Tipo Cuenta"
                    labelPlacement="outside"
                    placeholder="Selecciona una opción"
                    radius="none"
                    selectedKeys={[tipoCuenta]}
                    onChange={actualizarTipoCuenta}
                  >
                    {["ahorros", "efectivo", "bolsillo"].map((tipo) => (
                      <SelectItem
                        key={tipo}
                        className="capitalize"
                        value={tipo}
                      >
                        {tipo}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    classNames={{
                      value: "capitalize",
                    }}
                    label="Nombre"
                    labelPlacement="outside"
                    placeholder="Davivienda"
                    radius="none"
                    selectedKeys={[cuentaId !== 0 ? cuentaId.toString() : ""]}
                    onChange={handleCuentaChange}
                  >
                    {listaActualDeCuentas.map((ctg: any) => (
                      <SelectItem
                        key={ctg.id}
                        className="capitalize"
                        value={ctg.id}
                      >
                        {ctg.nombre}
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
                      onSuccessfulMutation && onSuccessfulMutation();
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
