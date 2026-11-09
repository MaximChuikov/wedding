// ВСЁ, что нужно менять, находится в этом файле.

// Заглушка-фото (SVG). Чтобы поставить своё: положите файл в public/photos/
// и впишите src: photo("1.jpg")
const BASE = import.meta.env.BASE_URL;
export const photo = (name) => `${BASE}photos/${name}`;

const ph = (label, a, b) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'>
      <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs>
      <rect width='600' height='800' fill='url(#g)'/>
      <circle cx='430' cy='250' r='150' fill='#fff' opacity='.12'/>
      <circle cx='160' cy='620' r='210' fill='#000' opacity='.08'/>
      <text x='300' y='410' font-family='Georgia,serif' font-size='34' font-style='italic' text-anchor='middle' fill='#fff' opacity='.75'>${label}</text>
    </svg>`
  );

export const wedding = {
  names: ["Валентина", "Максим"],
  dateISO: "2026-12-04T16:00:00+05:00", // Челябинск, UTC+5
  dateText: "4 декабря 2026",
  weekday: "пятница",
  time: "16:00",
  vanloft: "Ван Лофт",
  place: "Челябинск, Кировка",
  mapUrl: "https://yandex.ru/maps/-/CXCJq05X",
  telegram: "maximchuikov", // ник в Telegram без @, куда придут ответы гостей
  lead: "Мы женимся и хотим разделить этот день с вами",

  photos: [
    { src: photo("загс.jpg"), alt: "Фото 1" },
    { src: photo("Грузия.jpg"), alt: "Фото 2" },
    { src: photo("роспись.jpg"), alt: "Фото 3" },
    { src: photo("кольца.jpg"), alt: "Фото 4" },
    { src: photo("Зал.jpeg"), alt: "Фото 5" },
  ],

  schedule: [
    { t: "16:00", text: "Сбор гостей" },
    { t: "16:20", text: "Начало церемонии" },
    { t: "17:00", text: "Банкетная программа" },
    { t: "21:00", text: "Финал вечера" },
    { t: "22:00", text: "Конец дискотеки" },
  ],

  // 8 цветов: от сливочного до шоколадного. dark: true — светлый текст на ткани
  palette: [
    { name: "Песочный", hex: "#E3B082" },
    { name: "Кэмел", hex: "#BB7235", dark: true },
    { name: "Карамельный", hex: "#A9602D", dark: true },
    { name: "Коньячный", hex: "#B05C2E", dark: true },
    { name: "Каштановый", hex: "#773B1C", dark: true },
    { name: "Кофейный", hex: "#3E2618", dark: true },
    { name: "Шоколадный", hex: "#3F1F11", dark: true },
    { name: "Эспрессо", hex: "#2B1E16", dark: true },
  ],
};