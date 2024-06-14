/**
================================================  
▀▄▀ █░ █ █▀ █▀█ █▄░█    
█░█ █▄ █ █▄ █▄█ █░▀█ 
🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ
========================================================
 Copyright (C) 2022.                                                                                        
 Licensed under the  GPL-3.0 License;                                                      
 You may not use this file except in compliance with the License.    
 It is supplied in the hope that it may be useful                                     
 * @project_name : XLICON-MD                                                              
 * @author : SALMAN Ahmad
 * @description : XLICON-MD ,A Multi-functional whatsapp bot.       
 * @version 1.0.1                                                                                             
 ========================================================
 **/

const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
//const antidelete = require('../lib/antidelete.js');
const makinol = fs.readFileSync("./media/makino.jpg");
const smlogo = fs.readFileSync("./media/makino.jpg");
//---------------------------------------------------------------------------
/*cmd({
  pattern: "antidelete",
  desc: "Enable or disable anti-delete messages",
  category: "owner",
  react: "💀",
  filename: __filename,
  use: '<on|off>',
}, async (Void, citel, Message, { isCreator }) => {
  if (!Message) return citel.reply('`Antidelete On/Off?`');
  if (!isCreator) return citel.reply(tlang().owner);
  if (Message.args && Message.args.length > 0) {
    if (Message.args[0] === 'on') {
      global.mongodb.data.chats[Message.chat].antidel = true
      await antidelete(Void, Message)
    } else if (Message.args[0] === 'off') {
      global.mongodb.data.chats[Message.chat].antidel = false
    }
  } else {
    citel.reply('`Antidelete On/Off?`');
  }
});*/

//------------------
cmd({
            pattern: "join",
            desc: "joins a group using the invitation link",
            category: "owner",
            react: "🎉",
            use: '<group link.>',
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner);
            if (!text) return citel.reply(`Please give me Query ${tlang().greet}`);
            if (!text.split(" ")[0] && !text.split(" ")[0].includes("whatsapp.com"))
                citel.reply("Senpai,The Link is Invalid, Please Send a valid whatsapp Group Link!");
            let result = text.split(" ")[0].split("https://chat.whatsapp.com/")[1];
            await Void.groupAcceptInvite(result)
                .then((res) => citel.reply("Successfully Joined Group"))
                .catch((err) => citel.reply("Oops,Could not Join Group"));

        }
    )
    //---------------------------------------------------------------------------

    cmd({
        pattern: "revoke",
        desc: "reset group link.",
        category: "group",
        react: "⚠️",
        filename: __filename,
    },
         async(Void, citel, text,{ isCreator }) => {
            if (!citel.isGroup) return citel.reply(tlang().group);

        const groupAdmins = await getAdmin(Void, citel)        
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins =groupAdmins.includes(botNumber)
        if (!isBotAdmins) return citel.reply(tlang().admin);

var code = await Void.groupRevokeInvite(citel.chat)
return citel.reply("*_Sensei,Group Link was Revoked SuccesFully_*");

    }
        )
    //---------------------------------------------------------------------------

    cmd({
        pattern: "invite",
        alias:["glink"],
        desc: "get group link.",
        category: "group",
        filename: __filename,
    },
	 async(Void, citel, text,{ isCreator }) => {
	    if (!citel.isGroup) return citel.reply(tlang().group);
	    
        const groupAdmins = await getAdmin(Void, citel)	
	    const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins =groupAdmins.includes(botNumber)
	
if (!isBotAdmins) return citel.reply(tlang().admin);
var str1 = await Void.groupInviteCode(citel.chat)
var str2 ="https://chat.whatsapp.com/"
var mergedString = `${str2}${str1}`;
let buttonMessage = {
            image: { url: makinol },
            caption: mergedString,
            footer: tlang().footer,
            headerType: 4,
            contextInfo: {
                externalAdReply: {
                    title: "Group Invite link",
                    body: "🐦Makino-md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ",
                    thumbnail: smlogo,
                    renderLargerThumbnail: false,
                    mediaType: 1,
                    mediaUrl: '',
                    sourceUrl: ``
                },
            },
        };
//return citel.reply("*_Group Invite Link Is Here_* \n*_"+mergedString+"_*");
return citel.reply(buttonMessage);
    }
	);
