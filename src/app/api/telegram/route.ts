// import { NextRequest, NextResponse } from "next/server";

// interface KeyboardMarkup {
//   keyboard: { text: string }[][];
//   resize_keyboard?: boolean;
//   one_time_keyboard?: boolean;
// }

// interface InlineKeyboardMarkup {
//   inline_keyboard: { text: string; callback_data: string }[][];
// }

// interface Medicine {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   inStock: boolean;
// }

// interface CartItem {
//   medicine: Medicine;
//   quantity: number;
// }

// const medicines: Medicine[] = [
//   {
//     id: "1",
//     name: "Парацетамол",
//     price: 25,
//     description: "Жарознижуючий та знеболюючий засіб",
//     inStock: true,
//   },
//   {
//     id: "2",
//     name: "Ібупрофен",
//     price: 45,
//     description: "Протизапальний та знеболюючий препарат",
//     inStock: true,
//   },
//   {
//     id: "3",
//     name: "Вітамін C",
//     price: 35,
//     description: "Аскорбінова кислота для підтримки імунітету",
//     inStock: true,
//   },
//   {
//     id: "4",
//     name: "Аспірин",
//     price: 30,
//     description: "Жарознижуючий засіб",
//     inStock: false,
//   },
//   {
//     id: "5",
//     name: "Вітамін D3",
//     price: 120,
//     description: "Для зміцнення кісток та імунітету",
//     inStock: true,
//   },
//   {
//     id: "6",
//     name: "Амброксол",
//     price: 65,
//     description: "Відхаркуючий засіб при кашлі",
//     inStock: true,
//   },
// ];

// const userCarts: Map<number, CartItem[]> = new Map();
// const userStates: Map<number, string> = new Map();

// async function sendMessage(
//   chatId: number,
//   text: string,
//   keyboard?: KeyboardMarkup | InlineKeyboardMarkup
// ) {
//   const payload: {
//     chat_id: number;
//     text: string;
//     parse_mode: string;
//     reply_markup?: KeyboardMarkup | InlineKeyboardMarkup;
//   } = {
//     chat_id: chatId,
//     text,
//     parse_mode: "HTML",
//   };

//   if (keyboard) {
//     payload.reply_markup = keyboard;
//   }

//   return fetch(
//     `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     }
//   );
// }

// async function answerCallbackQuery(callbackQueryId: string, text?: string) {
//   return fetch(
//     `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/answerCallbackQuery`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         callback_query_id: callbackQueryId,
//         text: text || "",
//       }),
//     }
//   );
// }

// function getMainKeyboard(): KeyboardMarkup {
//   return {
//     keyboard: [
//       [{ text: "💊 Каталог" }, { text: "🛒 Кошик" }],
//       [{ text: "📦 Мої замовлення" }, { text: "ℹ️ Допомога" }],
//       [{ text: "📞 Контакти" }],
//     ],
//     resize_keyboard: true,
//   };
// }

// function getCatalogKeyboard(): InlineKeyboardMarkup {
//   const buttons = medicines.map((med) => [
//     {
//       text: `${med.name} - ${med.price}₴ ${med.inStock ? "✅" : "❌"}`,
//       callback_data: `medicine_${med.id}`,
//     },
//   ]);

//   return { inline_keyboard: buttons };
// }

// function getMedicineKeyboard(medicineId: string): InlineKeyboardMarkup {
//   return {
//     inline_keyboard: [
//       [
//         {
//           text: "➕ Додати в кошик",
//           callback_data: `add_to_cart_${medicineId}`,
//         },
//         { text: "ℹ️ Детальніше", callback_data: `details_${medicineId}` },
//       ],
//       [{ text: "⬅️ Назад до каталогу", callback_data: "back_to_catalog" }],
//     ],
//   };
// }

// function getCartKeyboard(): InlineKeyboardMarkup {
//   return {
//     inline_keyboard: [
//       [
//         { text: "🗑 Очистити кошик", callback_data: "clear_cart" },
//         { text: "✅ Оформити замовлення", callback_data: "checkout" },
//       ],
//     ],
//   };
// }

// function formatCart(chatId: number): string {
//   const cart = userCarts.get(chatId) || [];

//   if (cart.length === 0) {
//     return "🛒 Ваш кошик порожній";
//   }

