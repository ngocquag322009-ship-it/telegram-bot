const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)

// cấu hình
let bet = 1000
let currentBet = bet
let maxStep = 10
let step = 0

// random chọn cửa
function randomChoice() {
  const arr = ["T", "X"]
  return arr[Math.floor(Math.random() * arr.length)]
}

// gửi lệnh cược
async function play(ctx) {
  const choice = randomChoice()
  const msg = `${choice} ${currentBet}`

  await ctx.telegram.sendMessage(process.env.GROUP_ID, msg)
  console.log("Đã cược:", msg)
}

// giả lập kết quả (vì không đọc được bot kia)
function fakeResult() {
  return Math.random() > 0.5 ? "win" : "lose"
}

// loop auto
async function startAuto(ctx) {
  setInterval(async () => {
    let result = fakeResult()

    if (result === "win") {
      currentBet = bet
      step = 0
      console.log("WIN -> reset")
    } else {
      step++
      currentBet *= 2
      console.log("LOSE -> gấp:", currentBet)
    }

    if (step >= maxStep) {
      console.log("Đạt max -> reset")
      currentBet = bet
      step = 0
    }

    await play(ctx)

  }, 20000) // 20 giây cược 1 lần
}

// lệnh start
bot.start((ctx) => {
  ctx.reply("Bot bắt đầu auto cược...")
  startAuto(ctx)
})

bot.launch()
