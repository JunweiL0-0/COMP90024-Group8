import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const cityMap = {
    "1gsyd": "Sydney",
    "2gmel": "Melbourne",
    "3gbri": "Brisbane",
    "5gper": "Perth",
    "4gade": "Adelaide",
    "6ghob": "Hobart",
    "7gdar": "Darwin",
    "8acte": "Canberra"
};

const RichnessBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(process.env.REACT_APP_URL+'//houseprice/_design/General/_view/cnt_median_house_price?group=true');
                const processedData = result.data.rows.filter(item => cityMap[item.key]).map(item => ({ name: cityMap[item.key], median_houseprice: item.value }));
                setData(processedData);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Median House Price by GCC</h1>
            <BarChart
                width={460}
                height={230}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 13,
                    bottom: 15
                }}
            >
                <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0}/>
                <YAxis />
                <Tooltip />

                <Bar dataKey="median_houseprice" fill="#2560a9" barSize={30}/>
            </BarChart>
        </div>
    );
};

export default RichnessBarChart;
