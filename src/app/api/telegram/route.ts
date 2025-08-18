import { NextRequest, NextResponse } from "next/server";

interface KeyboardMarkup {
  keyboard: { text: string }[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
}

interface InlineKeyboardMarkup {
  inline_keyboard: { text: string; callback_data: string }[][];
}

interface Medicine {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

interface CartItem {
  medicine: Medicine;
  quantity: number;
}

const medicines: Medicine[] = [
  {
    id: "1",
    name: "Парацетамол",
    price: 25,
    description: "Жарознижуючий та знеболюючий засіб",
    inStock: true,
  },
  {
    id: "2",
    name: "Ібупрофен",
    price: 45,
    description: "Протизапальний та знеболюючий препарат",
    inStock: true,
  },
  {
    id: "3",
    name: "Вітамін C",
    price: 35,
    description: "Аскорбінова кислота для підтримки імунітету",
    inStock: true,
  },
  {
    id: "4",
    name: "Аспірин",
    price: 30,
    description: "Жарознижуючий засіб",
    inStock: false,
  },
  {
    id: "5",
    name: "Вітамін D3",
    price: 120,
    description: "Для зміцнення кісток та імунітету",
    inStock: true,
  },
  {
    id: "6",
    name: "Амброксол",
    price: 65,
    description: "Відхаркуючий засіб при кашлі",
    inStock: true,
  },
];

// Тимчасове сховище кошиків користувачів
const userCarts: Map<number, CartItem[]> = new Map();
const userStates: Map<number, string> = new Map();

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

function getCatalogKeyboard(): InlineKeyboardMarkup {
  const buttons = medicines.map((med) => [
    {
      text: `${med.name} - ${med.price}₴ ${med.inStock ? "✅" : "❌"}`,
      callback_data: `medicine_${med.id}`,
    },
  ]);

  return { inline_keyboard: buttons };
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

function addToCart(chatId: number, medicineId: string): boolean {
  const medicine = medicines.find((m) => m.id === medicineId);
  if (!medicine || !medicine.inStock) return false;

  const cart = userCarts.get(chatId) || [];
  const existingItem = cart.find((item) => item.medicine.id === medicineId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ medicine, quantity: 1 });
  }

  userCarts.set(chatId, cart);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Обробка callback queries (inline кнопки)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const chatId = callbackQuery.from.id;
      const data = callbackQuery.data;

      await answerCallbackQuery(callbackQuery.id);

      if (data === "back_to_catalog") {
        await sendMessage(
          chatId,
          "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
          getCatalogKeyboard()
        );
      } else if (data.startsWith("medicine_")) {
        const medicineId = data.replace("medicine_", "");
        const medicine = medicines.find((m) => m.id === medicineId);

        if (medicine) {
          const text =
            `💊 <b>${medicine.name}</b>\n\n` +
            `💰 Ціна: ${medicine.price}₴\n` +
            `📝 Опис: ${medicine.description}\n` +
            `📦 Наявність: ${
              medicine.inStock ? "В наявності ✅" : "Немає в наявності ❌"
            }`;

          await sendMessage(chatId, text, getMedicineKeyboard(medicineId));
        }
      } else if (data.startsWith("add_to_cart_")) {
        const medicineId = data.replace("add_to_cart_", "");
        const success = addToCart(chatId, medicineId);

        if (success) {
          await sendMessage(chatId, "✅ Товар додано в кошик!");
        } else {
          await sendMessage(
            chatId,
            "❌ Не вдалося додати товар. Можливо, його немає в наявності."
          );
        }
      } else if (data.startsWith("details_")) {
        const medicineId = data.replace("details_", "");
        const medicine = medicines.find((m) => m.id === medicineId);

        if (medicine) {
          const text =
            `📋 <b>Детальна інформація:</b>\n\n` +
            `💊 Назва: ${medicine.name}\n` +
            `💰 Ціна: ${medicine.price}₴\n` +
            `📝 Опис: ${medicine.description}\n` +
            `📦 Наявність: ${
              medicine.inStock ? "В наявності ✅" : "Немає в наявності ❌"
            }\n\n` +
            `⚠️ Перед застосуванням обов'язково проконсультуйтесь з лікарем!`;

          await sendMessage(chatId, text);
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

    // Обробка звичайних повідомлень
    const chatId = body?.message?.chat?.id;
    const text = body?.message?.text;
    const firstName = body?.message?.from?.first_name || "Користувач";

    if (!chatId || !text) {
      return NextResponse.json({ ok: true });
    }

    const userState = userStates.get(chatId);

    // Обробка стану очікування телефону
    if (userState === "awaiting_phone") {
      const phoneRegex = /^\+380\d{9}$/;
      if (phoneRegex.test(text)) {
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

    // Обробка стану очікування адреси
    if (userState === "awaiting_address") {
      const cart = userCarts.get(chatId) || [];
      const total = cart.reduce(
        (sum, item) => sum + item.medicine.price * item.quantity,
        0
      );

      // Очищення кошика та стану
      userCarts.set(chatId, []);
      userStates.delete(chatId);

      const orderText =
        `✅ <b>Замовлення прийнято!</b>\n\n` +
        `📦 Номер замовлення: #${Date.now()}\n` +
        `💰 Сума: ${total}₴\n` +
        `📍 Адреса: ${text}\n\n` +
        `⏰ Очікуйте дзвінка протягом 30 хвилин для підтвердження.\n` +
        `🚚 Доставка протягом 1-2 годин.`;

      await sendMessage(chatId, orderText, getMainKeyboard());
      return NextResponse.json({ ok: true });
    }

    // Основні команди
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
        `👋 Вітаємо, ${firstName}!\n\n🏥 <b>Онлайн Аптека "${process.env.NEXT_PUBLIC_PHARMACY_NAME}"</b>\n\nУ нас ви можете:\n• Переглянути каталог ліків\n• Додати товари в кошик\n• Оформити замовлення з доставкою\n\nОберіть команду для продовження:`,
        getMainKeyboard()
      );
    } else if (text === "💊 Каталог") {
      await sendMessage(
        chatId,
        "💊 <b>Каталог ліків:</b>\n\nОберіть препарат для перегляду:",
        getCatalogKeyboard()
      );
    } else if (text === "🛒 Кошик") {
      const cartText = formatCart(chatId);
      const cart = userCarts.get(chatId) || [];
      const keyboard = cart.length > 0 ? getCartKeyboard() : undefined;
      await sendMessage(chatId, cartText, keyboard);
    } else if (text === "📦 Мої замовлення") {
      await sendMessage(
        chatId,
        "📦 <b>Історія замовлень:</b>\n\nУ вас поки що немає замовлень.\nОформіть своє перше замовлення через каталог!"
      );
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
        `🏥 Онлайн Аптека "${process.env.NEXT_PUBLIC_PHARMACY_NAME}"\n` +
        `📱 Телефон: ${process.env.NEXT_PUBLIC_PHARMACY_PHONE}\n` +
        `📧 Email: ${process.env.NEXT_PUBLIC_PHARMACY_EMAIL}\n` +
        `🌐 Сайт: ${process.env.NEXT_PUBLIC_PHARMACY_WEBSITE}\n\n` +
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
