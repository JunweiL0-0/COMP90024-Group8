import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const cityMap = {
    "1gsyd": "Sydney",
    "2gmel": "Melb",
    "3gbri": "Brisbane",
    "5gper": "Perth",
    "4gade": "Adelaide",
    "6ghob": "Hobart",
    "7gdar": "Darw",
    "8acte": "Canberra"
};

const RichnessBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://172.26.131.106:8080//houseprice/_design/General/_view/cnt_median_house_price?group=true');
                const processedData = result.data.rows.filter(item => cityMap[item.key]).map(item => ({ name: cityMap[item.key], value: item.value }));
                setData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Richness by Greater Cities</h1>
            <BarChart
                width={460}
                height={220}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 13,
                    bottom: 5
                }}
            >
                <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0}/>
                <YAxis />
                <Tooltip />

                <Bar dataKey="value" fill="#2560a9" barSize={30}/>
            </BarChart>
        </div>
    );
};

export default RichnessBarChart;
