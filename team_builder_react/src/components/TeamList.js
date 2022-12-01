import { useState, useEffect  } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
/*-------------------------------------------------------------------------------------------------------
- this component will accept props extracted by the Results component corresponding to the names of team members
- this will be contained in the names props which consists of an array of strings of the form "name_last, name_first"
- each team member is removeable
- upon being removed, the updateScores method will recalculate the average score for the team in each talent category
  and update the view in Results via the setScores method
- the list of removed names will be curated as a state removedNames
-------------------------------------------------------------------------------------------------------*/
const TeamList = ({names, team, setScores}) =>{
    //-------------------------------------------------------------------------------------------------------
    //DISPLAYS AS A LIST OF REMOVABLE BUTTONS
    //-------------------------------------------------------------------------------------------------------
    const [removedNames, removeName] = useState([]) //need to keep track of all removed names from the list

    useEffect(() => { //once a name has been added to the list of removed names, update the view in Result
        updateScores()
    },[removedNames]);

    function updateScores(){
        var team_Length = 0
        var newScores = 
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
            if (! axios.isAxiosError(member)){//make sure the entry is not an error
                var tempName = `${member.name_last}, ${member.name_first}`
                if (!removedNames.includes(tempName)) {
                    team_Length += 1
                        //vv accumulate scores  from each member to display the average in each talent cat.
                    Object.keys(newScores).forEach((key)=>{ //iterate over keys to extract values from response member
                        newScores[key] += member[key]
                    });
                    
                }
            }
        });
        var scoresAvg = []
        Object.keys(newScores).forEach( key => scoresAvg.push((newScores[key] / team_Length) * 100))//compute average for each talent
        setScores(scoresAvg)
    }

    function removeHandler(event){ //called when the user clicks the 'X'
        removeName(current => [...current, event.target.parentElement.id])
        event.target.parentElement.remove()
    }
    
    var TeamList = names

    const remove = {
        color: '#df4759',
        fontWeight: 'bold'
    };

    if (TeamList.length > 0){//verify that array of member names was supplied
        return (  
            <>
            <Stack direction='vertical' gap={2} className="col-md-5 mx-auto my-auto h-100">
            {
                TeamList.map(
                    function (name) {
                        var isError = name.startsWith("ERROR")
                        return(
                        <ButtonGroup aria-label="Basic example" key={name} id = {name}>
                            <Button variant={isError ? "danger" : "info"} size = "lg" className = 'memberName'>{name}</Button>
                            <Button variant={isError ? "danger" : "info"}
                            size = "sm"
                            onClick = {removeHandler}
                            style = {remove}>
                                X
                            </Button>
                        </ButtonGroup>
                        )
                    }
                )
            }
            </Stack>
            </>
        );
    }else{
        return (
            <Alert variant={"danger"}>
                Error loading the data!
            </Alert>
        );
    }
}
 
export default TeamList;