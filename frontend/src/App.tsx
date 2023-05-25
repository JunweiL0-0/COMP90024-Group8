import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Map from './components/Map';
import Statistics from './components/Statistics';
import './App.css';
import 'react-tooltip/dist/react-tooltip.css';


console.log(process.env)

const App = () => {
    return (
      <Router>
        <div className="app">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="content">
            <Routes>
                <Route path="/statistics" element={<Statistics/>}/>
                <Route path="/map" element={<Map />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
};


export default App;

