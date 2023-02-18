const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});
let content = null;
let initiated = false;
let message = context.params.event.content.toLowerCase();
if (message.startsWith('what is a ') || message.startsWith('who is a ') || message.startsWith('who was a ') || message.startsWith('what was a ') || message.startsWith('who was an ') || message.startsWith('who is an ') || message.startsWith('what was an ') || message.startsWith('what is an ')) {
  content = context.params.event.content.split(' ').slice(3).join('_');
  initiated = true;
} else {
  if (message.startsWith('who was ') || message.startsWith('who is ') || message.startsWith('what was ') || message.startsWith('what is ')) {
    content = context.params.event.content.split(' ').slice(2).join('_');
    initiated = true;
  }
}

// let link = 'https://en.wikipedia.org/wiki/' + content;
let link = 'https://www.britannica.com/topic/' + content;


if (initiated) {
  await lib.discord.channels['@0.1.0'].messages.create({
    channel_id: context.params.event.channel_id,
    content: `${link}`
  });
}
