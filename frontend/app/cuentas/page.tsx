import BotonCrearCuenta from "@/components/atoms/BotonCrearCuenta";
import { AccountIcon } from "@/components/atoms/Icons";
import CuentaItem from "@/components/molecules/CuentaItem";
import { LISTA_CUENTAS } from "@/graphql/cuentas/cuentas.query";
import { getClient } from "@/graphql/lib/apollorClient";

async function getCuentas() {
  try {
    const { data } = await getClient().query({
      query: LISTA_CUENTAS,
    });

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Cuentas() {
  const data = await getCuentas();

  if (!data?.listaCuentas || data?.listaCuentas.length === 0) {
    return (
      <section className="w-full flex justify-center items-center">
        <article className="w-full flex flex-col justify-center items-center">
          <span className="flex justify-center items-center bg-pinkSalmon p-3 text-blueLight rounded-full">
            <AccountIcon height="36" width="36" />
          </span>
          <h3 className="mt-2 mb-4 text-xl">
            No se encontraron cuentas registradas
          </h3>
          <BotonCrearCuenta />
        </article>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="w-full flex justify-end">
        <BotonCrearCuenta />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-5 mt-6">
        {data.listaCuentas.map((cuenta: any) => (
          <CuentaItem key={cuenta.id} {...cuenta} />
        ))}
      </div>
    </section>
  );
}