//   let text = "🛒 <b>Ваш кошик:</b>\n\n";
//   let total = 0;

//   cart.forEach((item, index) => {
//     const itemTotal = item.medicine.price * item.quantity;
//     total += itemTotal;
//     text += `${index + 1}. <b>${item.medicine.name}</b>\n`;
//     text += `   Кількість: ${item.quantity} шт.\n`;
//     text += `   Ціна за шт.: ${item.medicine.price}₴\n`;
//     text += `   Сума: ${itemTotal}₴\n\n`;
//   });

//   text += `💰 <b>Загальна сума: ${total}₴</b>`;

//   return text;
// }

// function addToCart(chatId: number, medicineId: string): boolean {
//   const medicine = medicines.find((m) => m.id === medicineId);
//   if (!medicine || !medicine.inStock) return false;

//   const cart = userCarts.get(chatId) || [];
//   const existingItem = cart.find((item) => item.medicine.id === medicineId);

//   if (existingItem) {
//     existingItem.quantity += 1;
//   } else {
//     cart.push({ medicine, quantity: 1 });
//   }

//   userCarts.set(chatId, cart);
//   return true;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     if (body.callback_query) {
//       const callbackQuery = body.callback_query;
//       const chatId = callbackQuery.from.id;
//       const data = callbackQuery.data;

//       await answerCallbackQuery(callbackQuery.id);

//       if (data === "back_to_catalog") {
//         await sendMessage(
//           chatId,
//           "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
//           getCatalogKeyboard()
//         );
//       } else if (data.startsWith("medicine_")) {
//         const medicineId = data.replace("medicine_", "");
//         const medicine = medicines.find((m) => m.id === medicineId);

//         if (medicine) {
//           const text =
//             `💊 <b>${medicine.name}</b>\n\n` +
//             `💰 Ціна: ${medicine.price}₴\n` +
//             `📝 Опис: ${medicine.description}\n` +
//             `📦 Наявність: ${
//               medicine.inStock ? "В наявності ✅" : "Немає в наявності ❌"
//             }`;

//           await sendMessage(chatId, text, getMedicineKeyboard(medicineId));
//         }
//       } else if (data.startsWith("add_to_cart_")) {
//         const medicineId = data.replace("add_to_cart_", "");
//         const success = addToCart(chatId, medicineId);

//         if (success) {
//           await sendMessage(chatId, "✅ Товар додано в кошик!");
//         } else {
//           await sendMessage(
//             chatId,
//             "❌ Не вдалося додати товар. Можливо, його немає в наявності."
//           );
//         }
//       } else if (data.startsWith("details_")) {
//         const medicineId = data.replace("details_", "");
//         const medicine = medicines.find((m) => m.id === medicineId);

//         if (medicine) {
//           const text =
//             `📋 <b>Детальна інформація:</b>\n\n` +
//             `💊 Назва: ${medicine.name}\n` +
//             `💰 Ціна: ${medicine.price}₴\n` +
//             `📝 Опис: ${medicine.description}\n` +
//             `📦 Наявність: ${
//               medicine.inStock ? "В наявності ✅" : "Немає в наявності ❌"
//             }\n\n` +
//             `⚠️ Перед застосуванням обов'язково проконсультуйтесь з лікарем!`;

//           await sendMessage(chatId, text);
//         }
//       } else if (data === "clear_cart") {
//         userCarts.set(chatId, []);
//         await sendMessage(chatId, "🗑 Кошик очищено!");
//       } else if (data === "checkout") {
//         const cart = userCarts.get(chatId) || [];
//         if (cart.length === 0) {
//           await sendMessage(
//             chatId,
//             "❌ Кошик порожній! Додайте товари для оформлення замовлення."
//           );
//           return NextResponse.json({ ok: true });
//         }

//         userStates.set(chatId, "awaiting_phone");
//         await sendMessage(
//           chatId,
//           "📞 Для оформлення замовлення введіть ваш номер телефону:\n(у форматі +380xxxxxxxxx)"
//         );
//       }

//       return NextResponse.json({ ok: true });
//     }

//     const chatId = body?.message?.chat?.id;
//     const text = body?.message?.text;
//     const firstName = body?.message?.from?.first_name || "Користувач";

