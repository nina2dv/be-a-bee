// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

let question = context.params.event.content.split(' ').slice(1).join(' ')

if (!question) {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: [
      `Whoops! Looks like you didn't use the prefix command properly`,
      `You must use the prefix command followed by a question`,
      '',
      'To view a list of questions I can answer use the command **!help**',
      '**For example: !ask How to change bot status?**'
    ].join('\n')
  });
  return
}

let frequencyQuery = await lib.googlesheets.query['@0.3.0'].distinct({
  range: `A:C`,
  bounds: `FIRST_EMPTY_ROW`,
  where: [
    {
      'Question__contains': question,
    },
  ],
  field: `Frequency`,
});

let frequency = parseInt(frequencyQuery.distinct.values[0])

if (frequencyQuery.distinct.values[0] === ''){
  await lib.googlesheets.query['@0.3.0'].update({
    range: `A:C`,
    bounds: 'FIRST_EMPTY_ROW',
    where: [
      {
        Question__contains: question,
      },
    ],
    fields: {
      Frequency: 1,
    },
  });
} else {
await lib.googlesheets.query['@0.3.0'].update({
  range: `A:C`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      Question__contains: question,
    },
  ],
  fields: {
    Frequency: frequency + 1,
  },
});
}

let answer = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:C`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      'Question__contains': question
    }
  ],
  limit: {
    'count': 0,
    'offset': 0
  }
});

console.log('Answer' + answer.rows[0])

if (!answer.rows.length) {
  await lib.discord.channels['@0.3.0'].messages.create({
    channel_id: `${context.params.event.channel_id}`,
    content: [
      `*Sad buzz noises...* I couldn't find any answers matching the query **${question}**.`,
      `Try running **!list** to see a list of questions I can answer or **!help** for the list of working commands!`
    ].join('\n')
  });
  return;
} 
await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `*Buzzzz!* I found an answer matching your question:`,
  embed: {
    color: 0x00AA00,
    fields: [{
      name:  answer.rows[0].fields.Question,
      value:  answer.rows[0].fields.Answer
    }]
  }
});
