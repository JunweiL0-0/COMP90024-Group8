import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';

const MonthMoodBar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(
                    process.env.REACT_APP_URL +
                    'covid_twitter_data/_design/General/_view/cnt_covid_tweet_by_mood_and_month?group=true'
                );

                const rows = result.data.rows;
                const processedData = [];

                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    const [month, mood] = row.key;
                    const value = row.value;

                    if (mood === null) {
                        // Total count for the month
                        const total = value;

                        processedData.push({ name: month, total: total });
                    } else {
                        // Calculate the percentage relative to the total count
                        const total = processedData[processedData.length - 1].total;
                        const percentage = (value / total) * 100;

                        processedData[processedData.length - 1][mood] = percentage.toFixed(
                            2
                        );
                    }
                }

                setData(processedData);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <p></p>
            <h1>COVID Mood by Month</h1>
            <BarChart
                width={460}
                height={270}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Legend />
                <Bar dataKey="happy" stackId="a" fill="rgba(48,183,91,0.78)" />
                <Bar dataKey="neutral" stackId="a" fill="rgba(250,208,71,0.78)" />
                <Bar dataKey="unhappy" stackId="a" fill="rgba(211,45,23,0.8)" />
            </BarChart>
        </div>
    );
};

export default MonthMoodBar;