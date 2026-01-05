import photo10x15_1 from "../assets/images/photo-10x15-1.png";
import photo10x15_2 from "../assets/images/photo-10x15-2.png";

import polaroid1 from "../assets/images/polaroid-1.png";
import polaroid2 from "../assets/images/polaroid-2.png";

import instax1 from "../assets/images/instax-1.png";
import instax2 from "../assets/images/instax-2.png";

import albumFamily1 from "../assets/images/album-family-1.png";
import albumFamily2 from "../assets/images/album-family-2.png";

export const products = [
  {
    id: 1,
    title: "Друк фото 10x15",
    price: 6,
    category: "Друк фото",
    images: [photo10x15_1, photo10x15_2],
    description: "Ми перетворили звичайний друк на технологічне мистецтво. Використовуючи метод Digital Silver Halide, ми не просто наносимо фарбу — зображення проявляється всередині шарів паперу. Це забезпечує неймовірну глибину кольору, а ваші фото не збліднуть і не пожовтіють з роками. Для довговічності та вашого комфорту ми використовуємо лише оригінальний папір преміумкласу, який має ідеальну щільність і приємну на дотик фактуру.",
    photoUploader: true, 
    "options": [
    {
      "key": "size",
      "label": "Розмір фото",
      "type": "static",
      "value": "10×15 см"
    },
    {
      "key": "surface",
      "label": "Поверхня",
      "type": "select",
      "required": true,
      "values": [
        { "label": "Глянцева"},
        { "label": "Матова"}
      ]
    },
    {
        key: "paper",
        label: "Фотопапір",
        type: "static",
        value: "Fujifilm Crystal Archive Paper"
    },
    {
      "key": "frame",
      "label": "Рамки",
      "type": "select",
      "values": [
          { label: "Без рамок" },
          { label: "Вузькі 0,5 см" },
          { label: "Широкі 1 см" }
        ]
    }
  ]
  },
  {
    id: 2,
    title: "Polaroid Classic",
    price: 50,
    category: "Друк фото-Polaroid",
    images: [polaroid1, polaroid2],
    description: "Відчуйте магію легендарного формату з білою рамкою. Ми поєднали вінтажний стиль Polaroid із сучасними технологіями лабораторного друку. Завдяки преміальним матеріалам, ваші кадри отримують особливу глибину та контрастність, які неможливо відтворити на звичайному принтері. Широкі поля дозволяють залишити пам’ятний підпис, перетворюючи кожну картку на унікальний артефакт, що зберігатиме свою яскравість десятиліттями.",
    options: [
      {
        key: "size",
        label: "Розмір фото",
        type: "static",
        value: "8×10 см"
      },
      {
        key: "surface",
        label: "Поверхня",
        type: "static",
        value: "Глянцева" 
      }
    ]
  },
  {
    id: 3,
    title: "Instax Mini",
    price: 55,
    category: "Друк фото-Instax",
    images: [instax1, instax2],
    description: "Маленькі картки, що зберігають великі емоції. Наші Instax Mini — це ідеальне поєднання компактності та бездоганної якості. Ми використовуємо спеціальну технологію проявлення зображення, яка гарантує чіткість деталей та насиченість кольорів у кожному мікро-кадрі. Оригінальний щільний папір захищає знімок від вигорання та зношування, щоб ваші найщиріші миті завжди були поруч — у гаманці, під чохлом смартфона чи на мудборді.",
    options: [
      {
        key: "size",
        label: "Розмір фото",
        type: "static",
        value: "8×8 см"
      },
      {
        key: "surface",
        label: "Поверхня",
        type: "static",
        value: "Глянцева" 
      }
    ]
  },
  {
    id: 4,
    title: " Самоклеючий Фотоальбом 'Family'",
    price: 200,
    category: "Фотоальбоми",
    images: [albumFamily1, albumFamily2],
    description: "Станьте режисером власних спогадів. Наш альбом із білими матовими сторінками створений для тих, хто цінує творчу свободу та хоче самостійно наповнювати кожен розворот змістом.",
    options: [
      {
        key: "self_stick",
        label: "Тип кріплення фото",
        type: "static",
        value: "Самоклеючий"
      },
      {
        key: "page_size",
        label: "Розмір сторінок",
        type: "static",
        value: "20×25 см"
      },
      {
        key: "page_number",
        label: "Кількість сторінок",
        type: "static",
        value: "30 сторінок"
      },
      {
        key: "page_color",
        label: "Колір сторінок",
        type: "static",
        value: "Білий"
      },
      {
        key: "surface",
        label: "Поверхня сторінок",
        type: "static",
        value: "Матова"
      },
      {
        key: "paper_density",
        label: "Щільність паперу",
        type: "static",
        value: "200 г/м²"
      }
    ]
  }
];
