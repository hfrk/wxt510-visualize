import './styles/App.css';
import 'antd/es/tabs/style/index.css';
import 'antd/es/list/style/index.css';
import 'antd/es/progress/style/index.css';

import { useState, useEffect } from "react";
import { Row, Col, Tabs, List } from "antd";
import { Progress } from 'antd';

import { InfoCard, SummaryCard, ChartCard } from "./components/cards";
import { LinePlot, BarPlot } from "./components/plots";
import { Windrose } from "./components/windrose";
import { WindDistribution } from "./components/wind-distribution";
import { RainSummary } from "./components/rain";

import compass from './assets/compass.svg';
import temp from './assets/temperature.svg';
import humid from './assets/humidity.svg';
import pressure from './assets/pressure.svg';

const UTCtohhmmssWIB = (time) => {
    if (isNaN(time))
      return
    time = new Date(time + 7 * 3600 * 1000);
    const hh = String(time.getUTCHours()).padStart(2, '0');
    const mm = String(time.getUTCMinutes()).padStart(2, '0');
    const ss = String(time.getUTCSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
};

const WindSummaryCard = ({data}) => {
  return (
    <SummaryCard>
      <h1>Angin:</h1>
      <Row style={{display: "flex"}}>
      <div style={{ height: 120, marginTop: 10, marginRight: 10}}>
        <Progress
          width={200}
          strokeWidth={10}
          format={(percent) => `${percent/5} km/h`}
          strokeColor={{'0%': '#32cd32', '100%': '#ff0f0f'}}
          type="dashboard"
          percent={data.Sm*5}
          gapDegree={180}
          trailColor="#aaaaaa"
        />
      </div>
      <div style={{height: 120, marginLeft: 10}}>
        <img src={compass} alt={`compass degree ${data.Dm}`}
          style={{width: 80, transform: `rotate(${(data.Dm || 0) - 180}deg)`}} />
        <h1>{data.Dm || '--'}&deg;</h1>
      </div>
      </Row>
    </SummaryCard>
  );
};

function App() {
  const [R1, setR1] = useState(null);
  const [R2, setR2] = useState(null);
  const [R3, setR3] = useState(null);
  const [R5, setR5] = useState(null);
  const [labels, setLabels] = useState({
    R1: [],
    R2: []
  });
  const [data, setData] = useState({
    Sn: [],
    Sm: [],
    Sx: [],
    Ta: [],
    Ua: [],
    Pa: [],
  });

  useEffect(() => {
    const id = setInterval(() => {
      fetch(`http://localhost:4000/data`)
      .then((response) => response.json())
      .then((sensorData) => {
        switch(sensorData.type) {
          case "R1":
            setR1(sensorData);
            if (labels.R1[-1] === UTCtohhmmssWIB(sensorData.timestamp))
              break;
            setLabels(labels => {
              return {
                R1: [...labels.R1, UTCtohhmmssWIB(sensorData.timestamp)].slice(-40),
                R2: [...labels.R2]
              }
            });
            setData(data => {
              return {
              ...data,
              Sn: [...data.Sn, Number(sensorData.data.Sn.slice(0,-1))].slice(-40),
              Sm: [...data.Sm, Number(sensorData.data.Sm.slice(0,-1))].slice(-40),
              Sx: [...data.Sx, Number(sensorData.data.Sx.slice(0,-1))].slice(-40),
              }
            });
            break;
          case "R2":
            setR2(sensorData);
            if (labels.R2.slice(-1)[0] === UTCtohhmmssWIB(sensorData.timestamp)) {
              console.log("same data");
              console.log(sensorData.timestamp, labels.R2.slice(-1)[0]);
              break;
            }
            setLabels(labels => {
              return {
                R1: [...labels.R1],
                R2: [...labels.R2, UTCtohhmmssWIB(sensorData.timestamp)].slice(-150)
              }
            });
            setData(data => {
              data.Ta.push(Number(sensorData.data.Ta.slice(0,-1)));
              data.Ua.push(Number(sensorData.data.Ua.slice(0,-1)));
              data.Pa.push(Number(sensorData.data.Pa.slice(0,-1)));
              return data;
            });
            break;
          case "R3":
            setR3(sensorData);
            break;
          case "R5":
            setR5(sensorData);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    }, 1000);
    return () => clearInterval(id);  
  }, []);

  return (
    <div className="App">
{/*      <header className="App-header">
      </header>*/}
    <Tabs centered size="large" style={{backgroundColor: "#FDFFFC", width: '100%', display: "inline-flex", padding: 10 }} type='card' items={[
  { label: 'Summary', key: 'item-summary', children: 
  <div style={{display: "inline-flex", width: '100%'}}>
    <List
      style={{width: 360, backgroundColor: "#eeeeee", boxShadow: 'rgba(0, 0, 0, 0.5) 2.4px 2.4px 3.2px', margin: 10}}
      header={<h1>Pembacaan sensor:</h1>}
      footer={<div style={{textAlign: "right"}}>Update terakhir: {UTCtohhmmssWIB(Math.max(R1?.timestamp || 0, R2?.timestamp || 0, R3?.timestamp || 0, R5?.timestamp || 0)) || 'no data'}</div>}
      bordered
    >
    <List.Item>
      <h2>Stasiun:</h2>
      <h1 style={{textAlign: "right"}}>{R5?.data?.Id || '--'}</h1>
    </List.Item>
    <List.Item>
      <h2>Suhu:</h2>
      <h1 style={{textAlign: "right"}}>{R2?.data?.Ta.slice(0,-1) || '--'} &deg;C</h1>
    </List.Item>
    <List.Item>
      <h2>Kelembapan:</h2>
      <h1 style={{textAlign: "right",}}>{R2?.data?.Ua.slice(0,-1) || '--'}%</h1>
    </List.Item>
    <List.Item>
      <h2>Tekanan udara:</h2>
      <h1 style={{textAlign: "right"}}>{R2?.data?.Pa.slice(0,-1) || '--'} mbar</h1>
    </List.Item>
    <List.Item>
      <h2>Angin:</h2>
      <h1 style={{textAlign: "right"}}>{R1?.data?.Sm.slice(0,-1) || '--'} km/h,&nbsp;&nbsp;{R1?.data?.Dm.slice(0,-1) || '--'}&deg;</h1>
    </List.Item>
    <List.Item>
      <h2>Curah hujan:</h2>
      <h1 style={{textAlign: "right"}}>{R3?.data?.Rc.slice(0,-1) || '0'} mm</h1>
    </List.Item>
    </List>
    <Col>
    <SummaryCard>
      <div style={{display: 'inline-flex', width: "100%"}}>
        <img src={temp} alt="temperature icon" width={110}/>
        <div style={{width: "80%"}}>
          <h1>Suhu:</h1>
          <Progress
            format={(percent) => null}
            percent={R2?.data?.Ta.slice(0,-1)}
            showInfo={false}
            strokeWidth={16}
            strokeColor="#DE172E"
            trailColor="#aaaaaa"
          />
          <h1 style={{color: "#DE172E"}}>{R2?.data?.Ta.slice(0,-1) || '--'} &deg;C</h1>
        </div>
      </div>
    </SummaryCard>
    <SummaryCard>
      <div style={{display: 'inline-flex', width: "100%"}}>
        <img src={humid} alt="humidity icon" width={110}/>
        <div style={{width: "80%"}}>
          <h1>Kelembapan:</h1>
          <Progress
            format={(percent) => null}
            percent={R2?.data?.Ua.slice(0,-1)}
            showInfo={false}
            strokeWidth={16}
            strokeColor="#022B50"
            trailColor="#aaaaaa"
          />
          <h1 style={{color: "#022B50"}}>{R2?.data?.Ua.slice(0,-1) || '--'}%</h1>
        </div>
      </div>
    </SummaryCard>
    <SummaryCard>
      <div style={{display: 'inline-flex', width: "100%"}}>
        <img src={pressure} alt="pressure icon" width={110}/>
        <div style={{width: "80%"}}>
          <h1>Tekanan udara:</h1>
          <Progress
            format={(percent) => null}
            percent={R2?.data?.Pa.slice(0,-1)/1013.5*100}
            showInfo={false}
            strokeWidth={16}
            strokeColor="green"
            trailColor="#aaaaaa"
          />
          <h1 style={{color: "green"}}>{R2?.data?.Pa.slice(0,-1) || '--'} mbar</h1>
        </div>
      </div>
    </SummaryCard>
    </Col>
    <Col>
    <WindSummaryCard data={{Sm: R1?.data?.Sm.slice(0,-1),
                            Dm: R1?.data?.Dm.slice(0,-1)}}/>
    <RainSummary type="short"/>
    </Col>
  </div>
  },
  { label: 'Angin', key: 'item-r1', children: 
  <Row style={{ width: '100%', display: "inline-flex" }}>
    <ChartCard>
      <Windrose />
    </ChartCard>
    <ChartCard>
      <WindDistribution />
    </ChartCard>
  </Row>
  },
  { label: 'Suhu, Kelembapan, dan Tekanan Udara', key: 'item-r2', children: 
  <Row style={{ width: '100%', display: "inline-flex" }}>
        <ChartCard>
          <LinePlot title="Suhu (Celsius)" data={data.Ta} labels={labels.R2}/>
        </ChartCard>
        <ChartCard>
          <LinePlot title="Kelembapan (%RH)" data={data.Ua} labels={labels.R2}/>
        </ChartCard>
        <ChartCard>
          <LinePlot title="Tekanan udara (hPa)" data={data.Pa} labels={labels.R2}/>
        </ChartCard>
  </Row>
  },
  { label: 'Curah Hujan', key: 'item-r3', children: 
  <Row style={{ width: '100%', display: "inline-flex" }}>
    <RainSummary type="full" />
  </Row>
  },
  { label: 'Raw Data', key: 'item-raw', children: 
  <Row style={{ width: '100%', display: "inline-flex" }}>
    <InfoCard>
      <p> Anemometer: </p>
      <ul>
        <li>Kecepatan minimum:   {R1?.data?.Sn || ''}</li>
        <li>Kecepatan rata-rata: {R1?.data?.Sm || ''}</li>
        <li>Kecepatan maksimum:  {R1?.data?.Sx || ''}</li>
        <li>Arah minimum:        {R1?.data?.Dn || ''}</li>
        <li>Arah rata-rata:      {R1?.data?.Dm || ''}</li>
        <li>Arah maksimum:       {R1?.data?.Dx || ''}</li>
        <li>Update terakhir:     {R1 ? UTCtohhmmssWIB(R1.timestamp) : "no data"}</li>
      </ul>
    </InfoCard>
    <InfoCard>
      <p> Barometer: </p>
      <ul>
        <li>Suhu:            {R2?.data?.Ta || ''}</li>
        <li>Kelembapan:      {R2?.data?.Ua || ''}</li>
        <li>Tekanan:         {R2?.data?.Pa || ''}</li>
        <li>Update terakhir: {R2 ? UTCtohhmmssWIB(R2.timestamp) : "no data"}</li>
      </ul>
    </InfoCard>
    <InfoCard>
      <p> Curah Hujan: </p>
      <ul>
        <li>Akumulasi hujan:          {R3?.data?.Rc || ''}</li>
        <li>Durasi hujan:             {R3?.data?.Rd || ''}</li>
        <li>Intensitas hujan:         {R3?.data?.Ri || ''}</li>
        <li>Intensitas hujan (maks.): {R3?.data?.Rp || ''}</li>
        <li>Akumulasi hail:           {R3?.data?.Hc || ''}</li>
        <li>Durasi hail:              {R3?.data?.Hd || ''}</li>
        <li>Intensitas hail:          {R3?.data?.Hi || ''}</li>
        <li>Intensitas hail (maks.):  {R3?.data?.Hp || ''}</li>
        <li>Update terakhir:          {R3 ? UTCtohhmmssWIB(R3.timestamp) : "no data"}</li>
      </ul>
    </InfoCard>
    <InfoCard>
      <p> Supervisor: </p>
      <ul>
        <li>Suhu heater:        {R5?.data?.Th || ''}</li>
        <li>Tegangan heater:    {R5?.data?.Vh || ''}</li>
        <li>Tegangan catu:      {R5?.data?.Vs || ''}</li>
        <li>Tegangan referensi: {R5?.data?.Vr || ''}</li>
        <li>ID stasiun:         {R5?.data?.Id || ''}</li>
        <li>Update terakhir:    {R5 ? UTCtohhmmssWIB(R5.timestamp) : "no data"}</li>
      </ul>
    </InfoCard>
  </Row>
}
]} />
    </div>
  );
}

export default App;
