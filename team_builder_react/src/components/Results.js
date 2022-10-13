import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { useState } from 'react';
import TeamList from './TeamList.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Results = () => {
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

      const divider = { //should have variable for height base upon team size (team size * 40)
        borderLeft: "1px solid #000",
        height: "200px"
      };

      const name = "Robert"; // will be dynamically determined later

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
            <Navbar.Brand>Results of Team Generation:</Navbar.Brand>
          </Container>
        </Navbar>

        <Container>
          <Row>
            <Col>
                <Navbar bg="light">
                  <Container>
                    <Navbar.Brand>Discovered Team:</Navbar.Brand>
                  </Container>
                </Navbar>
            </Col>
            <Col>
                <Navbar bg="light">
                  <Container>
                    <Navbar.Brand>Supplemental Candidates for {name}:</Navbar.Brand>
                  </Container>
                </Navbar>
            </Col>
          </Row>
          <Row>
            <Stack direction='horizontal' gap={5} className="col-md-5 mx-auto my-auto h-100">
              <TeamList type = "info"/>

              <div style={divider}></div>

              <TeamList type = "secondary"/>
              
            </Stack>
          </Row>
        </Container>
        </>
    );
}

export default Results;