
const settings = require("./setting"); // settings.json

const knex = require("knex")({
  client: 'pg',
  connection: {
    host     : settings.host,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});


const name = process.argv[2];
const last = process.argv[3];
const date = process.argv[4];

function output(first, last, birthdate){
  console.log('Seaching...\n',
  'Found 1 person(s) by the name', "'"+last+ "':\n",
  '- 1: ' + first, last+', born '+"'"+birthdate.toISOString().slice(0,10)+ "'");
}


knex('famous_people').insert({first_name:name, last_name: last, birthdate: date})

.asCallback(function(err, rows) {
  if (err) return console.error(err);
console.log('hey bitch');
   });



