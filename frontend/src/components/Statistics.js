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
import SentimentLineChart from "../data/sentiment_month";
import GccMoodBar from "../data/covid_gcc_mood";


const Statistics = () => {
    const [selectedChart1, setSelectedChart1] = useState('Total Tweets');
    const [selectedChart2, setSelectedChart2] = useState('Sentiment');


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
                    <p>COVID Related Tweets</p>
                    <img src={covidIcon} alt="" />
                    <CountCovid />
                </div>
                <div className="box2">
                    <p>Mood Related Tweets</p>
                    <img src={moodIcon} alt="" />
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
                            className={selectedChart1 === 'COVID Tweets' ? 'selected' : ''}
                            onClick={() => setSelectedChart1('COVID Tweets')}
                        >
                            COVID Tweets
                        </button>
                    </div>

                    <div className="chart-container">
                        {selectedChart1 === 'Total Tweets' && <><TotalTweetsLineChart /><TotalTweetGcc /></>}
                        {selectedChart1 === 'COVID Tweets' && <><CovidMonthLineChart /><CovidGccBarChart /><RichnessBarChart /><HospitalBarChart /></>}
                    </div>
                </div>

                <div className="box3">
                    <div className="button-container">
                        <button
                            className={selectedChart2 === 'Sentiment' ? 'selected' : ''}
                            onClick={() => setSelectedChart2('Sentiment')}
                        >
                            Sentiment
                        </button>
                        <button
                            className={selectedChart2 === 'COVID&Sentiment' ? 'selected' : ''}
                            onClick={() => setSelectedChart2('COVID&Sentiment')}
                        >
                            COVID&Sentiment
                        </button>
                    </div>

                    <div className="chart-container">
                        {selectedChart2 === 'Sentiment' && <><PieChartMood /><SentimentGcc /><MyTable /></>}
                        {selectedChart2 === 'COVID&Sentiment' && <><PieChartCovid /><GccMoodBar /></>}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Statistics;




