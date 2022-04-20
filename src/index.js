const { Telegraf } = require('telegraf')
const axios = require('axios');
require('dotenv').config();
const token = process.env.TELEGRAM_TOKEN;
const bot = new Telegraf(token);

// help string

const helpMessage = `
Perintah_perintah yang dimiliki oleh bot ini.

clock_in -> digunakan untuk absen masuk 
clock_out -> digunakan untuk absen keluar
list_in -> melihat siapa saja yang sudah absen
list_out -> melihat siapa saja yang belum absen
progress _> melakukan input progress
list_progress -> melakukan daftar dari masing-masing progress
`

//method for invoking helpMessage command

bot.help(ctx => { 
    ctx.reply(helpMessage);
});


// method for invoking clock_in command
bot.command('clock_in', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Anda Berhasil Clock In', {
    })
});

// method for invoking clock_out command
bot.command('clock_out', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Anda Berhasil Clock Out', {
    })
});

// method for invoking list_in command
bot.command('list_in', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Daftar Absen anggota yang hadir', {
    })
});

// method for invoking list_out command
bot.command('list_out', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Daftar Absen anggota yang tidak hadir', {
    })
});

// method for invoking progress command
bot.command('progress', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Progress pengerjaan anda', {
    })
});

// method for invoking list_progress command
bot.command('list_progress', ctx => {
    let lsProg = `List Progress \n`;
    dataStore.forEach(item => {
        lsProg += `${item.id}. ${item.name}`;
    });
    console.log(ctx.from);
    ctx.reply(lsProg);
});

//method for invoking start command
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Selamat Datang pada Helper Bot! Disini bot akan membantumu dalam melakukan monitoring pengerjaan tugas kelompok anda ! Selamat Mencoba.', {
    })
})

//method for requesting user's phone number
bot.hears('phone', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Apakah kami dapat meminta nomor Handphone anda?', requestPhoneKeyboard);
})

//method for requesting user's location
bot.hears("location", (ctx) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Apakah kami dapat meminta akses dimana anda berada?', requestLocationKeyboard);
})

//constructor for providing phone number to the bot

const requestPhoneKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My phone number",
                request_contact: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }
};

//constructor for proving location to the bot
const requestLocationKeyboard = {
    "reply_markup": {
        "one_time_keyboard": true,
        "keyboard": [
            [{
                text: "My location",
                request_location: true,
                one_time_keyboard: true
            }],
            ["Cancel"]
        ]
    }

}

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  ctx.leaveChat()
})

bot.launch();
