const fs = require('fs-extra')
if (fs.existsSync('config.env')) require('dotenv').config({ path: __dirname+'/config.env' })


//═══════[Required Variables]════════\\
global.owner = process.env.OWNER_NUMBER || '2348100835767'  // Make SURE its Not Be Empty, Else Bot Stoped And Errors,
global.mongodb = process.env.MONGODB_URI || "mongodb+srv://casinobot:123johniphone@cluster0.nfztvsi.mongodb.net/?retryWrites=true&w=majority"
global.port= process.env.PORT || 5000
global.email = 'phoenixgibson007@gmail.com'
global.github = 'https://github.com/Anonphoenix007/MAKINO-MD'
global.location = 'Africa Lagos'
global.gurl = 'https://wa.me/2347080968564' // add your username
global.sudo = process.env.SUDO || "2348100835767"
global.devs = '2347080968564'
global.website = 'https://github.com/Anonphoenix007/MAKINO-MD' //wa.me/+91000000000000
global.THUMB_IMAGE = process.env.THUMB_IMAGE || 'https://telegra.ph/file/f1ffb3c5f386f9f8bccb5.jpg'
global.sessID = process.env.sessID || ""
global.presence = process.env.PRESENCE || "recording"
module.exports = {
 // wapresence: process.env.WAPRESENCE || "recording",// recording,composing,available,unavailable
//  sessionName: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0hVL295Z0dzRW51cGxIOTh2YmZDTjVqNmRRMjlpZFA1Ymp0bHJoRFBrST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidmpTUnRic0F0enhMeXI3WGVUeVJ3WDZHdDNDSEtqWnVtTVJIV3pqYTB3ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTjJ5OGZCU3pVZVVzaExWVmJ5eGNobUx1RnZBbkpjeDBsNTVHWmF4SFdzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4ZXlLcGNmdmFPNWd4Zi9kWUtORE1LMnllWXBMZGZXS3Y1TWtRdzkzQ2swPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdOZDZXUmlBMXV6N3NQQ0pnclBLSW9pRG5sNkJrSzIrTTdXTHNsM1JxRUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRWbXk1MUZNQkJtQUJna3hiczVqcEdmNzUwSzY4aTFpWCtkcFg3dGVMdzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU09MQjdVWFBxMXVwV3g2dnhFTS9hbHExQUhBK0VCUU44ekJaNlNBbmQzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidm9mdnV5M2ROSy9sQjBJM0pBdnVUTHNEQnJ5OUFPLzBVMVNJaWEzOW5CRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InkrUHYxSE1qaUtTVmZSR2NaRnkxQ21Kd24xVmRoZk1WeUY1QjgvTiszY2ZQS25jejZ3Vm9EVElQbzdEQkZZYUV4Qm1oMmVLTGFOQ2dJMGtzZitmUkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJPS0U2ZTVCSHZSMEpCVHJ3QVdmcHBDRDVnQ3VBNE1MNWE3KzZTTGhMQlI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJvQmVGVUctVFNaaU9FcUFTRkprZkRRIiwicGhvbmVJZCI6IjJkNTYxM2VlLTc5MTYtNGQxOS04NTExLTAxZDg2NmZiMGFiMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkaFFiVVJIbHJIc1lYQW4raGt1YmN6M2NRYzg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiODd5V0NIN0ZZMHdkRWNBeHcybENyMk5vN09nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNHOVZYSjFGIiwibWUiOnsiaWQiOiIyMzQ5MTIzNzIxMDI2OjUyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNaUgvNlVFRVBLbnRyVUdHQWNnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJWTnBuZ2F0QjVDNUxUeUZBWVBXU3dPMURFeE5vVEVpbGhveU1rRTk0akVBPSIsImFjY291bnRTaWduYXR1cmUiOiJIR0NWTFN0S0lYM3g0bWhkRitCemluTW83NWt1L0hFbmxiVkNuUHM1L2hocUN0bUpWazc3RUwwS0I1d0pFZm5CWW9JTzFKdm5ZU1MzMFgyWDdjdEFCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVTk5TnF4Q1d3VzhLckREQ1dtNENMenRCZWlIRXN3QjVjVjI5YkdLWkEzcDVHdTBwNm1RNUJXREEyWDJZNEo3RS9TNHdzeWNIcC9PZWdCcE9qanZsQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTIzNzIxMDI2OjUyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZUYVo0R3JRZVF1UzA4aFFHRDFrc0R0UXhNVGFFeElwWWFNakpCUGVJeEEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI2NTE2NDcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDVtIn0=",      //Put Your Session Id Here
  author:  process.env.PACK_AUTHER ||  'Tᴀɪʀᴀ Mᴀᴋɪɴo',
  packname:  process.env.PACK_NAME || 'MAKINO-MD ',
  numversion:  process.env.BOT_VERSION || '1.1',
  botname:   process.env.BOT_NAME === undefined ? "MAKINO-MD" : process.env.BOT_NAME,
  ownername: process.env.OWNER_NAME === undefined ? 'Tᴀɪʀᴀ Mᴀᴋɪɴᴏ' : process.env.OWNER_NAME,  
  auto_read_status :  process.env.AUTO_READ_STATUS === undefined ? false : process.env.AUTO_READ_STATUS,
  autoreaction:  process.env.AUTO_REACTION  === undefined ? false : process.env.AUTO_REACTION ,
  antibadword :  process.env.ANTI_BAD_WORD === undefined ? 'nbwoed' : process.env.ANTI_BAD_WORD,
  alwaysonline:  process.env.ALWAYS_ONLINE === undefined ? true : process.env.ALWAYS_ONLINE,//Do not edit this line at all.
  antifake : process.env.FAKE_COUNTRY_CODE === undefined ? '234' : process.env.FAKE_COUNTRY_CODE,
  readmessage:  process.env.READ_MESSAGE === undefined ? false : process.env.READ_MESSAGE,
  auto_status_saver: process.env.AUTO_STATUS_SAVER === undefined ? false : process.env.AUTO_STATUS_SAVER,
  HANDLERS:  process.env.PREFIX === undefined ? ',' : process.env.PREFIX,
  PMGREET: process.env.PM_GREET === undefined ? 'Hello 👋,this is 🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ' : process.env.PM_GREET,
  warncount : process.env.WARN_COUNT === undefined ? 3 : process.env.WARN_COUNT,
  disablepm:  process.env.DISABLE_PM === undefined ? false : process.env.DISABLE_PM,
  levelupmessage:  process.env.LEVEL_UP_MESSAGE === undefined ? false : process.env.LEVEL_UP_MESSAGE,
  antilink:  process.env.ANTILINK_VALUES === undefined ? 'chat.whatsapp.com' : process.env.ANTILINK_VALUES,
  antilinkaction: process.env.ANTILINK_ACTION === undefined ? 'remove' : process.env.ANTILINK_ACTION,
  BRANCH: 'main', 
  ALIVE_MESSAGE:  process.env.ALIVE_MESSAGE === undefined ? '' : process.env.ALIVE_MESSAGE,
  autobio:  process.env.AUTO_BIO === undefined ? true : process.env.AUTO_BIO,
  caption :process.env.CAPTION || "\t*•ᴘᴏᴡᴇʀᴇᴅ ʙʏ MAKINO-MD•* ",   //『sᴜʙsᴄʀɪʙᴇ •  ᴛᴇᴄʜ x』*\n https://whatsapp.com/channel/0029Va9wmuz8F2pGIURwmo0m"),	
  OPENAI_API_KEY:  process.env.OPENAI_API_KEY === undefined ? false: process.env.OPENAI_API_KEY,
  heroku:  process.env.heroku === undefined ? false : process.env.heroku,
  HEROKU: {
    HEROKU: process.env.HEROKU ||false,
    API_KEY: process.env.HEROKU_API_KEY === undefined ? '' : process.env.HEROKU_API_KEY,
    APP_NAME: process.env.HEROKU_APP_NAME === undefined ? '' : process.env.HEROKU_APP_NAME
},
  VERSION: process.env.VERSION === undefined ? '1.1' : process.env.VERSION,
  LANG: process.env.THEME|| 'GOJO',
  WORKTYPE: process.env.WORKTYPE === undefined ? 'private' : process.env.WORKTYPE
};


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Update'${__filename}'`)
    delete require.cache[file]
	require(file)
})
 
