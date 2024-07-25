import NextLink from "next/link";
import { Button } from "@nextui-org/button";

import LoginForm from "../../components/molecules/LoginForm";

import { GoogleIcon, LoginWallet } from "@/components/atoms/Icons";

export default function Login() {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <article className="flex flex-col items-center">
        <div className="w-full flex justify-center">
          <LoginWallet />
        </div>
        <h3 className="text-[42px] mt-2">¡Bienvenido!</h3>
        <p className="text-center text-base max-w-72">
          Inicia sesión para acceder a tu panel, configuraciones y
          transacciones.
        </p>
      </article>
      <div className="w-full flex justify-center mt-8">
        <Button
          as={NextLink}
          className="w-full max-w-[350px] font-bold"
          color="default"
          href="http://localhost:4000/auth/google"
          startContent={<GoogleIcon />}
        >
          Ingresar con Google
        </Button>
      </div>
      <div className="w-full mt-4">
        <div className="w-full max-w-[350px] mx-auto">
          <p className="flex items-center gap-2 text-center text-nowrap text-sm opacity-40 after:block after:content-[''] after:w-full after:h-[1px] after:bg-black after:opacity-40 before:block before:content-[''] before:w-full before:h-[1px] before:bg-black before:opacity-40">
            O ingresa con tu correo electrónico
          </p>
        </div>
      </div>
      <div className="w-full mt-6">
        <LoginForm />
        <div className="w-full max-w-[350px] mx-auto mt-2">
          <p className="text-center text-sm mt-4">
            ¿No tienes una cuenta?
            <NextLink
              className="text-redVerminton ml-1 ease-linear hover:underline"
              href="/signup"
            >
              Regístrate
            </NextLink>
          </p>
        </div>
      </div>
    </section>
  );
}
