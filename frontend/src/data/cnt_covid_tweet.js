import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountUp from "react-countup";
import Popup from 'reactjs-popup';

const CovidRatio = () => {
    const [totalTwitter, setTotalTwitter] = useState(0);
    const [totalCovidTwitter, setTotalCovidTwitter] = useState(0);
    const [totalMastodon, setTotalMastodon] = useState(0);
    const [totalCovidMastodon, setTotalCovidMastodon] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            const response1 = axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_tweet');
            const response2 = axios.get(process.env.REACT_APP_URL+'covid_twitter_data/_design/General/_view/cnt_covid_tweet');
            const response3 = axios.get(process.env.REACT_APP_URL+'mastodon_data/_design/General/_view/cnt_post');
            const response4 = axios.get(process.env.REACT_APP_URL+'mastodon_data/_design/General/_view/cnt_covid_post?group=true');

            const [res1, res2, res3, res4] = await Promise.all([response1, response2, response3, response4]);

            setTotalTwitter(res1.data.rows[0].value);
            setTotalCovidTwitter(res2.data.rows[0].value);
            setTotalMastodon(res3.data.rows[0].value);
            setTotalCovidMastodon(res4.data.rows[1].value);
        };

        fetchCounts();
    }, []);

    const covidRatioTwitter = totalTwitter ? (totalCovidTwitter / totalTwitter) * 100 : 0;
    const covidRatioMastodon = totalMastodon ? (totalCovidMastodon / totalMastodon) * 100 : 0;

    return (
        <div>
            <Popup
                trigger={
                    <h3>
                        <CountUp start={0} end={totalCovidTwitter} />
                        ({covidRatioTwitter.toFixed(2)}%)
                    </h3>
                }
                position="right top"
            >
                <div className="custom-popup">Twitter-huge</div>
            </Popup>
            <Popup
                trigger={
                    <h4>
                        <CountUp start={0} end={totalCovidMastodon} />
                        ({covidRatioMastodon.toFixed(2)}%)
                    </h4>
                }
                position="right top"
            >
                <div className="custom-popup">Mastodon</div>
            </Popup>
        </div>
    );
};

export default CovidRatio;
