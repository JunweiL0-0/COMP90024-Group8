import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountUp from "react-countup";
import Popup from 'reactjs-popup';

const CountTweet = () => {
    const [totalTwitter, setTotalTwitter] = useState(0);
    const [totalMastodon, setTotalMastodon] = useState(0);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL+'geo_tweet/_design/General/_view/cnt_tweet')
            .then(response => {
                const data = response.data.rows;
                setTotalTwitter(data[0].value);
            })
            .catch(error => {

            });

        axios.get(process.env.REACT_APP_URL+'mastodon_data/_design/General/_view/cnt_post')
            .then(response => {
                const data = response.data.rows;
                setTotalMastodon(data[0].value);
            })
            .catch(error => {

            });
    }, []); // Empty array makes this run only on component mount

    return (
        <div>
            <Popup
                trigger={<h3><CountUp start={0} end={totalTwitter} /></h3>}
                position="right top"
                hoverable
            >
                <div className="custom-popup">Twitter</div>
            </Popup>
            <Popup
                trigger={<h4><CountUp start={0} end={totalMastodon} /></h4>}
                position="right top"
                hoverable
            >
                <div className="custom-popup">Mastodon</div>
            </Popup>
        </div>
    );
}

export default CountTweet;


