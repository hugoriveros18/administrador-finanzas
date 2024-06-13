import BotonCrearCategoria from "@/components/atoms/BotonCrearCategoria";
import { CategoryIcon } from "@/components/atoms/Icons";
import CategoriaItem from "@/components/molecules/CategoriaItem";
import { LISTA_CATEGORIAS } from "@/graphql/categorias/categorias.query";
import { getClient } from "@/graphql/lib/apollorClient";
import { Tipo } from "@/hooks/useHandleCategoria";

async function getCategorias() {
  try {
    const { data } = await getClient().query({
      query: LISTA_CATEGORIAS,
    });

    return data;
  } catch (error) {
    return null;
  }
}

const colorCategoria = (tipo: Tipo) => {
  switch (tipo) {
    case "ingreso":
      return "text-green-800";
    case "egreso":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
};

export default async function Categorias() {
  const { listaCategorias } = await getCategorias();

  if (!listaCategorias || listaCategorias.count === 0) {
    return (
      <section className="w-full flex justify-center items-center">
        <article className="w-full flex flex-col justify-center items-center">
          <span className="flex justify-center items-center bg-pinkSalmon p-3 text-blueLight rounded-full">
            <CategoryIcon height="36" width="36" />
          </span>
          <h3 className="mt-2 mb-4 text-xl">
            No se encontraron categorías registradas
          </h3>
          <BotonCrearCategoria />
        </article>
      </section>
    );
  }

  const { ingreso, egreso } = listaCategorias;

  return (
    <section className="w-full">
      <div className="w-full flex justify-end">
        <BotonCrearCategoria />
      </div>
      <div className="w-full grid grid-cols-2 gap-5 mt-6">
        {[
          { nombre: "ingreso", data: ingreso },
          { nombre: "egreso", data: egreso },
        ].map(({ nombre, data }) => (
          <div key={nombre} className="w-full shadow-lg p-5">
            <article className="w-full flex flex-col items-center gap-3">
              <h2
                className={`text-xl font-semibold capitalize underline ${colorCategoria(nombre as Tipo)}`}
              >
                {nombre}
              </h2>
            </article>
            {data.length === 0 ? (
              <article className="w-full flex flex-col items-center gap-3 mt-6">
                <h3 className="text-xl">
                  No se encontraron categorías registradas
                </h3>
              </article>
            ) : (
              <ul className="w-full mt-6 flex flex-wrap justify-center gap-2">
                {data.map((categoria: any) => (
                  <CategoriaItem key={categoria.id} {...categoria} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
