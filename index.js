h const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });

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

📌 Nội dung: ID của bạn

⚠️ Nạp xong gửi bill cho admin!`);
});

// Mua hàng
bot.onText(/🛒 Mua hàng/, (msg) => {
    bot.sendMessage(msg.chat.id, `🔥 Sản phẩm:
- Acc game: 20k
- Proxy: 25k`);
});

// Liên hệ
bot.onText(/📞 Liên hệ/, (msg) => {
    bot.sendMessage(msg.chat.id, "Liên hệ admin: @yourusername");
});
