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

In order to access a postgres database the sails-postgres connector is needed:

```sh
#install sails-postgresql
npm install sails-postgresql                                        
```

Lift the app again.