//---------------------------------------------------------------------------
cmd({
            pattern: "sticker",
            alias: ["stk"],
            desc: "Makes sticker of replied image/video.",
            category: "group",
            react: "🤳",
            use: '<reply to any image/video.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply(`*Sensei,You need to Mention any Image or video.*`);
            let mime = citel.quoted.mtype
            pack = Config.packname
            author = Config.author
            if (citel.quoted) {
                let media = await citel.quoted.download();
                citel.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer}, {quoted: citel });
            } else if (/video/.test(mime)) {
                if ((quoted.msg || citel.quoted)
                    .seconds > 20) return citel.reply("Cannot fetch videos longer than *20 Seconds*");
                let media = await quoted.download();
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: StickerTypes.FULL, // The sticker type
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 70, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const stikk = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {  sticker: stikk   }, {    quoted: citel });
            } else {
                citel.reply("*You did not reply to an image or video 🤦‍♂️*");
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "support",
        desc: "Sends official support link.",
        category: "group",
        react: "✨",
        filename: __filename,
    },
    async(Void, citel, text) => {
        await Void.sendMessage(`${citel.chat}`, {
            image: log0,
            caption: `*Support : Official MAKINO-MD-Support*\n*Group link:-https://chat.whatsapp.com/BRDE2Yqsj9iAkTxhnuI1AL`,
        });

    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "warn",
            desc: "Warns user in Group.",
            category: "group",
            react: "⚠️",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text,{ isCreator }) => {
             if (!citel.isGroup) return citel.reply('Anata wa baka🥲, This Command is only for group 😏.')
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins) return citel.reply('❎ Only Admin can use this command.')
 const S=m;function Z(){const F=['126402oKAcRa','date','Removing\x20User\x20because\x20Warn\x20limit\x20exceeded\x0a\x0a*All\x20Warnings.*\x0a','chat','8qachoN','580yXDZAo','groupParticipantsUpdate','114528WgITIL','reply','groupMetadata','│\x20*🔰Time:-*\x20','find','locale','log','196311jXGmuc','quoted','save','*\x0a╭─────────────◆\x0a│\x20*🍁In\x20Group:-*\x20','759700KYdstU','warnedby','pushName','reason','8dUtMfa','2BlOCqD','550MdvhLT','*----Warn----*\x0aUser:\x20@','54828ViphBF','subject','1100323uEahgH','30204512uUuJcj','*There\x20are\x20total\x20','split','│\x20*⚠️Warned\x20by:-*\x20','length','sender','setDefault','group','Asia/KOLKATA','../config','215XZLRSE','HH:mm:ss','warn','remove'];Z=function(){return F;};return Z();}(function(U,w){const c=m,s=U();while(!![]){try{const q=parseInt(c(0x1eb))/0x1*(parseInt(c(0x1f0))/0x2)+parseInt(c(0x1e7))/0x3*(parseInt(c(0x1ef))/0x4)+-parseInt(c(0x200))/0x5*(-parseInt(c(0x204))/0x6)+-parseInt(c(0x1f5))/0x7*(-parseInt(c(0x1dd))/0x8)+-parseInt(c(0x1f3))/0x9*(-parseInt(c(0x1de))/0xa)+parseInt(c(0x1f1))/0xb*(parseInt(c(0x1e0))/0xc)+-parseInt(c(0x1f6))/0xd;if(q===w)break;else s['push'](s['shift']());}catch(B){s['push'](s['shift']());}}}(Z,0x707d4));function m(Y,U){const w=Z();return m=function(s,q){s=s-0x1dd;let B=w[s];return B;},m(Y,U);}if(!citel['quoted'])return citel[S(0x1e1)]('Please\x20quote\x20a\x20user\x20master.');const timesam=moment(moment())['format'](S(0x201));moment['tz'][S(0x1fc)](S(0x1fe))[S(0x1e5)]('id');try{let metadata=await Void[S(0x1e2)](citel[S(0x207)]);await new warndb({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202),'reason':text,'group':metadata[S(0x1f4)],'warnedby':citel[S(0x1ed)],'date':timesam})[S(0x1e9)]();let ment=citel[S(0x1e8)][S(0x1fb)];Void['sendMessage'](citel['chat'],{'text':S(0x1f2)+citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+'\x0aWith\x20Reason:\x20'+text+'\x0aWarned\x20by:\x20'+citel[S(0x1ed)],'mentions':[citel[S(0x1e8)][S(0x1fb)]]},{'quoted':citel});let h=await warndb[S(0x1e4)]({'id':citel['quoted'][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});const Config=require(S(0x1ff));if(h[S(0x1fa)]>Config['warncount']){teskd=S(0x206);let h=await warndb[S(0x1e4)]({'id':citel[S(0x1e8)][S(0x1fb)][S(0x1f8)]('@')[0x0]+S(0x202)});teskd+=S(0x1f7)+h[S(0x1fa)]+'\x20\x20warnings.*\x0a';for(let i=0x0;i<h[S(0x1fa)];i++){teskd+='*'+(i+0x1)+S(0x1ea)+h[i][S(0x1fd)]+'\x0a',teskd+=S(0x1e3)+h[i][S(0x205)]+'\x0a',teskd+=S(0x1f9)+h[i][S(0x1ec)]+'\x0a',teskd+='│\x20_📍Reason:\x20'+h[i][S(0x1ee)]+'_\x0a╰─────────────◆\x0a\x0a';}citel[S(0x1e1)](teskd),await Void[S(0x1df)](citel['chat'],[citel['quoted'][S(0x1fb)]],S(0x203));}}catch(Y){console[S(0x1e6)](Y);}

        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
    cmd({
        pattern: "ujid",
        desc: "get jid of all user in a group.",
        category: "owner",
        react: "😃",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if(!isCreator) return citel.reply(tlang().owner)
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
                const participants = citel.isGroup ? await groupMetadata.participants : "";
    let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
            textt += `🧸 ${mem.id}\n`;
        }
      citel.reply(textt)

    }
)

    //---------------------------------------------------------------------------
