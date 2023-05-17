import React, { useState, useEffect } from 'react';
import CountUp from "react-countup";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import markerIcon from './location.png'; // Adjust the path as needed
import axios from 'axios';

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
        "6ghob": [-28.0167, 153.4000],
        "7gdar": [-35.2809, 149.1300],
        "8acte": [-32.9283, 151.7817]
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


    useEffect(() => {
        // Fetch data from the backend
        const fetchTweets = axios.get('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_tweet_by_gcc?group=true');
        const fetchUsers = axios.get('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_author_by_gcc?reduce=true&group_level=1');

        axios.all([fetchTweets, fetchUsers]).then(axios.spread((tweets, users) => {
            const tweetsData = tweets.data.rows;
            const usersData = users.data.rows;

            // Convert usersData into an object for easier access
            const usersDataObject = usersData.reduce((obj, item) => {
                obj[item.key] = item.value;
                return obj;
            }, {});

            const newCities = tweetsData.map(item => {
                if (!cityNames[item.key] || !cityLocations[item.key]) {
                    console.error('Missing data for key: ', item.key);
                    return null;
                }

                return {
                    name: cityNames[item.key],
                    location: cityLocations[item.key],
                    tweets: item.value,
                    users: usersDataObject[item.key] || 0  // Get users count from usersDataObject, default to 0 if not found
                };
            }).filter(city => city !== null);

            setCities(newCities);
        })).catch(errors => {
            console.error('Error fetching data: ', errors);
        });
    }, []);  // Run once on component mount

    return (
        <div className="map-container">
            <MapContainer center={defaultCenter} zoom={4} style={{height: "100%", width: "100%"}} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="" />
                {
                    cities.map(city => (
                        <Marker position={city.location} key={city.name} icon={myIcon}>
                            <Popup>
                                <div className="rounded-box">
                                    <h2>{city.name}</h2>
                                    <p style={{whiteSpace: "nowrap"}}>Tweets: <CountUp end={city.tweets} /></p>
                                    <p style={{whiteSpace: "nowrap"}}>Users: <CountUp end={city.users} /></p>
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

