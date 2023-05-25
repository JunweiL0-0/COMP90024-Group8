import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import axios from 'axios';

export default function SentimentLineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL+'/geo_tweet/_design/General/_view/cnt_average_mood_by_month?group=true');
                const fetchedData = response.data.rows.map(item => {
                    return { month: item.key, sentiment: item.value.average_sentiment };
                });
                setData(fetchedData);
            } catch (error) {

            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Average Sentiment Over Time</h1>
            <LineChart
                width={430}
                height={210}
                data={data}
                margin={{
                    top: 3,
                    right: 10,
                    left: 5,
                    bottom: 3
                }}
            >
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="sentiment"
                    stroke="#11396e"
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
}
