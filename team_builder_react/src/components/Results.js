import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { useState , useEffect } from 'react';
import TeamList from './TeamList.js';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { GetEmployeeList, GetValidTeam, SendTeamParameters } from '../utilities/API_Interface.js';
/*-------------------------------------------------------------------------------------------------------
- This page will will transmit the data collected in either of the build forms to the back-end API via
  the API_Interface.js wrapper functions 
- the data from the forms are provided as the props to this function:  techList , and num
- This interaction occurs in the loadData() method below, which is called immeadiatly
- The response data will be injested and formatted for display in a graph element provided by react-chartjs
- This will occur in the handleData() method
- The employee names will be extracted and displayed for the user
- The team list is editable, and members can be removed by selecting the 'X' beside their name
-------------------------------------------------------------------------------------------------------*/
const Results = ({techList, num}) => {
    const labels = ["Confidence", "Delegator","Determination","Selling","Relationship","Disruptor","Knowledge","Independence","Profitability","Risk"];//Graph labels
    //VV capture the status and data from interface with API
    const [names, setNames] = useState([])
    const [scores, setScores] = useState([])
    const [team, setTeam] = useState([])
    const [teamResponse, setTeamResponse] = useState(false)
    const [teamLength, setTeamLength] = useState(0)
    const [firstTime, setFirstTime] = useState(false)

    loadData();
    //-------------------------------------------------------------------------------------------------------
    //PULL DATA IN FROM REMOTE 
    //-------------------------------------------------------------------------------------------------------
    function handleData(team){//process the data response and update states
      var temp = []//will contain the strings "name_last, name_first"
      var team_Length = 0 //some of the entries in the response array might be errors, have to tally the actual team size
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

      team.forEach((member, index) => {
        //vv extract "last name, first name"
        if (! axios.isAxiosError(member)){//make sure the entry is not an error
          temp.push(`${member.name_last}, ${member.name_first}`);
          team_Length += 1
          //vv accumulate scores  from each member to display the average in each talent cat.
          Object.keys(scoresTemp).forEach((key)=>{ //iterate over keys to extract values from response member
              scoresTemp[key] += member[key]
          });
        }else{
          temp.push(`ERROR ${index} fetching an employee's data!`) //push the error to the list to display later
        }
      });
      var scoresAvg = []
      //SAVE THE RESULTS AS STATES TO UPDATE THE VIEW
      //          VVVV
      Object.keys(scoresTemp).forEach( key => scoresAvg.push(scoresTemp[key] / team_Length))//compute average for each talent
      setTeamLength(team_Length)
      setNames(temp)
      setScores(scoresAvg)
      setTeamResponse(true)//no
    }

    function loadData(){

      if (!firstTime ){//prevent multiple transmissions
        setFirstTime(true)
        SendTeamParameters(num, techList)
        .then((response) => {
          console.log(response)
          if (! axios.isAxiosError(response)){ // we know that the response is not an error

            GetValidTeam(response.data.id)
            .then((teamResponse) => {
                GetEmployeeList(teamResponse.data.team)
                .then((team) => {
                    setTeam(team)
                    team.length > 0 && handleData(team); //guard agaisnt division by zero 
                })
            })

          } 
      })
    

    }

  }


    //-------------------------------------------------------------------------------------------------------
    // BUILD THE GRAPHS
    //-------------------------------------------------------------------------------------------------------
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
      
      var data = {
        labels,
        datasets: [
          {
            label: 'Team Talent Composite Score',
            data: scores.length > 0 ? scores : [0,0,0,0,0,0,0,0,0,0], //check if there was data response, if not display all zeroes
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

      const popAvg = { //Hard coded data, wont change. The population average in each category
        labels,
        datasets: [
          {
            label: 'Population Average Scores',
            data: [42,50,56,40,44,49,53,50,36,48],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

    const alert = <Alert variant={"danger"}>Error loading the data! </Alert> // Displayed when backend server is not running
    const incompleteTeam = <Alert variant={"warning"}>Team generation was over-constrained. As a result, the generated team is smaller than requested.</Alert>

    //-------------------------------------------------------------------------------------------------------
    //CONSTRUCT THE VIEW
    //------------------------------------------------------------------------------------------------------- 
    const spacer = { //spacer to add some leg room to the layour
      paddingTop: "100px"
    }; 
    const navbarSpace = {
      paddingTop: "25px"
    }
    const spacerDiv = <div style = {spacer}></div>              
    return (  
        <>

        {spacerDiv}

        <Navbar bg="dark"  variant="dark" >
          <Container>
            <Navbar.Brand>Population Average BP10:</Navbar.Brand>
          </Container>
        </Navbar>

        <Bar options={options} data={popAvg} style = {navbarSpace}/>
        
        {spacerDiv}

        <Navbar bg="dark"  variant="dark" >
          <Container>
            <Navbar.Brand>Composite Scores for Generate Team:</Navbar.Brand>
          </Container>
        </Navbar>

        <Bar options={options} data={data} style = {navbarSpace}/>

        {spacerDiv}

        <Navbar bg="dark"  variant="dark">
          <Container>
            <Navbar.Brand>Members of Generated Team:</Navbar.Brand>
          </Container>
        </Navbar>

        <Container style = {navbarSpace}>
          <Row>
            <Stack direction='horizontal' gap={5} className="col-md-5 mx-auto my-auto h-100">
              {teamResponse ? <TeamList names = {names} team = {team} setScores = {setScores} /> : alert}
            </Stack>
          </Row>
        </Container>

        {spacerDiv}

        <div>
          {(teamLength < num) ? incompleteTeam : <div></div>}
        </div>

        {spacerDiv}

        </>
    );
}

export default Results;
