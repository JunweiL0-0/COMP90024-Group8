import React from 'react';
import { Link } from 'react-router-dom';
import homeIcon from './home.png';
import globeIcon from './world.png'
import chartIcon from './chart.png'

const Sidebar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <button><Link to="/"><img src={homeIcon} alt="" /> Home</Link></button>
                </li>
                <li>
                    <button><Link to="/map"><img src={globeIcon} alt="" /> Map</Link></button>
                </li>
                <li>
                    <button><Link to="/statistics"><img src={chartIcon} alt="" /> Statistics</Link></button>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