cmd({
        pattern: "tagall",
        desc: "Tags every person of group.",
        category: "group",
        react: "✨",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const participants = citel.isGroup ? await groupMetadata.participants : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        if (!isAdmins) return citel.reply(tlang().admin);

        let textt = `
══✪〖 *TagAll of MAKINO-MD* 〗✪══

➲ *Message :* ${text ? text : "blank"}\n\n
➲ *Author:* ${Config.ownername} ♕
➲ *Bot_Name:* *🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*
`
        for (let mem of participants) {
            textt += `💎 @${mem.id.split("@")[0]}\n`;
             }
        Void.sendMessage(citel.chat, {
            text: textt,
            mentions: participants.map((a) => a.id),
        }, {
            quoted: citel,
        });
    }
)

//---------------------------------------------------------------------------
/*
cmd({
            pattern: "request",
            desc: "Sends requst to main Bot developer.",
            category: "group",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text) => {
            if (!text) return reply(`Example : ${prefix}request hello dev please add a downloader feature`);
            textt = `*| REQUEST |*`;
            teks1 = `\n\n*User* : @${
    citel.sender.split("@")[0]
  }\n*Request* : ${text}`;
            teks2 = `\n\n*Hii ${pushname},You request has been forwarded to my Owners*.\n*Please wait.......*`;
            for (let i of owner) {
                Void.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [citel.sender],
                }, {
                    quoted: citel,
                });
            }
            Void.sendMessage(citel.chat, {
                text: textt + teks2 + teks1,
                mentions: [citel.sender],
            }, {
                quoted: citel,
            });

        }
    )*/
    //---------------------------------------------------------------------------
    /*
cmd({
            pattern: "retrive",
            alias: ["vv"],
            desc: "Copies and Forwords viewonce message.",
            category: "group",
            filename: __filename,
            use: '<reply to a viewonce message.>',
        },
        async(Void, citel, text) => {
            if (!citel.quoted) return reply(`Please reply to any message Image or Video!`);
            let mime = citel.quoted.mtype
            if (/viewOnce/.test(mime)) {
                const mtype = Object.keys(quoted.message)[0];
                delete quoted.message[mtype].viewOnce;
                const msgs = proto.Message.fromObject({
                    ...quoted.message,
                  });
                const prep = generateWAMessageFromContent(citel.chat, msgs, { quoted: citel });
                await Void.relayMessage(citel.chat, prep.message, { messageId: prep.key.id });
            } else {
                await citel.reply("please, reply to viewOnceMessage");
            }
        }
    )*/
//---------------------------------------------------------------------------
cmd({
        pattern: "kik",
        desc: "Kick all numbers from a certain country",
        category: "group",
        react: "⚠️",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => 
    {        
        if (!citel.isGroup) return citel.reply(tlang().group);
        if(!text) return await citel.reply("*Which Country💀?. Example: .kik 91*")
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const groupAdmins = await getAdmin(Void, citel)
        let isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) :  false  ;
        if (!isAdmins)
        {
                if(isCreator) citel.reply("*Hey Owner, You're not an admin 🥹*")
                else return citel.reply(tlang().admin);
        }
        let find = text.split(" ")[0].replace('+' , '');
        let error = '*These Users Not Kicked* \n\t' ;
        let users = await groupMetadata.participants
        let hmanykik = 0;
        let iskikstart = false ;
        const botNumber = await Void.decodeJid(Void.user.id)
        for (let i of users) { 
                let isuseradmin  =  groupAdmins.includes(i.id) || false 
                if(i.id.startsWith(find) && !isuseradmin)
                { 
                        if(!iskikstart)
                        {
                                iskikstart = true ;
                                await citel.reply(`*_I will be Kicking ALL the Users With ${find} Country Code_*`)
                        }
                        try { await Void.groupParticipantsUpdate(citel.chat, [i.id], "remove"); hmanykik++ ;  }
                        catch (e) { console.log("I was unable to kick : " , e) }         
                }
        }
        if(hmanykik == 0) return await citel.reply(`*_Oops😴, There Is No User Found With ${find} Country Code_*`)
        else return await citel.reply(`*_Hurray, ${hmanykik.toString()} Users With ${find} Country Code kicked🙂‍↕_*\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`)
})
//---------------------------------------------------------------------------
cmd({
        pattern: "num",
        desc: "get all numbers from a certain country",
        category: "group",
        react: "❤️",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => 
    {        
        if (!citel.isGroup) return citel.reply(tlang().group);
        if(!text) return await citel.reply("*Provide Me Country Code. Example: .num 91*")
        const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
        const groupAdmins = await getAdmin(Void, citel)
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) :  false  ;
        if (!isAdmins && !isCreator ) return citel.reply(tlang().admin);
        let find = text.split(" ")[0];
        let users = await groupMetadata.participants
        let nums = `*List Of Users With ${find} Country Code*\n`
        let num = '';
        for (let i of users) {  if(i.id.startsWith(find)) num += i.id.split("@")[0] +"\n";   }
        if(!num) {nums =`*There Is No Users With ${find} Country Code*` }
        else { nums += num+Config.caption }
        await citel.reply(nums)                
})
    //---------------------------------------------------------------------------
