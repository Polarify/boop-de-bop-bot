const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
if (!message.content.startsWith(config.prefix)) return;
let command = message.content.split(' ')[0].slice(config.prefix.length);
let args = message.content.split(' ').slice(1);

if (command == "givexp") {
    let target = message.mentions.users.first();
    if (!target) return message.reply("You need to mention a user first.");
    if (!message.guild.member(client.user).hasPermission('MANAGE_NICKNAMES')) return message.reply("I dont have permissions to managenicknames");
    message.guild.members.get(target.id).setNickname(`[XP: ${args[1]}]${target.username}`)
}
if (command == "move") {
  let target = message.mentions.users.first();
  if (!target) return message.channel.send(`You need to mention someone first befor i can move him.`);
  let test = args.slice(1).join (' ');
  let channel = message.guild.channels.find('name', test)
  if (!channel) return message.channel.send(`I cannot find the Channel **${test}**`);
  message.guild.members.get(target.id).setVoiceChannel(channel);
}
});

client.login(process.env.BOT_TOKEN);
