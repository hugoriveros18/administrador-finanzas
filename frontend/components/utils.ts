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
  {
    nombre: "Movimientos",
    slug: "/movimientos",
  },
];

export const tablaTransaccionesColumnas = [
  {
    key: "valor",
    label: "Valor",
  },
  {
    key: "descripcion",
    label: "Descripción",
  },
  {
    key: "tipo",
    label: "Tipo",
  },
  {
    key: "categoria",
    label: "Categoría",
  },
  {
    key: "cuenta",
    label: "Cuenta",
  },
  {
    key: "fecha",
    label: "Fecha",
  },
  {
    key: "acciones",
    label: "Acciones",
  },
];

export const tablaMovimientosColumnas = [
  {
    key: "cuentaOrigen",
    label: "Cuenta Origen",
  },
  {
    key: "cuentaDestino",
    label: "Cuenta Destino",
  },
  {
    key: "valor",
    label: "Valor",
  },
  {
    key: "descripcion",
    label: "Descripción",
  },
  {
    key: "fecha",
    label: "Fecha",
  },
  {
    key: "acciones",
    label: "Acciones",
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

export function formatoFecha(fecha: string) {
  const periodo = fecha.split("-");
  const año = periodo[0];
  const mesIndex = parseInt(periodo[1], 10) - 1;
  const día = periodo[2];

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const nombreMes = meses[mesIndex];

  return `${día} - ${nombreMes} / ${año}`;
}

export function formatearComoPesosColombianos(valor: number): string {
  return valor.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
}

export const getCurrentYear = () => {
  return new Date().getFullYear();
};

export const getCurrentMonth = () => {
  return new Date().getMonth() + 1;
};

export const meses = [
  {
    id: "1",
    nombre: "Enero",
  },
  {
    id: "2",
    nombre: "Febrero",
  },
  {
    id: "3",
    nombre: "Marzo",
  },
  {
    id: "4",
    nombre: "Abril",
  },
  {
    id: "5",
    nombre: "Mayo",
  },
  {
    id: "6",
    nombre: "Junio",
  },
  {
    id: "7",
    nombre: "Julio",
  },
  {
    id: "8",
    nombre: "Agosto",
  },
  {
    id: "9",
    nombre: "Septiembre",
  },
  {
    id: "10",
    nombre: "Octubre",
  },
  {
    id: "11",
    nombre: "Noviembre",
  },
  {
    id: 12,
    nombre: "Diciembre",
  },
];
