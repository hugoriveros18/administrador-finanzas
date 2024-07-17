import BotonCrearTransaccion from "@/components/atoms/BotonCrearTransaccion";
import { TransaccionIcon } from "@/components/atoms/Icons";
import TablaTransacciones from "@/components/organism/TablaTransacciones";
import { getClient } from "@/graphql/lib/apollorClient";
import { EXISTEN_TRANSACCIONES } from "@/graphql/transacciones/transacciones.query";

async function getTransacciones() {
  try {
    const { data } = await getClient().query({
      query: EXISTEN_TRANSACCIONES,
    });

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Transacciones() {
  const { existenTransacciones } = await getTransacciones();

  if (!existenTransacciones) {
    return (
      <section className="w-full flex justify-center items-center">
        <article className="w-full flex flex-col justify-center items-center">
          <span className="flex justify-center items-center bg-pinkSalmon p-3 text-blueLight rounded-full">
            <TransaccionIcon height="36" width="36" />
          </span>
          <h3 className="mt-2 mb-4 text-xl">
            No se encontraron transacciones registradas
          </h3>
          <BotonCrearTransaccion />
        </article>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full flex flex-wrap justify-center gap-5">
        <TablaTransacciones />
      </div>
    </section>
  );
}
