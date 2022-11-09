import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { useState } from 'react';
import TeamList from './TeamList.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { GetEmployeeList, GetValidTeam, SendTeamParameters } from '../utilities/API_Interface.js';

const Results = ({techList, num}) => {
    const labels = ['Confidence', 'Delegator', 'Determination', 'Selling', 'Relationship', 'Disrupter', 'Knowledge', 'Independance', 'Profitability', 'Risk'];//Graph labels
    //VV capture the status and data from interface with API
    const [names, setNames] = useState([])
    const [scores, setScores] = useState([])
    const [teamResponse, setTeamResponse] = useState(false)
    const [team, setTeam] = useState(false)
    const [firstTime, setFirstTime] = useState(false)

    loadData();
    //-------------------------------------------------------------------------------------------------------
    //PULL DATA IN FROM REMOTE 
    //-------------------------------------------------------------------------------------------------------
    function loadData(){

      if (!firstTime ){//prevent multiple transmissions
        setFirstTime(true)
        
        SendTeamParameters(num, techList)
        .then((id) => {
            console.log("Response ID: " + id);

            GetValidTeam(id)
            .then((response) => {
                console.log("Team Response: " + response);

                // GetEmployeeList(response.data)
                GetEmployeeList([1, 2, 3])
                .then((team) => {
                    console.log("Response for getting employees:");
                    console.log(team[1]);
                    setTeam(team);
                    if (team.length > 0){ //guard against division by 0 for average

                      var temp = []//will contain the strings "name_last, name_first"
                      var scoresTemp = 
                      {"bpt_confidence":0, 
                      "bpt_delegator":0,
                      "bpt_determination":0,
                      "bpt_selling":0,
                      "bpt_relationship":0,
                      "bpt_disruptor":0,
                      "bpt_knowledge":0,
                      "bpt_independence":0,
                      "bpt_profitability":0,
                      "bpt_risk":0}//same keys as the response member object

                      team.forEach((member) => {
                        //vv extract "last name, first name"
                        if (! axios.isAxiosError(member)){//make sure the entry is not an error
                          temp.push(`${member.name_last}, ${member.name_first}`);
                          
                          //vv accumulate scores  from each member to display the avergae in each talent cat.
                          Object.keys(scoresTemp).forEach((key)=>{ //iterate over keys to extract values from response member
                              scoresTemp[key] += member[key]
                          });
                        }
                      });
                      var scoresAvg = []
                      Object.keys(scoresTemp).forEach( key => scoresAvg.push(scoresTemp[key] / team.length))//compute average for each talent
                      setNames(temp)
                      setScores(scoresAvg)
                      setTeamResponse(true)//notifiy the view that the data has been loaded and consumed
                    }
                    //record extracted data as a state to update the view
                    
                    

                })
            })
            
      })
      

    }

  }
    //-------------------------------------------------------------------------------------------------------
    //CONSTRUCT THE VIEW
    //-------------------------------------------------------------------------------------------------------
    //THE GRAPH:
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
            data: scores.length > 0 ? scores : [0,0,0,0,0,0,0,0,0,0],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

      const divider = { //should have variable for height base upon team size (team size * 40)
        borderLeft: "1px solid #000",
        height: "200px"
      };

    const alert = <Alert variant={"danger"}>Error loading the data! </Alert>
                    
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
              {teamResponse ? <TeamList type = "info" names = {names}/> : alert}
            </Stack>
          </Row>
        </Container>
        </>
    );
}

export default Results;