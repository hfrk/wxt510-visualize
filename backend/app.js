// Backend
require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const DataListener = require("./data-listener.js");
const Windrose = require("./windrose.js");
const Rain = require("./rain.js");

const app = express();
const serverPort = 4000;

app.use(cors());

app.use('/windrose', async (req, res) => {
    let data = await Windrose.getData();
    res.status(200).send(JSON.stringify(data, null, 2));
});
app.use('/rain', async (req, res) => {
    let data = await Rain.getData();
    res.status(200).send(JSON.stringify(data, null, 2));
});
app.use('/data', async (req, res) => {
    let data = DataListener.getData();
    res.status(200).send(JSON.stringify(data, null, 2));
});
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(JSON.stringify(err.stack));
});

app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
})
.on("error", (err) => {
    if (err.code === 'EADDRINUSE')
        throw new Error(`Port ${serverPort} is busy`);
    else
        throw err;
});
