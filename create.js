const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let event = context.params.event
if (event.content.startsWith(`!help`)){//change the prefix to anything
await lib.discord.channels['@0.1.2'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": "",
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Command list `,
      "description": "",
      "color": 0x00FFFF,
      "fields": [
        {
          "name": `Informative commands `, //you can change this
          "value": "\`!list\` \`!ask\` \`what is a bumblebee\`"//change the commands to your commands
        },
        {
          "name": `Fun commands`, //you can change this
          "value": "\`!puns\` \`!funfacts\` \`@Buzz Bee\`" //change this to anything you want
        }
      ],
      "footer": {
        "text": `Requested by ${context.params.event.author.username}` //dont change
      }
    }
  ]
});
}
