import React from 'react';
import Barchart from "../data/covid_month_chart";
const Home = () => (
    <div>
        <h2>About Project</h2>
        <div className="rounded-box">
            <p>The software system presented in this project is designed based on service-oriented architectures, providing functionalities for tweet harvesting, tweet analysis, and displaying the analysis results in both temporal and statistical formats. Leveraging the Virtual Machines (VMs) available on the Melbourne Research Cloud, the system demonstrates notable features such as scalability and automation. Deployment of the system is achieved through the utilization of CouchDB, Docker, and Ansible, ensuring efficient and streamlined processes.

                Data management and manipulation are facilitated by CouchDB, while data analysis is conducted using the MapReduce paradigm. The focus of the data analysis revolves around three key scenarios. Firstly, the system examines the distribution of tweets in a geographical manner, providing insights into the spatial patterns and trends of tweet activity. Secondly, it explores the temporal distribution of tweets, enabling the identification of temporal patterns and variations in tweet content over time. Lastly, the system investigates the relationship between wealth and hospital distributions, shedding light on potential correlations or dependencies between these factors.</p>
        </div>
        <h2>About Us</h2>
        <div className="box-container">
            <div className="rounded-box">
                <p>Olivia</p>
            </div>
            <div className="rounded-box">
                <p>Some text for about us</p>
            </div>
            <div className="rounded-box">
                <p>Some text for about us</p>
            </div>
            <div className="rounded-box">
                <p>Some text for about us</p>
            </div>
            <div className="rounded-box">
                <p>Some text for about us</p>
            </div>
        </div>
    </div>
);

export default Home;