//     if (!chatId || !text) {
//       return NextResponse.json({ ok: true });
//     }

//     const userState = userStates.get(chatId);

//     if (userState === "awaiting_phone") {
//       const phoneRegex = /^\+380\d{9}$/;
//       if (phoneRegex.test(text)) {
//         userStates.set(chatId, "awaiting_address");
//         await sendMessage(chatId, "📍 Тепер введіть адресу доставки:");
//       } else {
//         await sendMessage(
//           chatId,
//           "❌ Неправильний формат номера. Введіть номер у форматі +380xxxxxxxxx"
//         );
//       }
//       return NextResponse.json({ ok: true });
//     }

//     if (userState === "awaiting_address") {
//       const cart = userCarts.get(chatId) || [];
//       const total = cart.reduce(
//         (sum, item) => sum + item.medicine.price * item.quantity,
//         0
//       );

//       userCarts.set(chatId, []);
//       userStates.delete(chatId);

//       const orderText =
//         `✅ <b>Замовлення прийнято!</b>\n\n` +
//         `📦 Номер замовлення: #${Date.now()}\n` +
//         `💰 Сума: ${total}₴\n` +
//         `📍 Адреса: ${text}\n\n` +
//         `⏰ Очікуйте дзвінка протягом 30 хвилин для підтвердження.\n` +
//         `🚚 Доставка протягом 1-2 годин.`;

//       await sendMessage(chatId, orderText, getMainKeyboard());
//       return NextResponse.json({ ok: true });
//     }

//     const greetings = [
//       "привіт",
//       "hello",
//       "hi",
//       "добрий день",
//       "доброго дня",
//       "вітаю",
//       "/start",
//     ];
//     const lowerText = text.toLowerCase();

//     if (greetings.some((greeting) => lowerText.includes(greeting))) {
//       await sendMessage(
//         chatId,
//         `👋 Вітаємо, ${firstName}!\n\n🏥 <b>Онлайн Аптека "${process.env.NEXT_PUBLIC_PHARMACY_NAME}"</b>\n\nУ нас ви можете:\n• Переглянути каталог ліків\n• Додати товари в кошик\n• Оформити замовлення з доставкою\n\nОберіть команду для продовження:`,
//         getMainKeyboard()
//       );
//     } else if (text === "💊 Каталог") {
//       await sendMessage(
//         chatId,
//         "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
//         getCatalogKeyboard()
//       );
//     } else if (text === "🛒 Кошик") {
//       const cartText = formatCart(chatId);
//       const cart = userCarts.get(chatId) || [];
//       const keyboard = cart.length > 0 ? getCartKeyboard() : undefined;
//       await sendMessage(chatId, cartText, keyboard);
//     } else if (text === "📦 Мої замовлення") {
//       await sendMessage(
//         chatId,
//         "📦 <b>Історія замовлень:</b>\n\nУ вас поки що немає замовлень.\nОформіть своє перше замовлення через каталог!"
//       );
//     } else if (text === "ℹ️ Допомога") {
//       const helpText =
//         `ℹ️ <b>Допомога:</b>\n\n` +
//         `🔹 <b>Каталог</b> - перегляд усіх доступних ліків\n` +
//         `🔹 <b>Кошик</b> - ваші обрані товари\n` +
//         `🔹 <b>Замовлення</b> - історія покупок\n\n` +
//         `❓ <b>Як зробити замовлення:</b>\n` +
//         `1. Оберіть "Каталог"\n` +
//         `2. Виберіть ліки та додайте в кошик\n` +
//         `3. Перейдіть в "Кошик" та оформіть замовлення\n` +
//         `4. Вкажіть телефон та адресу\n` +
//         `5. Очікуйте доставку!\n\n` +
//         `⚠️ <b>Увага:</b> Перед застосуванням будь-яких ліків обов'язково проконсультуйтесь з лікарем!`;

