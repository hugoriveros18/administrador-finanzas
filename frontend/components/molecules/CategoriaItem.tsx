import BotonEditarCategoria from "../atoms/BotonEditarCategoria";

import EliminarCategoriaModal from "./EliminarCategoriaModal";

import { Tipo } from "@/hooks/useHandleCategoria";

export interface CategoriaItemProps {
  id: number;
  nombre: string;
  tipo: Tipo;
}

export default function CategoriaItem({ ...categoria }: CategoriaItemProps) {
  return (
    <li className="flex items-center gap-2 bg-transparent border-double border-[3px] p-2 rounded-md">
      <span className="flex p2 font-semibold">{categoria.nombre}</span>
      <BotonEditarCategoria {...categoria} />
      <EliminarCategoriaModal {...categoria} />
    </li>
  );
}