cmd({
            pattern: "rswarn",
            desc: "Deletes all previously given warns of quoted user.",
            category: "group",
            react: "🥹 ",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text,{isCreator}) => {
            if (!isCreator) return citel.reply(tlang().owner)
            if (!citel.quoted) return citel.reply('Umm,You need to reply to a user..')
            await warndb.deleteOne({ id: citel.quoted.sender.split('@')[0] + 'warn' });
            return citel.reply(`User is free for now 🫡.\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "poll",
            desc: "Makes poll in group.",
            category: "group",
            react: "❔",
            filename: __filename,
            use: `question;option1,option2,option3.....`,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let [poll, opt] = text.split(";");
            if (text.split(";") < 2)
                return await citel.reply(
                    `${prefix}poll question;option1,option2,option3.....`
                );
            let options = [];
            for (let i of opt.split(',')) {
                options.push(i);
            }
            await Void.sendMessage(citel.chat, {
                poll: {
                    name: poll,
                    values: options
                }
            })
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "profile",
            desc: "Shows profile of user.",
            category: "group",
            react: "🙊",
            filename: __filename,
        },
        async(Void, citel, text) => {
            var bio = await Void.fetchStatus(citel.sender);
            var bioo = bio.status;
            let meh = citel.sender;
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "🌟Rookie knight";
            } else if (lvpoints <= 6) {
                var role = "🌟knight";
            } else if (lvpoints <= 8) {
                var role = "🧙‍🌟Captain Knight";
            } else if (lvpoints <= 10) {
                var role = "🌀Baby Wizard";
            } else if (lvpoints <= 12) {
                var role = "🌀Wizard";
            } else if (lvpoints <= 14) {
                var role = "🌀Wizard King";
            } else if (lvpoints <= 16) {
                var role = "❄Baby Mage";
            } else if (lvpoints <= 18) {
                var role = "❄Mage";
            } else if (lvpoints <= 20) {
                var role = "❄Master of Mage";
            } else if (lvpoints <= 22) {
                var role = "🌊Child of Nobel";
            } else if (lvpoints <= 24) {
                var role = "🌊Nobel";
            } else if (lvpoints <= 26) {
                var role = "🌊Master of Nobel";
            } else if (lvpoints <= 28) {
                var role = "☇Child of Speed";
            } else if (lvpoints <= 30) {
                var role = "☇Dominator Speed";
            } else if (lvpoints <= 32) {
                var role = "☇God of Speed";
            } else if (lvpoints <= 34) {
                var role = "🌬 Child of Light";
            } else if (lvpoints <= 36) {
                var role = "🌬 Light";
            } else if (lvpoints <= 38) {
                var role = "🌬 God of Light";
            } else if (lvpoints <= 40) {
                var role = " 🌙 Legend X";
            } else if (lvpoints <= 42) {
                var role = "🎇 Angel ";
            } else if (lvpoints <= 44) {
                var role = "🎇 Fallen Angel";
            } else if (lvpoints <= 46) {
                var role = "🎭 Nearly Devil ";
            } else if (lvpoints <= 55) {
                var role = "🔥 Immortal Devil X ";
            }
            let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Asia/Kolakata')
                .locale('id')
            try {
                pfp = await Void.profilePictureUrl(citel.sender, "image");
            } catch (e) {
                pfp = await botpic();
            }
            const profile = `
*Hii ${citel.pushName},*
*Here is your profile information*
*👤Username:* ${citel.pushName}
*⚡Bio:* ${bioo}
*🧩Role:* ${role}
*🍁Level:* ${userq.level}
*📥 Total Messages* ${ttms}
*Powered by 🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*
`;
            let buttonMessage = {
                image: {
                    url: pfp,
                },
                caption: profile,
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel,
            });

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "rank",
            desc: "Sends rank card of user.",
            category: "group",
            react: "🎉",
            filename: __filename,
        },
        async(Void, citel, text) => {
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "GOD✨";
            if (lvpoints <= 2) {
                var role = "🏳Citizen";
            } else if (lvpoints <= 4) {
                var role = "🌟 Rookie Knight";
            } else if (lvpoints <= 6) {
                var role = "🌟 Knight";
            } else if (lvpoints <= 8) {
                var role = "🌟Captain Knight";
            } else if (lvpoints <= 10) {
                var role = "🌀 Baby Wizard";
            } else if (lvpoints <= 12) {
                var role = "🌀  Wizard";
            } else if (lvpoints <= 14) {
                var role = "🌀 Wizard King";
            } else if (lvpoints <= 16) {
                var role = "💧Baby Mage";
            } else if (lvpoints <= 18) {
                var role = "💧 Mage";
            } else if (lvpoints <= 20) {
                var role = "💧 Master of Mage";
            } else if (lvpoints <= 22) {
                var role = "❄ Child Of Nobel";
            } else if (lvpoints <= 24) {
                var role = "❄ Nobel";
            } else if (lvpoints <= 26) {
                var role = "❄ Master Of Nobel";
            } else if (lvpoints <= 28) {
                var role = "☇ Baby Speed";
            } else if (lvpoints <= 30) {
                var role = "☇ Dominator Speed";
            } else if (lvpoints <= 32) {
                var role = "☇ God Of Speed";
            } else if (lvpoints <= 34) {
                var role = "🌬 Child Of Light";
            } else if (lvpoints <= 36) {
                var role = "🌬 Light";
            } else if (lvpoints <= 38) {
                var role = "🌬 God Of Light";
            } else if (lvpoints <= 40) {
                var role = "🌙 Legend X";
            } else if (lvpoints <= 42) {
                var role = "🎇 Angel";
            } else if (lvpoints <= 44) {
                var role = "🎇 Fallen Angel";
            } else if (lvpoints <= 46) {
                var role = "🎭 Nearly Devil!";
            } else if (lvpoints <= 55) {
                var role = "🔥Immortal Devil X";
            }
            let disc = citel.sender.substring(3, 7);
            let textr = '';
            textr += `*Hii ${tlang().greet} ,🌟 ${citel.pushName}∆${disc}'s* Exp\n\n`;
            let ttms = `${userq.xp}` / 8;
            textr += `*🌟Role*: ${role}\n*🟢Exp*: ${userq.xp} / ${Levels.xpFor(
    userq.level + 1
  )}\n*🏡Level*: ${userq.level}\n*Total Messages:*- ${ttms}`;
            try {
                ppuser = await Void.profilePictureUrl(citel.sender, "image");
            } catch {
                ppuser = THUMB_IMAGE;
            }
                    Void.sendMessage(citel.chat, {
                        image: await getBuffer(ppuser),
                        caption: textr,
                    }, {
                        quoted: citel,
                    });
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "leaderboard",
            alias: ["deck"],
            desc: "To check leaderboard",
            category: "general",
            react: "🏆",
            filename: __filename,
        },
        async(Void, citel) => {
            const fetchlb = await Levels.fetchLeaderboard("RandomXP", 5);
            let leadtext = `
*-------------------------------*
*--------● LeaderBoard ●--------*
*-------------------------------*
\n\n`
            for (let i = 0; i < fetchlb.length; i++) {
                const lvpoints = fetchlb[i].level
                var role = "GOD✨";
                if (lvpoints <= 2) {
                    var role = "🏳Citizen";
                } else if (lvpoints <= 4) {
                    var role = "🌟 Rookie Knight";
                } else if (lvpoints <= 6) {
                    var role = "🌟 Knight";
                } else if (lvpoints <= 8) {
                    var role = "🌟 Captain Knight";
                } else if (lvpoints <= 10) {
                    var role = "🌀 Baby Wizard";
                } else if (lvpoints <= 12) {
                    var role = "🌀 Wizard";
                } else if (lvpoints <= 14) {
                    var role = "🌀 Wizard King";
                } else if (lvpoints <= 16) {
                    var role = "💧 Baby Mage";
                } else if (lvpoints <= 18) {
                    var role = "💧 Mage";
                } else if (lvpoints <= 20) {
                    var role = "💧 Master Of Mage";
                } else if (lvpoints <= 22) {
                    var role = "❄ Child Of Nobel";
                } else if (lvpoints <= 24) {
                    var role = "❄ Nobel";
                } else if (lvpoints <= 26) {
                    var role = "❄ Master Of Nobel";
                } else if (lvpoints <= 28) {
                    var role = "☇ Child Of Speed";
                } else if (lvpoints <= 30) {
                    var role = "☇ Dominator Speed";
                } else if (lvpoints <= 32) {
                    var role = "☇ God Of Speed";
                } else if (lvpoints <= 34) {
                    var role = "🌬 Baby Light";
                } else if (lvpoints <= 36) {
                    var role = "🌬 Light";
                } else if (lvpoints <= 38) {
                    var role = "🌬 God Of Light";
                } else if (lvpoints <= 40) {
                    var role = "🌙 Legend X";
                } else if (lvpoints <= 42) {
                    var role = "🎇 Angel";
                } else if (lvpoints <= 44) {
                    var role = "🎇 Fallen Angel";
                } else if (lvpoints <= 46) {
                    var role = "🎭 Nearly Devil";
                } else if (lvpoints <= 55) {
                    var role = "🔥Immortal Devil X";
                }
                let data = await sck1.findOne({ id: fetchlb[i].userID })
                let namew = fetchlb[i].userID
                let ttms = fetchlb[i].xp / 8
                leadtext += `*${i + 1}●Name*: ${data.name}\n*●Level*: ${fetchlb[i].level}\n*●Points*: ${fetchlb[i].xp}\n*●Role*: ${role}\n*●Total messages*: ${ttms}\n\n`;
            }
            return citel.reply(leadtext)
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "promote",
            desc: "Make a replied/quoted user an admin",
            category: "group",
            react: "🎉",

            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "promote");
                await citel.reply(`User promoted successfully🥳.\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);
            } catch {
                //                citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "kick",
            desc: "Kicks replied/quoted user from group.",
            category: "group",
            react: "🦶",
            filename: __filename,
            use: '<quote|reply|number>',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!isAdmins) return citel.reply(tlang().admin);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            try {
                let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                if (!users) return;
                await Void.groupParticipantsUpdate(citel.chat, [users], "remove");
                await citel.reply(`User successfully Kicked from group🫥.\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);

            } catch {
                //                citel.reply(tlang().botAdmin);

            }
        }
    )
    //---------------------------------------------------------------------------
    //---------------------------------------------------------------------------
