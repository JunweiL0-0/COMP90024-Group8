import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['rgba(48,183,91,0.78)', 'rgba(250,208,71,0.78)', 'rgba(211,45,23,0.8)'];

export default function PieChartCovid() {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_URL+'covid_twitter_data/_design/General/_view/cnt_covid_tweet_by_mood?group=true');
                const moodData = response.data.rows.map(item => ({
                    name: item.key,
                    value: item.value
                }));
                setChartData(moodData);
            } catch (error) {

            }
        };
        fetchData();
    }, []);

    const renderLabel = (entry) => `${(entry.percent * 100).toFixed(0)}%`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>COVID Sentiment Distribution%</h1>
            <PieChart width={400} height={230}>
                <Pie
                    data={chartData}
                    cx={200}
                    cy={103}
                    labelLine={false}
                    label={renderLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
}
