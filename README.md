- create file 'hash.json' inside the folder 'config' and put the following code:
    {
    "token": "YOUR_HASH"
    }

- execute knex whith this command:
    npx knex migrate:latest --knexfile knexfile.js migrate:latest