cmd({
            pattern: "gc",
            desc: "mute and unmute group.",
            react: "🤡",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!citel.isGroup) return citel.reply(tlang().group);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            if (!isAdmins) return citel.reply(tlang().admin);
            if (text.split(" ")[0] === "close") {
                await Void.groupSettingUpdate(citel.chat, "announcement")
                    //.then((res) => reply(`Group Chat Muted :)`))
                    .then((res) => reply(`Group Chat Muted :)`))
 741                .catch((err) => console.log(err));
            } else if (text.split(" ")[0] === "open") {
                await Void.groupSettingUpdate(citel.chat, "not_announcement")
 744                     .then((res) => reply(`Group Chat Unmuted :)`))
 745                     .catch((err) => console.log(err));
            } else {

                return citel.reply(`Group Mode:\n${prefix}group open- to open\n${prefix}group close- to close\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "grouppic",
            desc: "Sets a profile pic in Group..",
            category: "group",
            react: "🖼️",
            filename: __filename,
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;


            let mime = citel.quoted.mtype
            if (!citel.isGroup) citel.reply(tlang().group);
            if (!isAdmins) citel.reply(tlang().admin);
            if (!isBotAdmins) citel.reply(tlang().botadmin);
            if (!citel.quoted) return citel.reply(`Send/Reply Image With Caption ${command}`);
            if (!/image/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${command}`);
            if (/webp/.test(mime)) return citel.reply(`Send/Reply Image With Caption ${command}`);
            let media = await Void.downloadAndSaveMediaMessage(citel.quoted);
            await Void.updateProfilePicture(citel.chat, {
                    url: media,
                })
                .catch((err) => fs.unlinkSync(media));
            citel.reply(tlang().success);

        }
    )
    //---------------------------------------------------------------------------
    cmd({
            pattern: "tag",
            alias:["hidetag"],
            desc: "Tags every participants in a group chat.",
            category: "group",
            react: "🫣",
            filename: __filename,
            use: '<text>',
        },
        async(Void, citel, text , {isCreator}) => {
        if(!text && !citel.quoted) return citel.reply('*`Example : ${prefix}tag Hi <Text here>`*')
            if(!text){text = citel.quoted.text;}
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat).catch((e) => {}) : "";
            const participants = citel.isGroup ? await groupMetadata.participants : "";
            const groupAdmins = await getAdmin(Void, citel)
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            if (!isAdmins && !isCreator) return citel.reply(tlang().admin);
            Void.sendMessage(citel.chat, { text: text, mentions: participants.map((a) => a.id)}, { quoted: citel});
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "group",
            desc: "mute and unmute group.",
            category: "group",
            react: "👋",
            filename: __filename,
        },
        async(Void, citel, text) => {
            //if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
            //if (!citel.isGroup) return citel.reply(tlang().group);
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            if (!isAdmins) return citel.reply(tlang().admin);
                let Group = await sck.findOne({ id: citel.chat });
            if (text.split(" ")[0] == "close" || text.split(" ")[0] == "mute" ) {
                await Void.groupSettingUpdate(citel.chat, "announcement")
                    .then((res) => citel.reply(`〖 *Group settings changed* 〗\nGroup settings has been changed and Now Only Admin can send messages\n\n🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ`))
                    .catch((err) => citel.reply("Error :" +err));
            } else if (text.split(" ")[0] === "open"||text.split(" ")[0] === "unmute") {
                await Void.groupSettingUpdate(citel.chat, "not_announcement")
                    .then((res) => citel.reply(`〖 *Group settings changed* 〗\nGroup settings has been changed and Now everyone can send messages\n\n🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ`))
                    .catch((err) => citel.reply("Error : " +err));
            } 
else if(text=="Detail" || text=="Info" || text=="info" || text=="details" ) 
{
    const pp = await Void.profilePictureUrl(citel.chat, 'image').catch(_ => null) || ''
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `  ${i + 1}. wa.me/${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || citel.chat.split`-`[0] + '@s.whatsapp.net'

    let ginfos = `
      *「 INFO GROUP 」*
*▢ ID :*
   • ${groupMetadata.id}
*▢ NAME :* 
   • ${groupMetadata.subject}
*▢ Members :*
   • ${participants.length}
*▢ Group Owner :*
   • wa.me/${owner.split('@')[0]}
*▢ Admins :*
${listAdmin}
*▢ Description :*
   • ${groupMetadata.desc?.toString() || 'unknown'}
*▢ 🪢 Extra Group Configuration :*";
  • Group Nsfw :    ${Group.nsfw=='true'? '✅' : '❎'} 
  • Antilink        :    ${Group.antilink=='true'? '✅' : '❎'}
  • Economy      :    ${Group.economy=='true'? '✅' : '❎'}
  • Events         :     ${Group.events=='true'? '✅' : '❎'}
  *🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*
`.trim()
    if(Group.events=='true'){
        ginfos +="\n*▢ Wellcome Message :* \n  • "+Group.welcome;
        ginfos +="\n\n*▢ Goodbye Message :* \n  • "+Group.goodbye; 
    }
return await Void.sendMessage(citel.chat,{image:{url : pp} , caption: ginfos } , {quoted:citel })
}
else
{ 
    return await citel.send(`*_Uhh Dear Give me Query From Following Options_*
*_1:- .group Mute_*
*_2:- .group Unmute_*
*_3:- .group Info_*
*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*
`)
    //  let buttons = [{ buttonId: `${prefix}group open`, buttonText: { displayText: "📍Unmute",},type: 1,},{buttonId: `${prefix}group close`,buttonText: {displayText: "📍Mute",},type: 1, },];     await Void.sendButtonText(citel.chat,buttons,`Group Mode`, Void.user.name, citel);

}
        }
    )
    //------------------------------------------------------------------------

cmd({
            pattern: "add",
            desc: "Add that person in group",
            fromMe: true,
            category: "group",
            react: "💖",
            filename: __filename,
            use: '<number>',
        },
        async(Void, citel, text,{isCreator}) => {
            if (!citel.isGroup) return citel.reply(tlang().group);
            const groupAdmins = await getAdmin(Void, citel)
            const botNumber = await Void.decodeJid(Void.user.id)
            const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
            const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

            if (!text) return citel.reply("Sensei,provide me number🙂(you can get banned with this command tho).");
            if (!isCreator) return citel.reply(tlang().owner)
            if (!isBotAdmins) return citel.reply(tlang().botAdmin);
            let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await Void.groupParticipantsUpdate(citel.chat, [users], "add");
            await citel.reply(`*Done ✅*\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);

        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "getjids",
            desc: "Sends chat id of every groups.",
            category: "group",
            react: "💎",
            filename: __filename,
        },
        async(Void, citel, text,{ isCreator }) => {
            if (!isCreator) return citel.reply(tlang().owner)
            let getGroups = await Void.groupFetchAllParticipating();
            let groups = Object.entries(getGroups)
                .slice(0)
                .map((entry) => entry[1]);
            let anu = groups.map((v) => v.id);
            let jackhuh = `All groups jid\n\n`
            citel.reply(`Fetching jid from ${anu.length} Groups`)
            for (let i of anu) {
                let metadata = await Void.groupMetadata(i);
                await sleep(500)
                jackhuh += `*Subject:-* ${metadata.subject}\n`
                jackhuh += `*Member :* ${metadata.participants.length}\n`
                jackhuh += `*Jid:-* ${i}\n\n`
                bname = '`🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ`'

            }
            citel.reply(jackhuh)
            citel.reply(bname)

        }
    )
    //---------------------------------------------------------------------------
