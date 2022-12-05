const {FieldName, SensorName} = require("./lookup-table.js");

const DataParser = {
    parse: (data) => {
        /*
         * data format:
         * [header],[field_1]=[data_1],[field_2]=[data_2],...,[field_n]=[data_n]
         * header format:
         * xRy
         * x = sensor id
         * Ry = sensor type
         * R1: "Anemometer"
         * R2: "Barometer"
         * R3: "Precipitation"
         * R5: "Supervisor"
         */
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

