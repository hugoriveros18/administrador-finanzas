import BotonCrearMovimiento from "@/components/atoms/BotonCrearMovimiento";
import { MovimientosIcon } from "@/components/atoms/Icons";
import TablaMovimientos from "@/components/organism/TablaMovimientos";
import { getClient } from "@/graphql/lib/apollorClient";
import { EXISTEN_MOVIMIENTOS } from "@/graphql/movimientos/movimientos.query";

async function getMovimientos() {
  try {
    const { data } = await getClient().query({
      query: EXISTEN_MOVIMIENTOS,
    });

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Movimientos() {
  const data = await getMovimientos();

  if (!data?.existenMovimientos) {
    return (
      <section className="w-full flex justify-center items-center">
        <article className="w-full flex flex-col justify-center items-center">
          <span className="flex justify-center items-center bg-pinkSalmon p-3 text-blueLight rounded-full">
            <MovimientosIcon height="36" width="36" />
          </span>
          <h3 className="mt-2 mb-4 text-xl">
            No se encontraron movimientos registrados
          </h3>
          <BotonCrearMovimiento />
        </article>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full flex flex-wrap justify-center gap-5">
        <TablaMovimientos />
      </div>
    </section>
  );
}
