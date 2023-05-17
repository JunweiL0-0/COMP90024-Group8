// import React, { useState, useEffect } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// import axios from 'axios';
//
// const cityMap = {
//     "1gsyd": "Sydney",
//     "2gmel": "Melb",
//     "3gbri": "Brisbane",
//     "5gper": "Perth",
//     "4gade": "Adelaide",
//     "6ghob": "Hobart",
//     "7gdar": "Dar",
//     "8acte": "Canberra"
// };
//
// const TotalTweetGcc = () => {
//     const [data, setData] = useState([]);
//
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await axios('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_tweet_by_gcc?group=true');
//                 const processedData = result.data.rows.filter(item => cityMap[item.key])
//                     .map(item => ({ name: cityMap[item.key], value: item.value }));
//                 setData(processedData);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//
//         fetchData();
//     }, []);
//
//     return (
//         <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//             <h1>Total Tweets by Greater Cities</h1>
//             <BarChart
//                 width={460}
//                 height={220}
//                 data={data}
//                 margin={{
//                     top: 0,
//                     right: 10,
//                     left: 10,
//                     bottom: 3
//                 }}
//             >
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#2560a9" barSize={30}/>
//             </BarChart>
//         </div>
//     );
// };
//
// export default TotalTweetGcc;


import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import axios from 'axios';

const cityMap = {
    "1gsyd": "Sydney",
    "2gmel": "Melb",
    "3gbri": "Brisbane",
    "5gper": "Perth",
    "4gade": "Adelaide",
    "6ghob": "Hobart",
    "7gdar": "Dar",
    "8acte": "Canberra"
};

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function TotalTweetGcc() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_tweet_by_gcc?group=true');
                const processedData = result.data.rows.filter(item => cityMap[item.key])
                    .map(item => ({name: cityMap[item.key], value: item.value}));
                setData(processedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1>Total Tweets by Greater Cities</h1>
            <PieChart width={430} height={240}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={215}
                    cy={120}
                    innerRadius={70}
                    outerRadius={90}
                    fill="#2560a9"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                />
            </PieChart>
        </div>
    );
}


