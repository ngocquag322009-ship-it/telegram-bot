const TelegramBot = require('node-telegram-bot-api');

// 🔑 TOKEN (dán token mới vào đây)
const token = "8629662642:AAEnfVoLj31PlYw0eSyJpg0EeyCTtOUfP_U";

// 👤 ID ADMIN (đổi thành ID của bạn)
const ADMIN_ID = 6200196373;

const bot = new TelegramBot(token, { polling: true });

// lưu trạng thái user
let userState = {};

// START
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "👋 Chào bạn! Chọn chức năng:", {
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

// NẠP TIỀN
bot.onText(/💰 Nạp tiền/, (msg) => {
    bot.sendMessage(msg.chat.id, `
🏦 Ngân hàng: Vietcombank
STK: 9342337510
Chủ TK: BUI NGOC QUANG

📌 Nội dung: ID Telegram của bạn
⚠️ Nạp xong gửi bill cho admin!
    `);
});

// MUA HÀNG
bot.onText(/🛒 Mua hàng/, (msg) => {
    bot.sendMessage(msg.chat.id, `
🔥 Sản phẩm:
1. Acc game - 20k
2. Proxy - 25k

👉 Nhập số (1 hoặc 2) để chọn
    `);

    userState[msg.chat.id] = "choosing";
});

// XỬ LÝ TIN NHẮN
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // chọn sản phẩm
    if (userState[chatId] === "choosing") {
        if (text === "1") {
            userState[chatId] = { product: "Acc game", price: "20k" };
            bot.sendMessage(chatId, "🎮 Nhập ID game:");
        } else if (text === "2") {
            userState[chatId] = { product: "Proxy", price: "25k" };
            bot.sendMessage(chatId, "🌐 Nhập ID cần mua:");
        }
    }

    // nhập ID xong
    else if (userState[chatId] && typeof userState[chatId] === "object") {
        const order = userState[chatId];

        bot.sendMessage(chatId, `
✅ Bạn đã chọn: ${order.product}
💰 Giá: ${order.price}

🏦 Ngân hàng: Vietcombank
STK: 9342337510
Chủ TK: BUI NGOC QUANG

📌 Nội dung: ${chatId}
⚠️ Chuyển khoản xong gửi bill!
        `);

        // gửi admin
        bot.sendMessage(ADMIN_ID, `
📦 Đơn mới:
User: ${chatId}
Sản phẩm: ${order.product}
Giá: ${order.price}
ID: ${text}
        `);

        userState[chatId] = null;
    }
});

// LIÊN HỆ
bot.onText(/📞 Liên hệ/, (msg) => {
    bot.sendMessage(msg.chat.id, "📩 Liên hệ admin: @nquang32");
});
