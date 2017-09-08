const { Pool, Client } = require('pg')

exports.db_uppercase = function(str) {
    if(str)
        return str.toUpperCase();
    else
        return str;
}

exports.db = {
    databases: {
        agenda: {
            host: '192.168.250.200',
            database: 'agenda_prueba',
            user: 'agenda',
            password: '3280',
            port: 5432,
        }
    },
    connect: function(dbName) {
        const client = new Client(this.databases[dbName]);
        client.connect();
        return client;
    },
    disconnect: function(client) {
        client.end();
    },
    query: function(query, client, res, err) {
        client.query(query)
        .then(res)
        .catch(err)
    }
}