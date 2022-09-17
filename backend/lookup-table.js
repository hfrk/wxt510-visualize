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
    R1: "(timestamp DATETIME, Dn INT(4), Dm INT(4), Dx INT(4), Sn FLOAT(4), Sm FLOAT(4), Sx FLOAT(4))",
    R2: "(timestamp DATETIME, Ta FLOAT(4), Ua FLOAT(4), Pa FLOAT(4))",
    R3: "(timestamp DATETIME, Rc FLOAT(4), Rd INT(4), Ri FLOAT(4), Rp FLOAT(4))",
    R5: "(timestamp DATETIME, Th FLOAT(4), Vh VARCHAR(16), Vs FLOAT(4), Vr FLOAT(4), Id VARCHAR(16))"
};

const SQLFields = {
    R1: "(timestamp, Dn, Dm, Dx, Sn, Sm, Sx)",
    R2: "(timestamp, Ta, Ua, Pa)",
    R3: "(timestamp, Rc, Rd, Ri, Rp)",
    R5: "(timestamp, Th, Vh, Vs, Vr, Id)"
};

module.exports = {FieldName, SensorName, SQLTables, SQLFields};
