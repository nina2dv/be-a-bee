// authenticates you with the API standard library
// type `await lib.` to display API autocomplete
const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});


// To add more answers for your command, simply add them to this list!
let messagePrompts = [
  'Bumblebees Belong to a Genus of 265 Species',
  'Bumblebees Can Detect the Nutritional Quality of Pollen',
  'Bumblebees Beat Their Wings 200 Times per Second',
  'Bumblebees Create a Vibrating Pulse for Pollination',
  'Bumblebees Have Five Eyes - two compound eyes and three tiny ocelli eyes',
  'The Biggest Bumblebees (1.6 Inches Long) Live in South America',
  'Male Bumblebees Can’t Sting',
  'Bumblebees have fast metabolisms',
  'Bumblebees Live in Colonies With 70 to 1,800 Individuals',
  'Nectar is a sweet watery substance that the bees gather. The nectar is processed in their stomachs and then they regurgitate it into the honeycomb cells. Then they fan with their wings to remove excess moisture. The final result is honey.',
  'Bumblebees have round bodies covered in soft hair called ‘pile’, making them appear and feel fuzzy.',
  'Bumblebees can regulate their body temperature.'
];

let messageChoice = Math.floor(Math.random() * messagePrompts.length);
let message = messagePrompts[messageChoice];
   
await lib.discord.channels['@0.0.6'].messages.create({
  channel_id: `${context.params.event.channel_id}`,
  content: `${message}`
}); 
