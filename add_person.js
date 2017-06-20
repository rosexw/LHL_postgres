const settings = require("./settings"); // settings.json
const knex = require("knex")({
    client: 'pg',
    connection: settings,
    searchPath: 'knex,public'
});

const fname = process.argv[2];
const lname = process.argv[3];
const dob = process.argv[4];


knex('famous_people')
  .returning('*')
  .insert([{
    first_name: fname,
    last_name: lname,
    birthdate: dob
  }])
  .then((rows) =>{
    console.log(rows);
  })
  .catch((error) => {
    console.error(error);
  })

knex.destroy();
