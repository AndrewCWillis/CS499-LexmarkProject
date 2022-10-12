import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { useState } from 'react';
import TeamList from './TeamList.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Name = () => {
    const labels = ['Confidence', 'Delegator', 'Determination', 'Selling', 'Relationship', 'Disrupter', 'Knowledge', 'Independance', 'Profitability', 'Risk'];
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' 
          },
          title: {
            display: true,
            text: 'Generated Team',
          },
        },
      };
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Team Talent Composite Score',
            data: labels.map(() => [42, 50, 56, 40, 44, 49, 53, 50, 36, 48]),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
    return (  
        <>
        <Navbar bg="dark"  variant="dark">
          <Container>
            <Navbar.Brand>Composite Scores:</Navbar.Brand>
          </Container>
        </Navbar>
        <Bar options={options} data={data} />
        <Navbar bg="dark"  variant="dark">
          <Container>
            <Navbar.Brand>Discovered Team:</Navbar.Brand>
          </Container>
        </Navbar>
        <TeamList />
        </>
    );
}

export default Name;