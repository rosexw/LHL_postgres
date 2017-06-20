const settings = require("./settings"); // settings.json

const knex = require("knex")({
    client: 'pg',
    connection: settings,
    searchPath: 'knex,public'
});

const input = process.argv[2];

//http://knexjs.org/#Builder-where reference

const lookupName = (name) => {
  knex.select('*')
    .from('famous_people')
    .where('first_name', name)
    .orWhere('last_name', name)
    .then((rows) => {
      output(rows);
    })
    .then(() => {
      knex.destroy();
    });
}

const output = (rows) => {
  console.log(`Searching...`);
  console.log(`Found ${rows.length} person(s) by the name of ${input}.`);
  for (let row of rows) {
    let date = row.birthdate;
    let dformat = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${dformat}'`);
  }
}

lookupName(input);