cmd({
        pattern: "demote",
        desc: "Demotes replied/quoted user from group",
        category: "group",
        react: "📍",
        filename: __filename,
        use: '<quote|reply|number>',
    },
    async(Void, citel, text) => {
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;

        if (!isAdmins) return citel.reply(tlang().admin);
        if (!isBotAdmins) return citel.reply(tlang().botAdmin);
        try {
            let users = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            if (!users) return;
            await Void.groupParticipantsUpdate(citel.chat, [users], "demote");
            await citel.reply(`User Demote successful.\n\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*`);
        } catch {
            //                citel.reply(tlang().botAdmin);

        }
    }
)

//---------------------------------------------------------------------------
cmd({
            pattern: "del",
            alias: ["delete"],
            desc: "Deletes message of any user",
            category: "group",
            react: "🚫",
            filename: __filename,
            use: '<quote/reply message.>',
        },
        async(Void, citel, text) => {
            if (citel.quoted.Bot) {
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })

            }
            if (!citel.quoted.isBot) {
                if (!citel.isGroup) return citel.reply(tlang().group)
                const groupAdmins = await getAdmin(Void, citel)
                const botNumber = await Void.decodeJid(Void.user.id)
                const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
                const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
                if (!isAdmins) return citel.reply('Only Admins Can delete other persons message.')
                if (!isBotAdmins) return citel.reply('I can\'t delete anyones message without getting Admin Role.')
                if (!citel.quoted) return citel.reply(`reply to any message🦶. ${tlang().greet}`);
                let { chat, fromMe, id } = citel.quoted;
                const key = {
                    remoteJid: citel.chat,
                    fromMe: false,
                    id: citel.quoted.id,
                    participant: citel.quoted.sender
                }
                await Void.sendMessage(citel.chat, { delete: key })
            }
        }
    )
    //---------------------------------------------------------------------------
