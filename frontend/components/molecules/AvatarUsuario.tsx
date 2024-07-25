import { Avatar } from "@nextui-org/avatar";

interface Props {
  nombre: string;
  email: string;
}

export default function AvatarUsuario({ nombre, email }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <article className="flex flex-col items-end">
        <h2 className="font-semibold text-sm text-blueLight">
          ¡Hola, {nombre}!
        </h2>
        <p className="text-xs italic text-blueLight">{email}</p>
      </article>
      <Avatar alt="Avatar" size="lg" src="/img/avatar-standar.webp" />
    </div>
  );
}
