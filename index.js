const http = require('http')
const app = require('./server')
const sqConnect=require('./api/connection/db_connection')

const port = process.env.PORT || 7412;


async function connect() {
    try {
        await sqConnect.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();

const server = http.createServer(app)


sqConnect.sync().then(() => {
    server.listen(port, () => { 
        console.log(`Server running on port ${port}`);
    });
});

