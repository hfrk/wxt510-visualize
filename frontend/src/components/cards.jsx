import 'antd/es/card/style/index.css';
import { Card } from "antd";

export const InfoCard = ({children}) => {
    return (
        <Card style={{
            width: '25%',
            border: "1px solid grey",
            overflow: "hidden",
            color: 'white',
            backgroundColor: '#171819',
            boxShadow: 'rgba(0, 0, 0, 0.5) 2.4px 2.4px 3.2px',
            margin: 5,
            padding: 0}}>
            {children}
        </Card>
    );
};

export const SummaryCard = ({children}) => {
    return (
        <Card style={{
            width: 360,
            overflow: "hidden",
            color: 'black',
            backgroundColor: '#F1FFF1',
            boxShadow: 'rgba(0, 0, 0, 0.5) 2.4px 2.4px 3.2px',
            margin: 10,
            textAlign: "center",
            padding: 0}}>
            {children}
        </Card>
    );
};

export const ChartCard = ({children}) => {
    return (
        <Card style={{
            width: "100%",
            maxWidth: 560,
            border: "1px solid grey",
            overflow: "hidden",
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.5) 2.4px 2.4px 3.2px',
            margin: 10,
            padding: 0}}>
            {children}
        </Card>
    );
};