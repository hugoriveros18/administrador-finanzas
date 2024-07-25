import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";

import { menuLinks } from "@/components/utils";
import NavbarMenuLink from "@/components/atoms/NavbarMenuLink";
import { GET_USUARIO_DATA } from "@/graphql/usuario/usuario.query";
import { getClient } from "@/graphql/lib/apollorClient";
import AvatarUsuario from "@/components/molecules/AvatarUsuario";

async function getUserData() {
  try {
    const { data } = await getClient().query({
      query: GET_USUARIO_DATA,
    });

    return data;
  } catch (error) {
    return null;
  }
}

export default async function Header() {
  const userData = await getUserData();

  return (
    <Navbar className="bg-redVerminton" height="auto" maxWidth="full">
      <div className="max-w-7xl mx-auto flex px-4 gap-4 w-full flex-row relative flex-nowrap items-center justify-between">
        <NavbarBrand>
          <NextLink href="/">
            <img alt="Logo" className="w-20 h-20" src="img/logo.svg" />
          </NextLink>
        </NavbarBrand>
        <NavbarContent justify="center">
          {menuLinks.map((link) => (
            <NavbarMenuLink key={link.slug} {...link} />
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          {userData ? (
            <NavbarItem>
              <AvatarUsuario
                email={userData.usuario.email}
                nombre={userData.usuario.nombre}
              />
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button
                as={NextLink}
                className="bg-blueLight text-blueCharcoal font-bold"
                href="/login"
                variant="flat"
              >
                Iniciar Sesion
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>
    </Navbar>
  );
}
