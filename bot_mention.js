// authenticates you with the API standard library
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let event = context.params.event;
let mentions = event.mentions;
let botMention = mentions.find(mention => mention.bot);
let content = event.content;
let author = event.author;
let message = content.replace(/<@(\d+)>/gi, ($0, $1) => {
  let mention = mentions.find(mention => mention.id === $1);
  if (mention) {
    return `<@${mention.username}>`;
  } else {
    return `<@:unknown>`;
  }
});

message = message.trim();
let botName = `<@${botMention.username}>`;
let prompt = message;

// Get rid of the bot name if it's at the start of the message
if (message.startsWith(botName)) {
  prompt = message.slice(botName.length).trim();
}

prompt = prompt || ' ';

let messageResponse = await lib.discord.channels['@0.3.4'].messages.create({
  channel_id: context.params.event.channel_id,
  content: `Generating **${prompt}**, give me a moment...`,
  tts: false,
  message_reference: {
    message_id: context.params.event.id,
    fail_if_not_exists: false
  }
});

let imageResult;

try {

  imageResult = await lib.stabilityai.api['@0.1.2'].generation.txt2img({
    model: 'stable-diffusion-v1-5',
    prompts: [
      {
        'text': prompt,
        'weight': 1
      }
    ],
    images: 1,
    steps: 30,
    cfg: 7.5,
    width: 512,
    height: 512,
    sampler: 'AUTO',
    guidance: true
  });
  
} catch (e) {
  
  let editMessageResponse = await lib.discord.channels['@0.3.4'].messages.update({
    message_id: messageResponse.id,
    channel_id: context.params.event.channel_id,
    content: `Sorry, I couldn't generate an image for **${prompt}**.`,
    embeds: [
      {
        "type": "rich",
        "title": `Error with Stability AI API`,
        "description": e.message,
        "color": 0xff4444
      }
    ]
  });
  
  return editMessageResponse;
  
}

// Changes "beautiful scenery, 50mm" to "beautiful-scenery-50mm"
let filename = prompt.replace(/[^A-Za-z0-9]+/gi, '-');

let editMessageResponse = await lib.discord.channels['@0.3.4'].messages.update({
  message_id: messageResponse.id,
  channel_id: context.params.event.channel_id,
  content: `Here's your image of **${prompt}**!`,
  attachments: [{
    file: imageResult.artifacts[0].image,
    filename: `${filename}.png`,
    description: prompt
  }]
});

return editMessageResponse;
