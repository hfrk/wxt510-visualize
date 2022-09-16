const {FieldName, SensorName} = require("./lookup-table.js");

const DataParser = {
    parse: (data) => {
        let arrData = data.split(",");

        let sensor = arrData.shift();
        let sensorId = sensor.slice(0, 1);
        let sensorType = sensor.slice(1);

        let parsedData = arrData.map(field => field.split('=', 2))
                                .map(field => `"${field[0]}":"${field[1]}"`)
                                .join();

        let result = {
            id: Number(sensorId),
            type: sensorType,
            name: SensorName[sensorType],
            data: JSON.parse(`{${parsedData}}`),
            timestamp: Date.now()
        }

        return result;
    }
}

module.exports = DataParser; 