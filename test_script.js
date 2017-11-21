const pg = require("pg");
const settings = require("./setting"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function output(first, last, birthdate){
  console.log('Seaching...\n',
  'Found 1 person(s) by the name', "'"+last+ "':\n",
  '- 1: ' + first, last+', born '+"'"+birthdate.toISOString().slice(0,10)+ "'");
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1", [name] , (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const person = result.rows[0];
    output(person.first_name, person.last_name, person.birthdate);
    client.end();
  });
});