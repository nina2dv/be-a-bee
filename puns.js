// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


// To add more answers for your command, simply add them to this list!
let messagePrompts = [
  'What do you call a bee that lives in America? \nA USB.',
  'What does the professor bee say when a student asks a question about the course? \nIt’s on the sylla-buzz.',
  'What’s a bee’s favorite flower? \nA bee-gonia.', 'To bee or not to bee, that is the question.',
  'Only bees who are on their best bee-havior, get to go to the hive and make honey.', 'What did one bee say to the other when they landed on the same flower? “Buzz off.”', 
  'Bees can fly in the rain if they are wearing their little yellow jackets.', 'A wasp is nothing more than a wanna-bee.',
  'Why did the honey bee queen’s dessert wobble when she tried to eat it? Because it was royal jelly.', 
  'What did the sushi say to the bee? “Wasa-bee.”', 'What’s a bee’s favorite novel? *The Great Gats-bee.*', 'Which bee gives you a second chance? The plan bee.', 
  'What do you call a bee that works for the government? A pollentician.', 'Why do bees do so well in job interviews? They know all the good buzzwords.', 
  'Bee puns aren’t that great. I don’t get what all the buzz is about.', 'What do you call honey on a bee? A sticky situation.', 'Where do bees go on vacation? To the bee-ch!',
  'Bees style their hair with a honeycomb.'
];

let messageChoice = Math.floor(Math.random() * messagePrompts.length);
let message = messagePrompts[messageChoice];
   
await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `${message}`
}); 
