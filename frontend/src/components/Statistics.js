import React, { useState } from 'react';
import userIcon from "./user.png";
import twitterIcon from "./twitter.png"
import covidIcon from  "./new-normality.png"
import moodIcon from "./dial.png"
import CountTweet from "../data/cnt_tweet";
import CountAuthor from "../data/cnt_author"
import HospitalBarChart from "../data/hospital_gcc";
import RichnessBarChart from "../data/house_price_gcc";
import CountCovid from "../data/cnt_covid_tweet";
import CovidGccBarChart from "../data/covid_gcc";
import SentimentGcc from "../data/sentiment_gcc";
import TotalTweetsLineChart from "../data/total_tweets_month";
import TotalTweetGcc from "../data/total_tweets_by_gcc";
import CovidMonthLineChart from "../data/covid_month_chart";
import PieChartMood from "../data/total_mood_pie";
import PieChartCovid from "../data/covid_mood_pie";
import CountMood from "../data/mood";
import MyTable from "../data/table";

const Statistics = () => {
    const [selectedChart1, setSelectedChart1] = useState('Total Tweets');
    const [selectedChart2, setSelectedChart2] = useState('Total Mood');


    return (
        <div>
            <div className="box-container">
                <div className="box2">
                    <p>User </p>
                    <img src={userIcon} alt="" />
                    <CountAuthor />
                </div>
                <div className="box2">
                    <p>Tweets</p>
                    <img src={twitterIcon} alt="" />
                    <CountTweet />
                </div>
                <div className="box2">
                    <p>Covid Related Tweets</p>
                    <img src={covidIcon} alt="" />
                    <CountCovid />
                </div>
                <div className="box2">
                    <p>Mood</p>
                    <img src={moodIcon}/>
                    <CountMood />

                </div>
            </div>

            <div className="box-container">
                <div className="box3">
                    <div className="button-container">
                        <button
                            className={selectedChart1 === 'Total Tweets' ? 'selected' : ''}
                            onClick={() => setSelectedChart1('Total Tweets')}
                        >
                            Total Tweets
                        </button>
                        <button
                            className={selectedChart1 === 'Covid Tweets' ? 'selected' : ''}
                            onClick={() => setSelectedChart1('Covid Tweets')}
                        >
                            Covid Tweets
                        </button>
                    </div>

                    <div className="chart-container">
                        {selectedChart1 === 'Total Tweets' && <><TotalTweetsLineChart /><TotalTweetGcc /></>}
                        {selectedChart1 === 'Covid Tweets' && <><CovidMonthLineChart /><CovidGccBarChart /><RichnessBarChart /><HospitalBarChart /></>}
                    </div>
                </div>

                <div className="box3">
                    <div className="button-container">
                        <button
                            className={selectedChart2 === 'Total Mood' ? 'selected' : ''}
                            onClick={() => setSelectedChart2('Total Mood')}
                        >
                            Total Mood
                        </button>
                        <button
                            className={selectedChart2 === 'Covid Mood' ? 'selected' : ''}
                            onClick={() => setSelectedChart2('Covid Mood')}
                        >
                            Covid Mood
                        </button>
                    </div>

                    <div className="chart-container">
                        {selectedChart2 === 'Total Mood' && <><PieChartMood /><SentimentGcc /></>}
                        {selectedChart2 === 'Covid Mood' && <><PieChartCovid /><MyTable /></>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Statistics;




