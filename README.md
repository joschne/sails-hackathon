# Getting Started
Install node, npm and sails like described here: [![Sails Get Started](http://sailsjs.org/get-started)]

```sh
#change in the app root
cd sails-hackathon
```

The connection to the database is configured in 'config/connections.js'

In order to access the postgres database the sails-postgres connector is needed:

```sh
#install sails-postgresql
npm install sails-postgresql                                        
```


To lift the server/app:

```sh
#lift the server
sails lift
```
