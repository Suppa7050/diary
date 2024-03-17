import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';

function Charts() {
    const [overallData, setOverallData] = useState(null);
    const [dayWiseData, setDayWiseData] = useState(null);
  
    useEffect(() => {
      fetchOverallData();
      fetchDayWiseData();
    }, []);
  
    const fetchOverallData = async () => {
      try {
        const response = await axios.get('http://localhost:3031/ideas/overall');
        setOverallData(response.data);
      } catch (error) {
        console.error('Error fetching overall data:', error);
      }
    };
  
    const fetchDayWiseData = async () => {
      try {
        const response = await axios.get('http://localhost:3031/ideas/daywise');
        setDayWiseData(response.data);
      } catch (error) {
        console.error('Error fetching day-wise data:', error);
      }
    };
  
    if (overallData === null || dayWiseData === null) {
      return <div>Loading...</div>; // Add loading indicator while fetching data
    }
  
    return (
      <div>
        <h2>Overall Activities</h2>
        <Pie data={overallData} />
        <h2>Day-wise Activities</h2>
        <Bar data={dayWiseData} />
      </div>
    );
  }
  