import React from 'react';
import {NavLink} from 'react-router-dom';
import homeIcon from './home.png';
import globeIcon from './world.png'
import chartIcon from './chart.png'
import unimelbImage from "./unimelb_logo.png";

const Sidebar = () => {
    return (

        <nav>
            <ul>
                <li>
                    <div className="image-container"><img src={unimelbImage} alt="" width="125" height="123"/></div>
                    <p></p>
                    <button><NavLink to="/"><img src={homeIcon} alt="" /> Home</NavLink></button>
                </li>
                <li>
                    <button><NavLink to="/map"><img src={globeIcon} alt="" /> Map</NavLink></button>
                </li>
                <li>
                    <button><NavLink to="/statistics"><img src={chartIcon} alt="" /> Statistics</NavLink></button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
