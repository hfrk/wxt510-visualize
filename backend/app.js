require('dotenv').config();

const DataParser = require("./parser.js");
const DBLogger = require("./dblogger.js");
const Windrose = require("./windrose.js");

const host = process.env.SENSOR_HOST;
const port = parseInt(process.env.SENSOR_PORT);

// Backend
const express = require('express');
const path = require('path');

const app = express();
const cors = require('cors');
let sensorData = {};

app.use(cors());

app.use('/windrose', async (req, res) => {
    let data = await Windrose.getData();
    res.status(200).send(JSON.stringify(data, null, 2))
});
app.use('/data', async (req, res) => {
  res.status(200).send(JSON.stringify(sensorData, null, 2));
});
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((err, req, res, next) => {
  console.log(err.message);
  console.log(JSON.stringify(err.stack));
});

app.listen(4000, () => {
  console.log(`Server started on port ${port}`);
});

// Data Listener
const net = require('net');
const client = new net.Socket();

client.connect(port, host, function() {
    console.log('Connected to sensor');
});

let buffer = "";
client.on('data', function(data) {
    //console.log(data, data.length);
    buffer += String(data);
    if (buffer.includes("\r\n")) {
        let chunks = buffer.split("\r\n");
        buffer = chunks.pop();
        chunks.forEach((chunk) => {
            let parsedData = DataParser.parse(chunk);
            DBLogger.log(parsedData);
            //console.log(parsedData);
            sensorData/*[parsedData.type]*/ = parsedData;
        });
        //client.destroy(); // kill client after server's response
    }
});

client.on('close', function() {
    console.log('Connection closed');
});
