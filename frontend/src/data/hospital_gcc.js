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

const HospitalBarChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(process.env.REACT_APP_URL+'/hospital/_design/General/_view/cnt_hospital_by_gcc?reduce=true&group_level=1');
                const processedData = result.data.rows.filter(item => cityMap[item.key]).map(item => ({ name: cityMap[item.key], hospitals: item.value }));
                setData(processedData);
            } catch (error) {

            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Hospital# by GCC</h1>
            <BarChart
                width={460}
                height={235}
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 30
                }}
            >
                <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0}/>
                <YAxis />
                <Tooltip />

                <Bar dataKey="hospitals" fill="#2560a9" barSize={30}/>
            </BarChart>
        </div>
    );
};

export default HospitalBarChart;
