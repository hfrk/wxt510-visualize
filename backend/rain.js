require('dotenv').config();
const SQLConnection = require("./sql.js");
const { checkIfTableExist } = require("./dblogger.js");
const sensor_id = process.env.SENSOR_ID;

const getData = () => {
    let sql = `SELECT
       HOUR(timestamp) as hour,
       sum(Rc) as accumulation,
       sum(Rd) as duration,
       avg(Ri) as avgIntensity,
       max(Rp) as maxIntensity
FROM ${sensor_id}R3
WHERE 
  (timestamp between UTC_TIMESTAMP() - interval 24 HOUR
                 and UTC_TIMESTAMP())
GROUP BY hour, DAY(timestamp)
ORDER BY AVG(timestamp);`;

    return new Promise((resolve, reject) => {
        let result = {
            labels: [],
            accumulation: [],
            duration: [],
            avgIntensity: [],
            maxIntensity: []
        };
        checkIfTableExist({id: sensor_id, type: "R3"});
        SQLConnection.query(sql, (err, res) => {
            if (err || res === undefined)
                reject(err);
            else {
                let rawData = JSON.parse(JSON.stringify(res));
                rawData.forEach(row => {
                    result.labels.push(`${row.hour}:00`);
                    result.accumulation.push(row.accumulation);
                    result.duration.push(row.duration);
                    result.avgIntensity.push(row.avgIntensity);
                    result.maxIntensity.push(row.maxIntensity);
                });
                resolve(result);
            }
        });
    });
};

module.exports.getData = getData;