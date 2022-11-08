import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { useState } from 'react';
import TeamList from './TeamList.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { GetEmployeeList, GetValidTeam, SendTeamParameters } from '../utilities/API_Interface.js';

const Results = ({techList, num}) => {
    const labels = ['Confidence', 'Delegator', 'Determination', 'Selling', 'Relationship', 'Disrupter', 'Knowledge', 'Independance', 'Profitability', 'Risk'];
    const [names, setNames] = useState([])
    const [scores, setScores] = useState([])
    const [teamResponse, setTeamResponse] = useState(false)
    const [team, setTeam] = useState(false)
    const [firstTime, setFirstTime] = useState(false)
    loadData();

    function loadData(){

      if (!firstTime ){
        setFirstTime(true)
        
        var id = SendTeamParameters(num, techList)
        .then((id) => {
            console.log("Response ID: " + id);

            GetValidTeam(id)
            .then((response) => {
                console.log("Team Response: " + response);

                // GetEmployeeList(response.data)
                GetEmployeeList([1, 2, 3])
                .then((team) => {
                    console.log("Response for getting employees:");
                    console.log(team);
                    setTeam(team);
                    var temp = []
                    var scoresTemp = [0,0,0,0,0,0,0,0,0,0]

                    for (const member of team) {
                      temp.push(`${member[0].name_last}, ${member[0].name_first}`);

                      scoresTemp[0] += member[0].bpt_confidence
                      scoresTemp[1] += member[0].bpt_delegator
                      scoresTemp[2] += member[0].bpt_determination
                      scoresTemp[3] += member[0].bpt_disruptor
                      scoresTemp[4] += member[0].bpt_independence
                      scoresTemp[5] += member[0].bpt_knowledge
                      scoresTemp[6] += member[0].bpt_profitability
                      scoresTemp[7] += member[0].bpt_relationship
                      scoresTemp[8] += member[0].bpt_risk
                      scoresTemp[9] += member[0].bpt_selling

                      console.log(member[0].name_first)
                    }
                    scoresTemp.map(x=> x / team.length)
                    //team.forEach((x,i) =>{ temp.push(`${x.name_last}, ${x.name_first}`)})
                    setNames(temp)
                    setScores(scoresTemp)
                    setTeamResponse(true)
                })
            })
            
      })
      

    }

  }

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
            data: scores.length > 0 ? scores : [42, 50, 56, 40, 44, 49, 53, 50, 36, 48],
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
            <Stack direction='horizontal' gap={5} className="col-md-5 mx-auto my-auto h-100">
              {teamResponse ? <TeamList type = "info" names = {names}/> : <div>Computing...</div>}
            </Stack>
          </Row>
        </Container>
        </>
    );
}

export default Results;