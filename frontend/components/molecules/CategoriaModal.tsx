"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { DocumentNode } from "@apollo/client";

import useHandleCategoria, { Tipo } from "@/hooks/useHandleCategoria";

interface Categoria {
  id?: number;
  nombre: string;
  tipo: Tipo;
}

interface Props {
  categoria?: Categoria;
  modalTrigger: (onOpen: () => void) => JSX.Element;
  tituloModal: string;
  botonConfirmacion: string;
  gqlMutation: DocumentNode;
  onSuccessfulMutation?: () => void;
}

const DEFAUTL_CATEGORIA: Categoria = {
  nombre: "",
  tipo: "ingreso",
};

export default function CategoriaModal({
  categoria = DEFAUTL_CATEGORIA,
  modalTrigger,
  tituloModal,
  botonConfirmacion,
  gqlMutation,
  onSuccessfulMutation,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    formValues: { nombre, tipo },
    errorMessage,
    handleNombreChange,
    handleTipoChange,
    guardarCategoria,
  } = useHandleCategoria({
    gqlMutation,
    ...categoria,
  });

  return (
    <>
      {modalTrigger(onOpen)}
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
                  label="Nombre"
                  labelPlacement="outside"
                  placeholder="Transporte"
                  radius="none"
                  size="md"
                  type="text"
                  value={nombre}
                  onChange={handleNombreChange}
                />
                <RadioGroup
                  classNames={{
                    label: "text-black text-sm",
                  }}
                  defaultValue="ingreso"
                  isDisabled={!!categoria.id}
                  label="Tipo de categoría"
                  value={tipo}
                  onValueChange={handleTipoChange}
                >
                  {["ingreso", "egreso"].map((item) => (
                    <Radio
                      key={item}
                      className="capitalize"
                      classNames={{
                        label: "text-black text-sm",
                        control: "group-data-[selected=true]:bg-redVerminton",
                        wrapper:
                          "group-data-[selected=true]:border-redVerminton group-data-[hover-unselected=true]:bg-redVerminton group-data-[hover-unselected=true]:border-redVerminton",
                      }}
                      value={item}
                    >
                      {item}
                    </Radio>
                  ))}
                </RadioGroup>
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
                    const result = await guardarCategoria();

                    if (result) {
                      onSuccessfulMutation?.();
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