cmd({
            pattern: "checkwarn",
            desc: "Check warns",
            category: "group",
            react: "🫠",
            filename: __filename,
            use: '<quoted/reply user.>',
        },
        async(Void, citel, text) => {
            if (!citel.isGroup) return citel.reply('This command is only for Group.')
            if (!citel.quoted) return citel.reply('Quote a user master.')
            teskd = `*All Warnings.*\n\n`
            let h = await warndb.find({ id: citel.quoted.sender.split('@')[0] + 'warn' })
            console.log(h)
            teskd += `*There are total ${h.length}  warnings.*\n`
            for (let i = 0; i < h.length; i++) {
                teskd += `*${i+1}*\n╭─────────────◆\n│ *🍁In Group:-* ${h[i].group}\n`
                teskd += `│ *🔰Time:-* ${h[i].date}\n`
                teskd += `│ *⚠️Warned by:-* ${h[i].warnedby}\n`
                teskd += `│ _📍Reason: ${h[i].reason}_\n╰─────────────◆\n\n*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n\n`
            }
            citel.reply(teskd)
        }

    )
    //--------------------------------------------------------------------------
    //-------------------------------------------------------------------------
cmd({ pattern: "block", desc: "Block a user", react: "🔒", category: "owner", filename: __filename }, async (Void, citel, text,{ isCreator }) => {
  if(!isCreator) return citel.reply("Only Makino-Md owner can block 😹")
  if(!text) return citel.reply("`Tag a user or quote a message to block the sender 😤`");
  let blocks = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  await citel.reply('_User Blocked 🫳🎤_');
  await Void.updateBlockStatus(blocks, 'block');
}); 

