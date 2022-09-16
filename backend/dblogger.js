require('dotenv').config();

let mysql = require('mysql');
const {SQLFields, SQLTables} = require("./lookup-table.js");
const {SensorName} = require("./lookup-table.js");

let con = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    database: process.env.SQL_DB
});

con.connect(function(err) {
    if (err) {
        console.log("Failed to connect");
        throw err;
    }
    console.log("Connected to database");
});

const timestampToSQL = (timestamp) => {
    return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
};

const checkIfTableExist = (sensor) => {
    let sql = `CREATE TABLE IF NOT EXISTS ${sensor.id}${sensor.type} ${SQLTables[sensor.type]}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
    });
}

const validateSensorData = (sensor) => {
    let result;
    try {
        switch(sensor.name) {
        case SensorName.R1:
            if (sensor.data.Dn.endsWith('D')
             && sensor.data.Dm.endsWith('D')
             && sensor.data.Dx.endsWith('D')
             && sensor.data.Sn.endsWith('K')
             && sensor.data.Sm.endsWith('K')
             && sensor.data.Sx.endsWith('K')
             ) {
                result = [[[
                    timestampToSQL(sensor.timestamp),
                    sensor.data.Dn.slice(0,-1),
                    sensor.data.Dm.slice(0,-1),
                    sensor.data.Dx.slice(0,-1),
                    sensor.data.Sn.slice(0,-1),
                    sensor.data.Sm.slice(0,-1),
                    sensor.data.Sx.slice(0,-1)
                ]]];
            }
            break;
        case SensorName.R2:
            if (sensor.data.Ta.endsWith('C')
             && sensor.data.Ua.endsWith('P')
             && sensor.data.Pa.endsWith('H')
             ) {
                result = [[[
                    timestampToSQL(sensor.timestamp),
                    sensor.data.Ta.slice(0,-1),
                    sensor.data.Ua.slice(0,-1),
                    sensor.data.Pa.slice(0,-1)
                ]]];
            break;
        case SensorName.R3:
            if (sensor.data.Rc.endsWith('M')
             && sensor.data.Rd.endsWith('s')
             && sensor.data.Ri.endsWith('M')
             && sensor.data.Rp.endsWith('M')
             ) {
                result = [[[
                    timestampToSQL(sensor.timestamp),
                    sensor.data.Rc.slice(0,-1),
                    sensor.data.Rd.slice(0,-1),
                    sensor.data.Ri.slice(0,-1),
                    sensor.data.Rp.slice(0,-1)
                ]]];
            break;
        case SensorName.R5:
            if (sensor.data.Th.endsWith('C')
             && sensor.data.Vs.endsWith('V')
             && sensor.data.Vr.endsWith('V')
             ) {
                result = [[[
                    timestampToSQL(sensor.timestamp),
                    sensor.data.Th.slice(0,-1),
                    sensor.data.Vh,
                    sensor.data.Vs.slice(0,-1),
                    sensor.data.Vr.slice(0,-1),
                    sensor.data.Id
                ]]];
            break;
        default:
            throw 'Data Invalid';
        }
    if (result == undefined)
        throw 'Data Invalid';
    }
    return result;
}

const log = (sensor) => {
    checkIfTableExist(sensor);
    let inserts = validateSensorData(sensor);

    let sql = mysql.format(`INSERT INTO ${sensor.id}${sensor.type} ${SQLFields[sensor.type]} VALUES ?`, inserts);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(`Number of records inserted: ${result.affectedRows}`);
    });
}

module.exports.log = log;
