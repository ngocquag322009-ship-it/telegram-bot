const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

// ID ADMIN (đổi thành ID của bạn)
const ADMIN_ID = 123456789;

// Lưu trạng thái user
let userState = {};

// Start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Chào bạn! Chọn chức năng:", {
        reply_markup: {
            keyboard: [
                ["💰 Nạp tiền"],
                ["🛒 Mua hàng"],
                ["📞 Liên hệ"]
            ],
            resize_keyboard: true
        }
    });
});

// Nạp tiền
bot.onText(/💰 Nạp tiền/, (msg) => {
    bot.sendMessage(msg.chat.id, `🏦 Ngân hàng: Vietcombank
STK: 123456789
Chủ TK: NGUYEN VAN A

📌 Nội dung: ID Telegram của bạn

⚠️ Nạp xong gửi bill cho admin!`);
});

// Mua hàng
bot.onText(/🛒 Mua hàng/, (msg) => {
    bot.sendMessage(msg.chat.id, `🔥 Sản phẩm:
1. Acc game - 20k
2. Proxy - 25k

👉 Nhập số (1 hoặc 2) để chọn`);
    userState[msg.chat.id] = "choosing";
});

// Xử lý tin nhắn
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Chọn sản phẩm
    if (userState[chatId] === "choosing") {
        if (text === "1") {
            userState[chatId] = { product: "Acc game", price: "20k" };
            bot.sendMessage(chatId, "Nhập ID game của bạn:");
        } else if (text === "2") {
            userState[chatId] = { product: "Proxy", price: "25k" };
            bot.sendMessage(chatId, "Nhập ID cần dùng proxy:");
        }
    }

    // Nhập ID xong
    else if (userState[chatId] && userState[chatId].product) {
        const order = userState[chatId];

        bot.sendMessage(chatId, `✅ Bạn đã chọn: ${order.product}
💰 Giá: ${order.price}

🏦 Ngân hàng: Vietcombank
STK: 123456789
Chủ TK: NGUYEN VAN A

📌 Nội dung: ${chatId}

⚠️ Chuyển khoản xong gửi bill!`);

        // Gửi cho admin
        bot.sendMessage(ADMIN_ID, `📦 Đơn mới:
User: ${chatId}
Sản phẩm: ${order.product}
Giá: ${order.price}
ID: ${text}`);

        userState[chatId] = null;
    }
});

// Liên hệ
bot.onText(/📞 Liên hệ/, (msg) => {
    bot.sendMessage(msg.chat.id, "Liên hệ admin: @yourusername");
});
