// Data Listener
require('dotenv').config();

const net = require('net');
const DBLogger = require("./dblogger.js");
const DataParser = require("./parser.js");

const host = process.env.SENSOR_HOST;
const port = parseInt(process.env.SENSOR_PORT);

const client = new net.Socket();
const reconnectInterval = 10000; // 10 sec
let intervalConnect = false;

let sensorData = {};
let buffer = "";

const connect = () => {
    client.connect(port, host, function() {
        console.log('Connected to sensor');
    });
};

const launchIntervalConnect = () => {
    if(intervalConnect) return;
    intervalConnect = setInterval(connect, reconnectInterval);
};

const clearIntervalConnect = () => {
    if(!intervalConnect) return;
    clearInterval(intervalConnect);
    intervalConnect = false;
};

client.on('connect', () => {
    console.log("Connected");
    clearIntervalConnect();
});

client.on('data', function(data) {
    buffer += String(data);
    if (buffer.includes("\r\n")) {
        let chunks = buffer.split("\r\n");
        buffer = chunks.pop();
        chunks.forEach((chunk) => {
            let parsedData = DataParser.parse(chunk);
            DBLogger.log(parsedData);
            sensorData = parsedData;
        });
    }
});

client.on('error', (err) => {
    console.log(err);
    launchIntervalConnect();
});

client.on('close', launchIntervalConnect);
client.on('end', launchIntervalConnect);
connect();

module.exports.getData = () => {
    return sensorData;
};