//       await sendMessage(chatId, helpText);
//     } else if (text === "📞 Контакти") {
//       const contactText =
//         `📞 <b>Контакти:</b>\n\n` +
//         `🏥 Онлайн Аптека "${process.env.NEXT_PUBLIC_PHARMACY_NAME}"\n` +
//         `📱 Телефон: ${process.env.NEXT_PUBLIC_PHARMACY_PHONE}\n` +
//         `📧 Email: ${process.env.NEXT_PUBLIC_PHARMACY_EMAIL}\n` +
//         `🌐 Сайт: ${process.env.NEXT_PUBLIC_PHARMACY_WEBSITE}\n\n` +
//         `🕐 <b>Режим роботи:</b>\n` +
//         `Пн-Пт: 08:00 - 22:00\n` +
//         `Сб-Нд: 09:00 - 21:00\n\n` +
//         `🚚 <b>Доставка:</b> по Києву та області\n` +
//         `⏰ <b>Час доставки:</b> 1-2 години`;

//       await sendMessage(chatId, contactText);
//     } else {
//       await sendMessage(
//         chatId,
//         `❓ Не розумію команду "${text}".\n\nОберіть дію з меню або напишіть /start для початку.`,
//         getMainKeyboard()
//       );
//     }

//     return NextResponse.json({ ok: true });
//   } catch (err) {
//     console.error("Telegram error:", err);
//     return NextResponse.json({ ok: false });
//   }
// }
/*********************************************************************************************** */

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/MongoDB";
import MedicineProductModel from "@/models/MedicineProduct";
import TelegramOrderModel from "@/models/TelegramOrderModel";

interface KeyboardMarkup {
  keyboard: { text: string }[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}

interface InlineKeyboardMarkup {
  inline_keyboard: { text: string; callback_data: string }[][];
}

interface CartItem {
  medicine: {
    _id: string;
    name: string;
    price: number;
    description?: string;
    stock: number;
  };
  quantity: number;
}

const userCarts: Map<number, CartItem[]> = new Map();
const userStates: Map<number, string> = new Map();
const userOrderData: Map<number, { phone?: string; address?: string }> =
  new Map();

async function sendMessage(
  chatId: number,
  text: string,
  keyboard?: KeyboardMarkup | InlineKeyboardMarkup
) {
  const payload: {
    chat_id: number;
    text: string;
    parse_mode: string;
    reply_markup?: KeyboardMarkup | InlineKeyboardMarkup;
  } = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
  };

  if (keyboard) {
    payload.reply_markup = keyboard;
  }

