import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import React, {useState} from 'react';
import CheckList from './CheckList.js';
import Results from './Results.js';
import Size from './Size.js';


const Parameters = () => {
    //-------------------------------------------------------------------------------------------------------
    //THE CURATOR OF ALL COMPONENTS FOR THE BUILD PAGE
    //-------------------------------------------------------------------------------------------------------
    const [valid, setValid] = useState(false); //Valid input provided in Size component
    const [submit, setSubmit] = useState(false);//Submit the technical skills parameter
    const [num, setNum] = useState(0); //Team size provided from Size component

    const [techSkills, setTechSkills] = useState("");
    var techList = []; // Look at skills for an example as to how to use this var 

    const handleSubmit = (event) =>{//has finished selecting all the parameters for team construction
        event.preventDefault()
        if (techList.length > 0){//enforce that at least one skill was provided
            setSubmit(true)
            setTechSkills(techList);
        }
        else{
            document.getElementById("ErrorMessage").className = "text-danger visible"
        }
    }

    /*
        Callback function for when the user makes changes to the CheckList.
        
        This function is passed to the CheckList component as a prop and the
        CheckList will call it when its selected values change.
    */
    const GetInputFromCheckList = (skills) => {
        techList = skills;
    }
    
    //-------------------------------------------------------------------------------------------------------
    //CONSTRUCT THE VIEW 
    //-------------------------------------------------------------------------------------------------------
    if ((valid) && (num !== 0)){//Team size has been provided (not initial 0), and is valid
        if (submit){//Technical Skills parameter has been provided
            return(
                <Results num = {num} techList = {techSkills}/>//Results component will  interface with back end to fetch a team
            );
        }else{//Load Technical skills checklist form
            return(
                <Card border="dark">
                    <Card.Header className="font-weight-bold">
                        <h4>Please, Enter the Desired Technical Skills for this Position:</h4>
                    </Card.Header>
                    <Card.Body>
                        {<CheckList SendToParent={GetInputFromCheckList} defaultSelected={[]} />}
                   
                        <div style = {{marginTop: "15px"}}>
                            <Button  variant="primary" href='/build' id = "build" onClick = {handleSubmit}>Build</Button>
                        </div>
                        <div className="text-danger invisible" id="ErrorMessage">
                            <Alert variant={"danger"}>Please, select at least one technical skill.</Alert>
                        </div>  
                    </Card.Body>
                </Card>

            );
        }
    }else{//Load Team size form

        return(
            <Size setValid={setValid} setNum = {setNum} valid = {valid}/>
        );
    }
    
    
}

export default Parameters;
