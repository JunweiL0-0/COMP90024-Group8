import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import axios from 'axios';

export default function CovidMonthLineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_covid_tweet_by_month?group=true');
                const fetchedData = response.data.rows.map(item => {
                    return { month: item.key, covidTweets: item.value.count_covid };
                });
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Covid Tweets over Time</h1>
            <LineChart
                width={430}
                height={210}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 5,
                    bottom: 5
                }}
            >
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }}></YAxis>
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="covidTweets"
                    stroke="#11396e"
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
}
