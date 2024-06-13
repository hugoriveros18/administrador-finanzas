import { CalendarDate } from "@internationalized/date";

export const menuLinks = [
  {
    nombre: "Cuentas",
    slug: "/cuentas",
  },
  {
    nombre: "Categorías",
    slug: "/categorias",
  },
  {
    nombre: "Transacciones",
    slug: "/transacciones",
  },
];

export const getRandomColor = () => {
  return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
};

// export const getCurretDate = () => {
//   const date = new Date();
//   const localDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

//   return localDate;
// };

export const getCalendarDate = () => {
  const date = new Date();
  const calendarDate = new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  return calendarDate;
};

export const convertStringToCalendarDate = (date: string) => {
  const [year, month, day] = date.split("-");

  const calendarDate = new CalendarDate(
    Number(year),
    Number(month),
    Number(day),
  );

  return calendarDate;
};