  return fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  return fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/answerCallbackQuery`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        callback_query_id: callbackQueryId,
        text: text || "",
      }),
    }
  );
}

function getMainKeyboard(): KeyboardMarkup {
  return {
    keyboard: [
      [{ text: "💊 Каталог" }, { text: "🛒 Кошик" }],
      [{ text: "📦 Мої замовлення" }, { text: "ℹ️ Допомога" }],
      [{ text: "📞 Контакти" }],
    ],
    resize_keyboard: true,
  };
}

async function getCatalogKeyboard(): Promise<InlineKeyboardMarkup> {
  try {
    await connectDB();

    const medicines = await MedicineProductModel.find({}).limit(20).lean();

    const buttons = medicines.map((med) => [
      {
        text: `${med.name} - ${med.price}₴ ${med.stock > 0 ? "✅" : "❌"}`,
        callback_data: `medicine_${med._id}`,
      },
    ]);

    return { inline_keyboard: buttons };
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return {
      inline_keyboard: [
        [{ text: "❌ Помилка завантаження каталогу", callback_data: "error" }],
      ],
    };
  }
}

function getMedicineKeyboard(medicineId: string): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        {
          text: "➕ Додати в кошик",
          callback_data: `add_to_cart_${medicineId}`,
        },
        { text: "ℹ️ Детальніше", callback_data: `details_${medicineId}` },
      ],
      [{ text: "⬅️ Назад до каталогу", callback_data: "back_to_catalog" }],
    ],
  };
}

function getCartKeyboard(): InlineKeyboardMarkup {
  return {
    inline_keyboard: [
      [
        { text: "🗑 Очистити кошик", callback_data: "clear_cart" },
        { text: "✅ Оформити замовлення", callback_data: "checkout" },
      ],
    ],
  };
}

function formatCart(chatId: number): string {
  const cart = userCarts.get(chatId) || [];

  if (cart.length === 0) {
    return "🛒 Ваш кошик порожній";
  }

  let text = "🛒 <b>Ваш кошик:</b>\n\n";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.medicine.price * item.quantity;
    total += itemTotal;
    text += `${index + 1}. <b>${item.medicine.name}</b>\n`;
    text += `   Кількість: ${item.quantity} шт.\n`;
    text += `   Ціна за шт.: ${item.medicine.price}₴\n`;
    text += `   Сума: ${itemTotal}₴\n\n`;
  });

  text += `💰 <b>Загальна сума: ${total}₴</b>`;

  return text;
}

async function addToCart(chatId: number, medicineId: string): Promise<boolean> {
  try {
    await connectDB();

    const medicine = await MedicineProductModel.findById(medicineId).lean();
    if (!medicine || medicine.stock <= 0) return false;

    const cart = userCarts.get(chatId) || [];
    const existingItem = cart.find((item) => item.medicine._id === medicineId);

    if (existingItem) {
      if (existingItem.quantity + 1 <= medicine.stock) {
        existingItem.quantity += 1;
      } else {
        return false;
      }
    } else {
      cart.push({
        medicine: {
          _id: medicine._id.toString(),
          name: medicine.name,
          price: medicine.price,
          description: medicine.description,
          stock: medicine.stock,
        },
        quantity: 1,
      });
    }

    userCarts.set(chatId, cart);
    return true;
  } catch (error) {
    console.error("Error adding to cart:", error);
    return false;
  }
}

async function getUserOrders(telegramUserId: number) {
  try {
    await connectDB();
    const orders = await TelegramOrderModel.find({ telegramUserId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    return orders;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}

async function createOrder(
  telegramUserId: number,
  userName: string,
  phone: string,
  address: string,
  cartItems: CartItem[]
): Promise<string | null> {
  try {
    await connectDB();

    const orderNumber = `TG${Date.now()}`;
    const items = cartItems.map((item) => ({
      medicineId: item.medicine._id,
      medicineName: item.medicine.name,
      price: item.medicine.price,
      quantity: item.quantity,
      totalPrice: item.medicine.price * item.quantity,
    }));

    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const order = new TelegramOrderModel({
      telegramUserId,
      orderNumber,
      userName,
      phone,
      address,
      items,
      totalAmount,
      status: "pending",
    });

    await order.save();

    for (const item of cartItems) {
      await MedicineProductModel.findByIdAndUpdate(item.medicine._id, {
        $inc: { stock: -item.quantity },
      });
    }

    return orderNumber;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const chatId = callbackQuery.from.id;
      const data = callbackQuery.data;

      await answerCallbackQuery(callbackQuery.id);

      if (data === "back_to_catalog") {
        const keyboard = await getCatalogKeyboard();
        await sendMessage(
          chatId,
          "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
          keyboard
        );
      } else if (data.startsWith("medicine_")) {
        const medicineId = data.replace("medicine_", "");

        try {
          await connectDB();
          const medicine = await MedicineProductModel.findById(
            medicineId
          ).lean();

          if (medicine) {
            const text =
              `💊 <b>${medicine.name}</b>\n\n` +
              `💰 Ціна: ${medicine.price}₴\n` +
              `📝 Опис: ${medicine.description || "Немає опису"}\n` +
              `📦 Наявність: ${
                medicine.stock > 0
                  ? `${medicine.stock} шт. ✅`
                  : "Немає в наявності ❌"
              }`;

            await sendMessage(chatId, text, getMedicineKeyboard(medicineId));
          }
        } catch (error) {
          console.error("Error fetching medicine:", error);
          await sendMessage(
            chatId,
            "❌ Помилка завантаження інформації про товар"
          );
        }
      } else if (data.startsWith("add_to_cart_")) {
        const medicineId = data.replace("add_to_cart_", "");
        const success = await addToCart(chatId, medicineId);

        if (success) {
          await sendMessage(chatId, "✅ Товар додано в кошик!");
        } else {
          await sendMessage(
            chatId,
            "❌ Не вдалося додати товар. Можливо, його немає в наявності або кількість перевищує залишки."
          );
        }
      } else if (data.startsWith("details_")) {
        const medicineId = data.replace("details_", "");

        try {
          await connectDB();
          const medicine = await MedicineProductModel.findById(
            medicineId
          ).lean();

          if (medicine) {
            const text =
              `📋 <b>Детальна інформація:</b>\n\n` +
              `💊 Назва: ${medicine.name}\n` +
              `💰 Ціна: ${medicine.price}₴\n` +
              `🏭 Постачальник: ${medicine.suppliers}\n` +
              `📝 Опис: ${medicine.description || "Немає опису"}\n` +
              `📦 Наявність: ${
                medicine.stock > 0
                  ? `${medicine.stock} шт. ✅`
                  : "Немає в наявності ❌"
              }\n` +
              `📂 Категорія: ${medicine.category}\n\n` +
              `⚠️ Перед застосуванням обов'язково проконсультуйтесь з лікарем!`;

