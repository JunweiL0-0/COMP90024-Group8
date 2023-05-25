import React, { useState, useEffect } from 'react';
import CountUp from "react-countup";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIcon from './location.png';
import axios from 'axios';
import geoJsonSource from './geojson.json';


const Map = () => {
    const defaultCenter = [-24.423611, 133.325];
    const myIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 32],
    });

    const [cities, setCities] = useState([]);  // Initialize cities as an empty array

    const cityLocations = {
        "1gsyd": [-33.8688, 151.2093],
        "2gmel": [-37.8136, 144.9631],
        "3gbri": [-27.4698, 153.0251],
        "5gper": [-31.9505, 115.8605],
        "4gade": [-34.9285, 138.6007],
        "6ghob": [-42.8821, 147.3271],
        "7gdar": [-12.4628, 130.8417],
        "8acte": [-35.2809, 149.1300]
    };

    const cityNames = {
        "1gsyd": "Sydney",
        "2gmel": "Melbourne",
        "3gbri": "Brisbane",
        "5gper": "Perth",
        "4gade": "Adelaide",
        "6ghob": "Hobart",
        "7gdar": "Darwin",
        "8acte": "Canberra"
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                const stateName = feature.properties.STATE_NAME;
                const population = cityPopulations[stateName];
                e.target.bindPopup(`<b>${stateName}</b><br/>Population: ${population}`).openPopup();
            },
            mouseout: (e) => {
                e.target.closePopup();
            },
        });
    };


    const getPopulationColor = (population) => {
        if (population > 5000000) {
            return "#0286ad";
        } else if (population > 1000000) {
            return "#3faed0";
        } else if (population > 500000) {
            return "#6eacc0";
        } else {
            return "#abd3df";
        }
    };

    const [geoJsonData, setGeoJsonData] = useState(geoJsonSource);
    const [cityPopulations, setCityPopulations] = useState({});
    const cityStyle = (feature) => {
        const population = cityPopulations[feature.properties.STATE_NAME];
        return {
            fillColor: getPopulationColor(population),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    };


    // const PopulationLegend = () => {
    //     const legendColors = [
    //         { color: "#0286ad", label: "Over 5,000,000" },
    //         { color: "#3faed0", label: "Over 1,000,000" },
    //         { color: "#6eacc0", label: "Over 500,000" },
    //         { color: "#abd3df", label: "Below 500,000" },
    //     ];
    //
    //     return (
    //         <div className="population-legend">
    //             {legendColors.map((item, index) => (
    //                 <div key={index}>
    //                     <span className="legend-color" style={{ backgroundColor: item.color }}></span>
    //                     <span className="legend-label">{item.label}</span>
    //                 </div>
    //             ))}
    //         </div>
    //     );
    // };
    //

    const CityBarChart = ({city}) => {
        const renderLabel = (entry) => {
            const percentage = entry.value / city.totalSentiment * 100;
            return `${percentage.toFixed(0)}%`;
        };



        return (
            <BarChart
                width={250}
                height={170}
                data={city.sentimentData}
                layout="vertical"
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <XAxis type="number"/>
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="tweets" fill="#8884d8" label={{ position: 'right', content: renderLabel }}>
                {city.sentimentData.map((entry, index) =>
                        <Cell key={`cell-${index}`} fill={['rgba(48,183,91,0.78)', 'rgba(250,208,71,0.78)', 'rgba(211,45,23,0.8)'][index % 3]} />
                    )}
                </Bar>
            </BarChart>
        );
    };

    useEffect(() => {
        const fetchTweets = axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_tweet_by_gcc?group=true');
        const fetchUsers = axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_author_by_gcc?reduce=true&group_level=1');
        const fetchSentiments = axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_tweet_by_gcc_and_mood?reduce=true&group_level=2');
        const fetchPopulation = axios.get(process.env.REACT_APP_URL+'population/_design/General/_view/cnt_population_by_gcc?group_level=1');

        axios.all([fetchTweets, fetchUsers, fetchSentiments, fetchPopulation]).then(axios.spread((tweets, users, sentiments, population) => {
            const tweetsData = tweets.data.rows;
            const usersData = users.data.rows;
            const sentimentsData = sentiments.data.rows;
            const populationData = population.data.rows;

            const usersDataObject = usersData.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
            }, {});

            const sentimentsDataObject = sentimentsData.reduce((obj, item) => {
                if (!obj[item.key[0]]) {
                    obj[item.key[0]] = { total: 0, data: [] };
                }
                obj[item.key[0]].total += item.value;
                obj[item.key[0]].data.push({
                    name: item.key[1],
                    tweets: item.value
                });
                return obj;
            }, {});

            const populationDataObject = populationData.reduce((obj, item) => {
                const key = item.key[0];  // Use the state name as the key
                obj[key] = item.value;
                return obj;
            }, {});

        setCityPopulations(populationDataObject);

            const newCities = tweetsData.map(item => {
                if (!cityNames[item.key] || !cityLocations[item.key]) {
                    return null;
                }

                return {
                    name: cityNames[item.key],
                    location: cityLocations[item.key],
                    tweets: item.value,
                    users: usersDataObject[item.key] || 0,
                    sentimentData: sentimentsDataObject[item.key] ? sentimentsDataObject[item.key].data : [],
                    totalSentiment: sentimentsDataObject[item.key] ? sentimentsDataObject[item.key].total : 0,
                };
            }).filter(city => city !== null);

            setCities(newCities);


        })).catch(errors => {

        });
    }, []);


    return (
        <div className="map-container">
            <MapContainer center={defaultCenter} zoom={4} style={{height: "100%", width: "100%"}} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
                {
                    cities.map(city => (
                        <Marker position={city.location} key={city.name} icon={myIcon}>
                            <GeoJSON data={geoJsonData} style={cityStyle} onEachFeature={onEachFeature} />
                            <Popup>
                                <div className="rounded-box">
                                    <h2>{city.name}</h2>
                                    <p style={{whiteSpace: "nowrap"}}>Tweets: <CountUp end={city.tweets} /></p>
                                    <p style={{whiteSpace: "nowrap"}}>Users: <CountUp end={city.users} /></p>
                                    <CityBarChart city={city} />
                                </div>
                            </Popup>
                        </Marker>
                    ))
                }

            </MapContainer>
        </div>
    );
}

export default Map;

