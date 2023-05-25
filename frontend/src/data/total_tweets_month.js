import React, { useState, useEffect } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import axios from 'axios';



export default function TotalTweetsLineChart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_tweet_by_month?reduce=true&group=true');
                const fetchedData = response.data.rows.map(item => {
                    return { month: item.key, totalTweets: item.value };
                });
                setData(fetchedData);
            } catch (error) {
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Total Tweets by Month</h1>
            <LineChart
                width={430}
                height={210}
                data={data}
                margin={{
                    top: 3,
                    right: 10,
                    left: 5,
                    bottom: 7
                }}
            >
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="totalTweets"
                    stroke="#11396e"
                    strokeWidth={2}
                />
            </LineChart>
        </div>
    );
}
