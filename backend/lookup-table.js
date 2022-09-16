const FieldName = {
    Sn: "Wind speed minimum",
    Sm: "Wind speed average",
    Sx: "Wind speed maximum",
    Dn: "Wind direction minimum",
    Dm: "Wind direction average",
    Dx: "Wind direction maximum",
    Pa: "Air pressure",
    Ta: "Air temperature",
    Tp: "Internal temperature",
    Ua: "Relative humidity",
    Rc: "Rain accumulation",
    Rd: "Rain duration",
    Ri: "Rain intensity",
    Rp: "Rain peak intensity",
    Hc: "Hail accumulation",
    Hd: "Hail duration",
    Hi: "Hail intensity",
    Hp: "Hail peak intensity",
    Th: "Heating temperature",
    Vh: "Heating voltage",
    Vs: "Supply voltage",
    Vr: "Reference voltage",
    Id: "Station ID"
};

const SensorName = {
    R1: "Anemometer",
    R2: "Barometer",
    R3: "Precipitation",
    R5: "Supervisor"
};

const SQLTables = {
    R1: "(timestamp DATETIME, Dn VARCHAR(16), Dm VARCHAR(16), Dx VARCHAR(16), Sn VARCHAR(16), Sm VARCHAR(16), Sx VARCHAR(16))",
    R2: "(timestamp DATETIME, Ta VARCHAR(16), Ua VARCHAR(16), Pa VARCHAR(16))",
    R3: "(timestamp DATETIME, Rc VARCHAR(16), Rd VARCHAR(16), Ri VARCHAR(16), Rp VARCHAR(16))",
    R5: "(timestamp DATETIME, Th VARCHAR(16), Vh VARCHAR(16), Vs VARCHAR(16), Vr VARCHAR(16), Id VARCHAR(16))"
};

const SQLFields = {
    R1: "(timestamp, Dn, Dm, Dx, Sn, Sm, Sx)",
    R2: "(timestamp, Ta, Ua, Pa)",
    R3: "(timestamp, Rc, Rd, Ri, Rp)",
    R5: "(timestamp, Th, Vh, Vs, Vr, Id)"
};

module.exports = {FieldName, SensorName, SQLTables, SQLFields};
