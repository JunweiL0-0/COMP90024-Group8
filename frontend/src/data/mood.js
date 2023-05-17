import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from "react-countup";
import Popup from 'reactjs-popup';

const CountMood = () => {
    const [totalTwitter, setTotalTwitter] = useState(0);


    useEffect(() => {
        axios.get('http://172.26.131.106:8080/geo_tweet/_design/General/_view/cnt_tweet_by_mood_non_neutral')
            .then(response => {
                const data = response.data.rows;
                setTotalTwitter(data[0].value);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []); // Empty array makes this run only on component mount

    return (
        <div>
            <div>
                <Popup
                    trigger={<h3><CountUp start={0} end={totalTwitter} /></h3>}
                    position="right top"
                    hoverable
                >
                    <div className="custom-popup">Twitter-huge</div>
                </Popup>
            </div>
            <div>
                <Popup
                    trigger={<h4>-</h4>}
                    position="right top"

                >
                    <div className="custom-popup">Mastodon</div>
                </Popup>
            </div>
        </div>
    );
}

export default CountMood;
