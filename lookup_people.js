const pg = require("pg");
const settings = require("./settings"); // settings.json

const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input =
`SELECT *
FROM famous_people
WHERE first_name = $1::text OR last_name = $1::text`

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(input, [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...");
    output(result.rows); //output: famous_people selection that matches search
    client.end();
  });
});

const output = (rows) => {
  console.log(`Found ${rows.length} person(s) by the name of ${name}.`);
  for (let row of rows) {
    let date = row.birthdate;
    let dformat = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${dformat}'`);
  }
}
