import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import NextLink from "next/link";

import SingupForm from "../../components/molecules/SingupForm";

import { GoogleIcon } from "@/components/atoms/Icons";

export default function Signup() {
  return (
    <section className="w-full flex justify-center items-center gap-10 pb-16 px-7">
      <section className="w-[55%] max-w-[500px]">
        <article>
          <h3 className="text-4xl">Comienza Ahora</h3>
          <p className="mt-2 text-sm">
            Ingresa tus datos para crear tu cuenta y comenzar a disfrutar
          </p>
        </article>
        <div className="w-full flex justify-center mt-8">
          <Button
            as={NextLink}
            className="w-full font-bold"
            color="default"
            href="http://localhost:4000/auth/google"
            startContent={<GoogleIcon />}
          >
            Iniciar sesión con Google
          </Button>
        </div>
        <div className="w-full mt-8">
          <p className="flex items-center gap-2 text-center text-nowrap text-sm opacity-40 after:block after:content-[''] after:w-full after:h-[1px] after:bg-black after:opacity-40 before:block before:content-[''] before:w-full before:h-[1px] before:bg-black before:opacity-40">
            O ingresa con tu correo electrónico
          </p>
        </div>
        <SingupForm />
      </section>
      <picture className="w-[45%]">
        <Image alt="Sign up" radius="none" src="/img/signup.jpg" />
      </picture>
    </section>
  );
}
