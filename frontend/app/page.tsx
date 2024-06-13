import { getClient } from "@/graphql/lib/apollorClient";
import { GET_USUARIO_DATA } from "@/graphql/usuario/usuario.query";

async function getData() {
  try {
    const { data } = await getClient().query({
      query: GET_USUARIO_DATA,
    });

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Home() {
  const data = await getData();

  if (!data) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1>HOME</h1>
        <p>NO DATA</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1>HOME</h1>
      {/* <p className="text-black text-2xl">{nombre}</p> */}
    </section>
  );
}
