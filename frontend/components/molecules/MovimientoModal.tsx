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

import useHandleMovimiento from "@/hooks/useHandleMovimiento";

interface Movimiento {
  id?: number;
  cuentaOrigen: number;
  cuentaDestino: number;
  valor: number;
  descripcion: string;
  fecha: CalendarDate | string;
}

interface Props {
  movimiento?: Movimiento;
  modalTrigger: (onOpen: () => void) => JSX.Element;
  tituloModal: string;
  botonConfirmacion: string;
  gqlMutation: DocumentNode;
  onSuccessfulMutation?: () => void;
}

const DEFAULT_MOVIMIENTO: Movimiento = {
  cuentaOrigen: 0,
  cuentaDestino: 0,
  valor: 0,
  descripcion: "",
  fecha: getCalendarDate(),
};

export default function MovimientoModal({
  movimiento = DEFAULT_MOVIMIENTO,
  modalTrigger,
  tituloModal,
  botonConfirmacion,
  gqlMutation,
  onSuccessfulMutation,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    formValues: { cuentaOrigen, cuentaDestino, valor, descripcion, fecha },
    tipoCuentaOrigen,
    tipoCuentaDestino,
    listaActualDeCuentasOrigen,
    listaActualDeCuentasDestino,
    errorMessage,
    handleValorChange,
    handleDescripcionChange,
    handleFechaChange,
    handleCuentaChange,
    actualizarTipoCuenta,
    guardarTransaccion,
  } = useHandleMovimiento({
    gqlMutation,
    ...movimiento,
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
                <div className="w-full p-3 border-solid border-[rgba(0,0,0,0.5)] border-[1px]">
                  <h4 className="text-base font-semibold mb-2">
                    Cuenta Origen
                  </h4>
                  <div className="w-full flex gap-3">
                    <Select
                      isRequired
                      classNames={{
                        value: "capitalize",
                      }}
                      label="Tipo"
                      labelPlacement="inside"
                      placeholder="Selecciona una opción"
                      radius="none"
                      selectedKeys={[tipoCuentaOrigen]}
                      onChange={(e) => actualizarTipoCuenta(e, "origen")}
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
                      labelPlacement="inside"
                      placeholder="Davivienda"
                      radius="none"
                      selectedKeys={[
                        cuentaOrigen !== 0 ? cuentaOrigen.toString() : "",
                      ]}
                      onChange={(e) => handleCuentaChange(e, "origen")}
                    >
                      {listaActualDeCuentasOrigen.map((ctg: any) => (
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
                </div>
                <div className="w-full p-3 border-solid border-[rgba(0,0,0,0.5)] border-[1px]">
                  <h4 className="text-base font-semibold mb-2">
                    Cuenta Destino
                  </h4>
                  <div className="w-full flex gap-3">
                    <Select
                      isRequired
                      classNames={{
                        value: "capitalize",
                      }}
                      label="Tipo"
                      labelPlacement="inside"
                      placeholder="Selecciona una opción"
                      radius="none"
                      selectedKeys={[tipoCuentaDestino]}
                      onChange={(e) => actualizarTipoCuenta(e, "destino")}
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
                      labelPlacement="inside"
                      placeholder="Davivienda"
                      radius="none"
                      selectedKeys={[
                        cuentaDestino !== 0 ? cuentaDestino.toString() : "",
                      ]}
                      onChange={(e) => handleCuentaChange(e, "destino")}
                    >
                      {listaActualDeCuentasDestino.map((ctg: any) => (
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
                </div>
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
