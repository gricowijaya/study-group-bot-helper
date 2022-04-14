const Telegraf = require('telegraf')

const bot = new Telegraf('5211773992:AAFNRjRUi7wKAHReCoIHhkQ0t2sKvNFeFbE');

//method for invoking start command
 
bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Selamat Datang pada Helper Bot! Disini bot akan membantumu dalam melakukan penulisan absensi serta monitoring pengerjaan tugas kelompok anda ! Selamat Mencoba.', {
    })
})

//method for requesting user's phone number

 bot.hears('phone', (ctx, next) => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Apakah Kami dapat meminta nomor Handphone anda?', requestPhoneKeyboard);

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

bot.launch();
