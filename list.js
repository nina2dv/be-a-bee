// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

//request to view all questions in our spreadsheet 
let result = await lib.googlesheets.query['@0.3.0'].select({
  range: `A:C`,
  bounds: 'FIRST_EMPTY_ROW',
  where: [
    {
      'Question__not_null': true
    }
  ],
  limit: {
    'count': 0,
    'offset': 0
  }
});
console.log(result)

let questions = result.rows.map((row) => {
return row.fields.Question;
});

console.log(questions) 

await lib.discord.channels['@0.3.0'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: questions.join('\n')
});
