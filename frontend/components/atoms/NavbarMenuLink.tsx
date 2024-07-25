"use client";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@nextui-org/navbar";
import NextLink from "next/link";

interface Props {
  nombre: string;
  slug: string;
}

export default function NavbarMenuLink({ nombre, slug }: Props) {
  const pathname = usePathname();

  return (
    <NavbarItem>
      <NextLink
        className={`${pathname === slug ? "font-bold text-black" : "text-blueLight font-normal hover:opacity-80 transition-all duration-200"}`}
        href={slug}
      >
        {nombre}
      </NextLink>
    </NavbarItem>
  );
}
