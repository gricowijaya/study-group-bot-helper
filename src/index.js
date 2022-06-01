// to read .env file
require('dotenv').config();

// import the node modules
const token = process.env.TELEGRAM_TOKEN;
const { Telegraf } = require('telegraf');
const axios = require('axios');
const express = require("express");
const bot = new Telegraf(token);
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// import database query
const database = require ('./database.js');
const botcmd = require ('./botcmd.js');

const server = { port : 3000 }

app.use(cors());
app.use(bodyParser.json());

app.listen( server.port , () => console.log(`Server started, listening port: ${server.port}`));


// for date and time
let date_time = new Date();
// get current date
// adjust 0 before single digit date
let date = ("0" + date_time.getDate()).slice(-2);
// get current month
let month = ("0" + (date_time.getMonth() + 1)).slice(-2);
// get current year
let year = date_time.getFullYear();
// get current hours
let hours = date_time.getHours();
// get current minutes
let minutes = date_time.getMinutes();
// get current seconds
let seconds = date_time.getSeconds();

// store help information
const helpMessage = `
Perintah_perintah yang dimiliki oleh bot ini.

clock_in -> digunakan untuk absen masuk 
clock_out -> digunakan untuk absen keluar
list_in -> melihat siapa saja yang sudah absen
list_out -> melihat siapa saja yang belum absen
progress _> melakukan input progress
list_progress -> melakukan daftar dari masing-masing progress
`
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

// menu button list after hearing menu
bot.hears('menu', ctx => {
    console.log(ctx.from)
    let buttonHint = `Silahkan pilih tombol dibawah ini untuk melakukan melakukan Fitur Bot`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, buttonHint, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Clock In",
                        callback_data: 'clock_in'
                    },
                    {
                        text: "Clock Out",
                        callback_data: 'clock_out'
                    },
                    {
                        text: "Hint",
                        callback_data: 'hint'
                    },
                ],

            ]
        }
    })
})

//method that returns image of a dog

bot.action('clock_in', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/have_fun.jpg"
    })

    bot.telegram.sendMessage(ctx.chat.id, `Anda Berhasil Clock In pada ${year} - ${month} - ${date}  ${hours} : ${minutes} : ${seconds}`, {
    })
})

// method for clock_out

bot.action('clock_out', ctx => {

// prints date & time in YYYY-MM-DD HH:MM:SS format
    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/thank_you.jpg"
    })

    bot.telegram.sendMessage(ctx.chat.id, `Anda Berhasil Clock Out pada ${year} - ${month} - ${date}  ${hours} : ${minutes} : ${seconds}`, {
    })

})

//method for invoking hint command returns helpMessage

bot.action('hint', ctx => {
    bot.help(ctx => { 
        ctx.reply(helpMessage);
    });

})

bot.launch();