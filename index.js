require('dotenv').config();
const http = require('http');
const app = require('./src/app');

const server = http.createServer(app);
const port = parseInt(process.env.PORT);

server.listen(port, () => {
    console.log(`Server is up and running at ${port}`);
});