            await sendMessage(chatId, text);
          }
        } catch (error) {
          console.error("Error fetching medicine details:", error);
          await sendMessage(chatId, "❌ Помилка завантаження деталей товару");
        }
      } else if (data === "clear_cart") {
        userCarts.set(chatId, []);
        await sendMessage(chatId, "🗑 Кошик очищено!");
      } else if (data === "checkout") {
        const cart = userCarts.get(chatId) || [];
        if (cart.length === 0) {
          await sendMessage(
            chatId,
            "❌ Кошик порожній! Додайте товари для оформлення замовлення."
          );
          return NextResponse.json({ ok: true });
        }

        userStates.set(chatId, "awaiting_phone");
        await sendMessage(
          chatId,
          "📞 Для оформлення замовлення введіть ваш номер телефону:\n(у форматі +380xxxxxxxxx)"
        );
      }

      return NextResponse.json({ ok: true });
    }

    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text;
    const firstName = body?.message?.from?.first_name || "Користувач";
    const username = body?.message?.from?.username || firstName;

    if (!chatId || !text) {
      return NextResponse.json({ ok: true });
    }

    const userState = userStates.get(chatId);

    if (userState === "awaiting_phone") {
      const phoneRegex = /^\+380\d{9}$/;
      if (phoneRegex.test(text)) {
        const orderData = userOrderData.get(chatId) || {};
        orderData.phone = text;
        userOrderData.set(chatId, orderData);

        userStates.set(chatId, "awaiting_address");
        await sendMessage(chatId, "📍 Тепер введіть адресу доставки:");
      } else {
        await sendMessage(
          chatId,
          "❌ Неправильний формат номера. Введіть номер у форматі +380xxxxxxxxx"
        );
      }
      return NextResponse.json({ ok: true });
    }

    if (userState === "awaiting_address") {
      const cart = userCarts.get(chatId) || [];
      const orderData = userOrderData.get(chatId) || {};

      if (!orderData.phone) {
        await sendMessage(
          chatId,
          "❌ Помилка: номер телефону не знайдено. Почніть заново."
        );
        userStates.delete(chatId);
        userOrderData.delete(chatId);
        return NextResponse.json({ ok: true });
      }

      const orderNumber = await createOrder(
        chatId,
        username,
        orderData.phone,
        text,
        cart
      );

      if (orderNumber) {
        const total = cart.reduce(
          (sum, item) => sum + item.medicine.price * item.quantity,
          0
        );

        userCarts.set(chatId, []);
        userStates.delete(chatId);
        userOrderData.delete(chatId);

        const orderText =
          `✅ <b>Замовлення прийнято!</b>\n\n` +
          `📦 Номер замовлення: #${orderNumber}\n` +
          `💰 Сума: ${total}₴\n` +
          `📞 Телефон: ${orderData.phone}\n` +
          `📍 Адреса: ${text}\n\n` +
          `⏰ Очікуйте дзвінка протягом 30 хвилин для підтвердження.\n` +
          `🚚 Доставка протягом 1-2 годин.`;

        await sendMessage(chatId, orderText, getMainKeyboard());
      } else {
        await sendMessage(
          chatId,
          "❌ Помилка при створенні замовлення. Спробуйте ще раз."
        );
        userStates.delete(chatId);
        userOrderData.delete(chatId);
      }

      return NextResponse.json({ ok: true });
    }

    const greetings = [
      "привіт",
      "hello",
      "hi",
      "добрий день",
      "доброго дня",
      "вітаю",
      "/start",
    ];
    const lowerText = text.toLowerCase();

    if (greetings.some((greeting) => lowerText.includes(greeting))) {
      await sendMessage(
        chatId,
        `👋 Вітаємо, ${firstName}!\n\n🏥 <b>Онлайн Аптека "${
          process.env.NEXT_PUBLIC_PHARMACY_NAME || "Фарма+"
        }"</b>\n\nУ нас ви можете:\n• Переглянути каталог ліків\n• Додати товари в кошик\n• Оформити замовлення з доставкою\n\nОберіть команду для продовження:`,
        getMainKeyboard()
      );
    } else if (text === "💊 Каталог") {
      const keyboard = await getCatalogKeyboard();
      await sendMessage(
        chatId,
        "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
        keyboard
      );
    } else if (text === "🛒 Кошик") {
      const cartText = formatCart(chatId);
      const cart = userCarts.get(chatId) || [];
      const keyboard = cart.length > 0 ? getCartKeyboard() : undefined;
      await sendMessage(chatId, cartText, keyboard);
    } else if (text === "📦 Мої замовлення") {
      const orders = await getUserOrders(chatId);

      if (orders.length === 0) {
        await sendMessage(
          chatId,
          "📦 <b>Історія замовлень:</b>\n\nУ вас поки що немає замовлень.\nОформіть своє перше замовлення через каталог!"
        );
      } else {
        let ordersText = "📦 <b>Ваші замовлення:</b>\n\n";
        orders.slice(0, 5).forEach((order, index) => {
          const statusEmoji = {
            pending: "⏳",
            confirmed: "✅",
            processing: "🔄",
            shipped: "🚚",
            delivered: "📦",
            cancelled: "❌",
          };

          ordersText += `${index + 1}. Замовлення #${order.orderNumber}\n`;
          ordersText += `   Статус: ${statusEmoji[order.status]} ${
            order.status
          }\n`;
          ordersText += `   Сума: ${order.totalAmount}₴\n`;
          ordersText += `   Дата: ${new Date(
            order.createdAt
          ).toLocaleDateString("uk-UA")}\n\n`;
        });

        await sendMessage(chatId, ordersText);
      }
    } else if (text === "ℹ️ Допомога") {
      const helpText =
        `ℹ️ <b>Допомога:</b>\n\n` +
        `🔹 <b>Каталог</b> - перегляд усіх доступних ліків\n` +
        `🔹 <b>Кошик</b> - ваші обрані товари\n` +
        `🔹 <b>Замовлення</b> - історія покупок\n\n` +
        `❓ <b>Як зробити замовлення:</b>\n` +
        `1. Оберіть "Каталог"\n` +
        `2. Виберіть ліки та додайте в кошик\n` +
        `3. Перейдіть в "Кошик" та оформіть замовлення\n` +
        `4. Вкажіть телефон та адресу\n` +
        `5. Очікуйте доставку!\n\n` +
        `⚠️ <b>Увага:</b> Перед застосуванням будь-яких ліків обов'язково проконсультуйтесь з лікарем!`;

      await sendMessage(chatId, helpText);
    } else if (text === "📞 Контакти") {
      const contactText =
        `📞 <b>Контакти:</b>\n\n` +
        `🏥 Онлайн Аптека "${
          process.env.NEXT_PUBLIC_PHARMACY_NAME || "Фарма+"
        }"\n` +
        `📱 Телефон: ${
          process.env.NEXT_PUBLIC_PHARMACY_PHONE || "+380501234567"
        }\n` +
        `📧 Email: ${
          process.env.NEXT_PUBLIC_PHARMACY_EMAIL || "info@pharmacy.com"
        }\n` +
        `🌐 Сайт: ${
          process.env.NEXT_PUBLIC_PHARMACY_WEBSITE || "https://pharmacy.com"
        }\n\n` +
        `🕐 <b>Режим роботи:</b>\n` +
        `Пн-Пт: 08:00 - 22:00\n` +
        `Сб-Нд: 09:00 - 21:00\n\n` +
        `🚚 <b>Доставка:</b> по Києву та області\n` +
        `⏰ <b>Час доставки:</b> 1-2 години`;

      await sendMessage(chatId, contactText);
    } else {
      await sendMessage(
        chatId,
        `❓ Не розумію команду "${text}".\n\nОберіть дію з меню або напишіть /start для початку.`,
        getMainKeyboard()
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram error:", err);
    return NextResponse.json({ ok: false });
  }
}
