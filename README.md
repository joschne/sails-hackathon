# Getting Started
Install node, npm and sails like described here: [Sails Get Started](http://sailsjs.org/get-started)

```sh
#change in the app root
cd sails-hackathon
```

To lift the server/app:

```sh
#lift the server
sails lift
```

##Database Connection
A database server is needed. Configure the connection to the database in `config/connections.js` and `config/env/development.js`.

`config/connections.js`:
```js
  PostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'localhost',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'hackathon'
  }
```

If we manage to host a postgres DB <a href="http://sailsjs.org/documentation/reference/configuration/sails-config-connections" title="see example">remotely</a>, we can work on the same data/database in different ways:
<ul>
  <li>With Clients (the CLI of psql or the GUI PgAdmin III) we can fill the Database, manipulate data and develop custom quieries.</li>
  <li>With this sails app in order to make a GUI in HTML5/JavaScript.</li>
</ul>

In order to access a postgres database the sails-postgres connector is needed. Within the app root do:

```sh
#install sails-postgresql
npm install sails-postgresql                                        
```

Lift the app again.
