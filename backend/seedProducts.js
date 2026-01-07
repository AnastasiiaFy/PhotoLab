import mongoose from "mongoose"
import Product from "./models/productModel.js"
import dotenv from "dotenv"

dotenv.config({ path: './backend/.env' })

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))



// Шляхи до локальних фото у проекті
const productsData = [
  {
    title: "Друк фото 10x15",
    price: 6,
    category: "Друк фото",
    description: "Ми перетворили звичайний друк на технологічне мистецтво. Використовуючи метод Digital Silver Halide, ми не просто наносимо фарбу — зображення проявляється всередині шарів паперу. Це забезпечує неймовірну глибину кольору, а ваші фото не збліднуть і не пожовтіють з роками. Для довговічності та вашого комфорту ми використовуємо лише оригінальний папір преміумкласу, який має ідеальну щільність і приємну на дотик фактуру.",
    photoUploader: true,
    images: [
      "../assets/images/photo-10x15-1.png",
      "../assets/images/photo-10x15-2.png",
      "../assets/images/photo-10x15-3.png",
    ],
    options: [
      { key: "size", label: "Розмір фото", type: "static", value: "10×15 см" },
      { key: "surface", label: "Поверхня", type: "select", required: true, values: [{ label: "Глянцева" }, { label: "Матова" }] },
      { key: "paper", label: "Фотопапір", type: "static", value: "Fujifilm Crystal Archive Paper" },
      { key: "frame", label: "Рамки", type: "select", values: [{ label: "Без рамок" }, { label: "Вузькі 0,5 см" }, { label: "Широкі 1 см" }] }
    ]
  },

  {
    title: "Друк фото 13x18",
      price: 11,
      category: "Друк фото",
      description: "Ми перетворили звичайний друк на технологічне мистецтво. Використовуючи метод Digital Silver Halide, ми не просто наносимо фарбу — зображення проявляється всередині шарів паперу. Це забезпечує неймовірну глибину кольору, а ваші фото не збліднуть і не пожовтіють з роками. Для довговічності та вашого комфорту ми використовуємо лише оригінальний папір преміумкласу, який має ідеальну щільність і приємну на дотик фактуру.",
      photoUploader: true,
      images: [
        "../assets/images/photo-13x18-1.png",
        "../assets/images/photo-13x18-2.png",
      ],
      options: [
        { key: "size", label: "Розмір фото", type: "static", value: "13×18 см" },
        { key: "surface", label: "Поверхня", type: "select", required: true, values: [{ label: "Глянцева" }, { label: "Матова" }] },
        { key: "paper", label: "Фотопапір", type: "static", value: "Fujifilm Crystal Archive Paper" },
        { key: "frame", label: "Рамки", type: "select", values: [{ label: "Без рамок" }, { label: "Вузькі 0,5 см" }, { label: "Широкі 1 см" }] }
      ]
  },
  {
    title: "Polaroid Classic",
    price: 50,
    category: "Друк фото-Polaroid",
    description: "Відчуйте магію легендарного формату з білою рамкою. Ми поєднали вінтажний стиль Polaroid із сучасними технологіями лабораторного друку. Завдяки преміальним матеріалам, ваші кадри отримують особливу глибину та контрастність, які неможливо відтворити на звичайному принтері. Широкі поля дозволяють залишити пам’ятний підпис, перетворюючи кожну картку на унікальний артефакт, що зберігатиме свою яскравість десятиліттями.",
    photoUploader: true,
    images: [
      "/assets/images/polaroid-1.png",
      "/assets/images/polaroid-2.png"
    ],
    options: [
      { key: "size", label: "Розмір фото", type: "static", value: "10×12 см" },
      { key: "surface", label: "Поверхня", type: "static", value: "Глянцева" },
    ]
  },
  {
    title: "Polaroid Go",
    price: 40,
    category: "Друк фото-Polaroid",
    description: "Відчуйте магію легендарного формату з білою рамкою. Ми поєднали вінтажний стиль Polaroid із сучасними технологіями лабораторного друку. Завдяки преміальним матеріалам, ваші кадри отримують особливу глибину та контрастність, які неможливо відтворити на звичайному принтері. Широкі поля дозволяють залишити пам’ятний підпис, перетворюючи кожну картку на унікальний артефакт, що зберігатиме свою яскравість десятиліттями.",
    photoUploader: true,
    images: [
      "/assets/images/polaroid-go-1.png",
      "/assets/images/polaroid-go-2.png"
    ],
    options: [
      { key: "size", label: "Розмір фото", type: "static", value: "6×7 см" },
      { key: "surface", label: "Поверхня", type: "static", value: "Глянцева" },
    ]
  },



  {
    title: "Instax Mini",
    price: 45,
    category: "Друк фото-Instax",
    description: "Маленькі картки, що зберігають великі емоції. Наші Instax Mini — це ідеальне поєднання компактності та бездоганної якості. Ми використовуємо спеціальну технологію проявлення зображення, яка гарантує чіткість деталей та насиченість кольорів у кожному мікро-кадрі. Оригінальний щільний папір захищає знімок від вигорання та зношування, щоб ваші найщиріші миті завжди були поруч — у гаманці, під чохлом смартфона чи на мудборді.",
    photoUploader: true,
    images: [
      "/assets/images/instax-1.png",
      "/assets/images/instax-2.png"
    ],
    options: [
      { key: "size", label: "Розмір фото", type: "static", value: "8×6 см" },
      { key: "surface", label: "Поверхня", type: "static", value: "Глянцева" },
    ]
  },
  {
    title: "Instax Square",
    price: 50,
    category: "Друк фото-Instax",
    description: "Маленькі картки, що зберігають великі емоції. Наші Instax Square — це ідеальне поєднання компактності та бездоганної якості. Ми використовуємо спеціальну технологію проявлення зображення, яка гарантує чіткість деталей та насиченість кольорів у кожному мікро-кадрі. Оригінальний щільний папір захищає знімок від вигорання та зношування, щоб ваші найщиріші миті завжди були поруч — у гаманці, під чохлом смартфона чи на мудборді.",
    photoUploader: true,
    images: [
      "/assets/images/instax-square-1.png",
      "/assets/images/instax-square-2.png"
    ],
    options: [
      { key: "size", label: "Розмір фото", type: "static", value: "7×8 см" },
      { key: "surface", label: "Поверхня", type: "static", value: "Глянцева" },
    ]
  },

  {
    title: "Фотомагніт 10x8",
    price: 120,
    category: "Фотомагніти",
    description: "Перетворіть звичайні поверхні на галерею найщасливіших митей. Наш фотомагніт формату — це ідеальне поєднання компактності та вишуканого вигляду. Завдяки гнучкій, але міцній магнітній основі та спеціальному захисному покриттю, ваші спогади надійно фіксуються, не вигоряють на сонці та залишаються захищеними від вологи.",
    photoUploader: true,
    images: [
      "/assets/images/photomagnet-10x8-1.png",
      "/assets/images/photomagnet-10x8-2.png"
    ],
    options: [
      { key: "size", label: "Розмір магніту", type: "static", value: "10×8 см" },
      { key: "width", label: "Висота магніту", type: "static", value: "1см" },
      { key: "surface", label: "Поверхня", type: "static", value: "Матова" },
    ]
  },

  {
    title: "Самоклеючий Фотоальбом 'Family'",
    price: 350,
    category: "Фотоальбоми",
    description: "Станьте режисером власних спогадів. Наш альбом із білими матовими сторінками створений для тих, хто цінує творчу свободу та хоче самостійно наповнювати кожен розворот змістом.",
    photoUploader: false,
    images: [
      "/assets/images/album-family-1.png",
      "/assets/images/album-family-2.png"
    ],
    options: [
      { key: "self_stick", label: "Тип кріплення фото", type: "static", value: "Самоклеючий" },
      { key: "page_size", label: "Розмір сторінок", type: "static", value: "30×40 см" },
      { key: "page_number", label: "Кількість сторінок", type: "static", value: "30 сторінок" },
      { key: "page_color", label: "Колір сторінок", type: "static", value: "Білий" },
      { key: "surface", label: "Поверхня сторінок", type: "static", value: "Матова"  },
      { key: "paper_density", label: "Щільність паперу", type: "static", value: "200 г/м²"  }
    ]
  },

  {
    title: "Самоклеючий Фотоальбом 'Heart'",
    price: 380,
    category: "Фотоальбоми",
    description: "Станьте режисером власних спогадів. Наш альбом із білими матовими сторінками створений для тих, хто цінує творчу свободу та хоче самостійно наповнювати кожен розворот змістом.",
    photoUploader: false,
    images: [
      "/assets/images/album-heart-1.png",
      "/assets/images/album-heart-2.png"
    ],
    options: [
      { key: "self_stick", label: "Тип кріплення фото", type: "static", value: "Самоклеючий" },
      { key: "page_size", label: "Розмір сторінок", type: "static", value: "30×40 см" },
      { key: "page_number", label: "Кількість сторінок", type: "static", value: "30 сторінок" },
      { key: "page_color", label: "Колір сторінок", type: "static", value: "Білий" },
      { key: "surface", label: "Поверхня сторінок", type: "static", value: "Матова"  },
      { key: "paper_density", label: "Щільність паперу", type: "static", value: "200 г/м²"  }
    ]
  }
]

const seedDB = async () => {
  try {
    await Product.deleteMany()
    console.log("Old products removed")

    for (const prod of productsData) {
      const product = new Product({
        title: prod.title,
        price: prod.price,
        category: prod.category,
        description: prod.description,
        imageUrls: prod.images, 
        photoUploader: prod.photoUploader || false,
        options: prod.options
      })

      await product.save()
      console.log(`Product "${prod.title}" saved with ${prod.images.length} images`)
    }

    console.log("All products seeded")
    mongoose.connection.close()
  } catch (err) {
    console.error(err)
  }
}

seedDB()