//------------------------------------------

//--------------------------
cmd({ pattern: "unblock", desc: "unBlock a user", react: "🔓", category: "owner", filename: __filename }, async (Void, citel, text,{ isCreator }) => {
if(!isCreator) return citel.reply("Only Makino-Md owner can unblock 😹") 
if(!text) return citel.reply("`Tag a user or quote a message to unblock the sender 😤`");
let unblocks = citel.mentionedJid[0] ? citel.mentionedJid[0] : citel.quoted ? citel.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
await citel.reply('_User unBlocked 🫳🎤_');
await Void.updateBlockStatus(unblocks, 'unblock');
});
//--------------------------
cmd({ pattern: "tovo", desc: "Turn a image/video to view once", category: "general", react: "🧐"}, async(Void, citel) => {
                if (!citel.quoted) return citel.reply(`Reply to an Image/Video 😶`)
                if (/image/.test(mime)) {
                    vo = await Void.downloadAndSaveMediaMessage(citel.quoted)
                    Void.sendMessage(citel.chat, {
                        image: {
                            url: vo
                        },
                        caption: `here you go!`,
                        fileLength: "999",
                        viewOnce: true
                    })
                } else if (/video/.test(mime)) {
                    vo = await Void.downloadAndSaveMediaMessage(citel.quoted)
                    Void.sendMessage(citel.chat, {
                        video: {
                            url: vo
                        },
                        caption: `Here it is!`,
                        fileLength: "99999999",
                        viewOnce: true
                    })
                }
			    });
//-------------
cmd({
	pattern: 'clear',
	desc: 'clear current whatsapp chat',
 react: "🌝",
	category: 'moderation'
}, async (Void, citel) => {
	await Void.clearChat(citel.chat)
	await citel.reply('_`Chat Cleared`_')
});
//-----------------

//---------------------------------------------------------------------------
if(Config.WORKTYPE!=='private'){
cmd({ on: "text" }, async(Void, citel) => {
    const randomXp = 8;
    let usrname = citel.pushName
    const hasLeveledUp = await Levels.appendXp(citel.sender, "RandomXP", randomXp);
    if (hasLeveledUp) {
        const sck1 = await Levels.fetch(citel.sender, "RandomXP");
        const lvpoints = sck1.level;
        var role = "GOD";
        if (lvpoints <= 2) {
            var role = "🏳Citizen";
        } else if (lvpoints <= 4) {
            var role = "🌟 Rookie Knight";
        } else if (lvpoints <= 6) {
            var role = "🌟 Knight";
        } else if (lvpoints <= 8) {
            var role = "🌟 Captain Knight";
        } else if (lvpoints <= 10) {
            var role = "🌀 Baby Wizard";
        } else if (lvpoints <= 12) {
            var role = "🌀 Wizard";
        } else if (lvpoints <= 14) {
            var role = "🌀 Wizard King";
        } else if (lvpoints <= 16) {
            var role = "💧 Baby Mage";
        } else if (lvpoints <= 18) {
            var role = "💧 Mage";
        } else if (lvpoints <= 20) {
            var role = "💧 Master Of Mage";
        } else if (lvpoints <= 22) {
            var role = "❄ Child Of Nobel";
        } else if (lvpoints <= 24) {
            var role = "❄ Nobel";
        } else if (lvpoints <= 26) {
            var role = "❄ Master Of Nobel";
        } else if (lvpoints <= 28) {
            var role = "☇ Child of Speed";
        } else if (lvpoints <= 30) {
            var role = "☇ Dominator Speed";
        } else if (lvpoints <= 32) {
            var role = "☇ God of Speed ";
        } else if (lvpoints <= 34) {
            var role = "🌬 Child Of Light";
        } else if (lvpoints <= 36) {
            var role = "🌬 Light";
        } else if (lvpoints <= 38) {
            var role = "🌬 Master Of Light";
        } else if (lvpoints <= 40) {
            var role = "🌙 Legend X";
        } else if (lvpoints <= 42) {
            var role = "🎇 Angel";
        } else if (lvpoints <= 44) {
            var role = "🎇 Fallen Angel X";
        } else if (lvpoints <= 46) {
            var role = "🎭 Nearly Devil";
        } else if (lvpoints <= 55) {
            var role = "🔥Immortal Devil X";
        } else {
            var role = "Kiddo";
        }
        if (Config.levelupmessage !== 'false') {
            await Void.sendMessage(citel.chat, {
                image: {
                    url: await botpic(),
                },
                caption: `
┎━═══{ *『 MAKINO-MD 』* }═══━❖
┃✯╭────────────···❖
┻✯│
│✯│◦➛*Wow,Someone just*
│✯│◦➛*leveled Up huh🔥*
│✯│◦➛*👤Name*: ${citel.pushName}
│✯│◦➛*⚡Level*: ${sck1.level}🌀
│✯│◦➛*💫Exp*: ${sck1.xp} / ${Levels.xpFor(sck1.level + 1)}
│✯│◦➛*📍Role*: *${role}*
│✯│◦➛*Have fun🥳*
│✯│◦➛*🐦Makino md ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*
┳✯│
┃✯╰────────────···❖
╰━═════════════━❖
`,
            }, {
                quoted: citel,
            });
        }
    }

})
}
