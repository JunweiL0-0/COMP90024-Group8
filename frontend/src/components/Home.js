import React from 'react';
import weiImage from './wei.png'
import scottImage from './scott.png';
import oliviaImage from './olivia.png';
import starryImage from './starry.png';
import catherineImage from './catherine.png';
const Home = () => (
    <div>
        <h2>About Project</h2>
        <div className="rounded-box">
            <p>
                The software system presented in this project is designed based on service-oriented architectures, providing functionalities for tweet and Mastodon data harvesting, tweet analysis, and displaying the analysis results in statistical formats. Leveraging the Virtual Machines (VMs) available on the Melbourne Research Cloud, the system demonstrates notable features such as scalability and automation. Deployment of the system is achieved through the utilization of Ansible and docker.
            </p>
            <p className="paragraph-spacing">
                Data management and manipulation are facilitated by CouchDB, while data analysis is conducted using the MapReduce paradigm. The focus of the data analysis revolves four key scenarios. Firstly, the system examines the distribution of tweets in a geographical manner, providing insights into the spatial patterns and trends of tweet activity. Secondly, we explore the distribution of tweets, enabling the identification of temporal patterns and variations in tweet content over time. Lastly, the system investigates the relationship between wealth and hospital distributions, shedding light on potential correlations or dependencies between these factors.
            </p>
        </div>

        <h2>Meet Our Team</h2>
        <div className="box-container">
            <div className="rounded-box2">
                <img src={weiImage} alt="" width="163" height="163" />
                <h5>Junwei Liang</h5>
                <p>Backend, Ansible</p>
            </div>
            <div className="rounded-box2">
                <img src={scottImage} alt="" width="160" height="160" />
                <h5>Zichao Sang</h5>
                <p>Docker</p>
            </div>
            <div className="rounded-box2">
                <img src={oliviaImage} alt="" width="160" height="160" />
                <h5>Yumeng Dong</h5>
                <p>MapReduce</p>
            </div>
            <div className="rounded-box2">
                <img src={starryImage} alt="" width="160" height="160" />
                <h5>Yixi Kuang</h5>
                <p>Data Processing</p>
            </div>
            <div className="rounded-box2">
                <img src={catherineImage} alt="" width="160" height="160" />
                <h5>Xuran LI</h5>
                <p>Frontend</p>
            </div>
        </div>
    </div>
);

export default Home;

