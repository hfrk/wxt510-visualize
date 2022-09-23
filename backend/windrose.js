/* return 16-direction windrose data of the last 24 hours */
require('dotenv').config();
const SQLConnection = require("./sql.js");
const { checkIfTableExist } = require("./dblogger.js");
const sensor_id = process.env.SENSOR_ID;

const DirectionIndex = {
    N   : 0,
    NNE : 1,
    NE  : 2,
    ENE : 3,
    E   : 4,
    ESE : 5,
    SE  : 6,
    SSE : 7,
    S   : 8,
    SSW : 9,
    SW  : 10,
    WSW : 11,
    W   : 12,
    WNW : 13,
    NW  : 14,
    NNW : 15
};

const getData = () => {
    let sql = `SELECT case
       when Dm >= 349 or  Dm <= 011 then 'N'
       when Dm between 012 and 033 then 'NNE'
       when Dm between 034 and 056 then 'NE'
       when Dm between 057 and 078 then 'ENE'
       when Dm between 079 and 101 then 'E'
       when Dm between 102 and 123 then 'ESE'
       when Dm between 124 and 146 then 'SE'
       when Dm between 147 and 168 then 'SSE'
       when Dm between 169 and 191 then 'S'
       when Dm between 192 and 213 then 'SSW'
       when Dm between 214 and 236 then 'SW'
       when Dm between 237 and 258 then 'WSW'
       when Dm between 259 and 281 then 'W'
       when Dm between 282 and 303 then 'WNW'
       when Dm between 304 and 326 then 'NW'
       when Dm between 327 and 348 then 'NNW'
       end as direction,
       sum(case when Sm <= 2.0 then 1 else 0 end) AS calm,
       sum(case when Sm <= 5.0 then 1 else 0 end) AS underFive,
       sum(case when Sm <= 12.0 then 1 else 0 end) AS underTwelve,
       sum(case when Sm <= 20.0 then 1 else 0 end) AS underTwenty,
       sum(case when Sm <= 30.0 then 1 else 0 end) AS underThirty,
       count(Sm) AS total
FROM ${sensor_id}R1
WHERE
  (timestamp between UTC_TIMESTAMP() - INTERVAL 24 HOUR
                 and UTC_TIMESTAMP())
GROUP BY direction;`;

    return new Promise((resolve, reject) => {
        let result = {
            calm        : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
            underFive   : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underTwelve : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underTwenty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            underThirty : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            overThirty  : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        
        checkIfTableExist({id: sensor_id, type: "R1"});
        SQLConnection.query(sql, (err, res) => {
            if (err || res === undefined)
                reject(err);
            else {
                let rawData = JSON.parse(JSON.stringify(res));
                rawData.forEach(row => {
                    let index = DirectionIndex[row.direction];
                    result.calm[index] = row.calm;
                    result.underFive[index] = row.underFive;
                    result.underTwelve[index] = row.underTwelve;
                    result.underTwenty[index] = row.underTwenty;
                    result.underThirty[index] = row.underThirty;
                    result.overThirty[index] = row.total;
                });
                resolve(result);
            }
        });
    });
};

module.exports.getData = getData;