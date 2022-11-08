import Button from 'react-bootstrap/Button';
import React, {useState} from 'react';
import CheckList from './CheckList.js';
import Results from './Results.js';
import Size from './Size.js';


const Parameters = () => {

    const [valid, setValid] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [num, setNum] = useState(0); 
    var techList = []; // Look at skills for an example as to how to use this var 
   

    const handleSubmit = (event) =>{
        event.preventDefault()
        setSubmit(true)
    }

    /*
        Callback function for when the user makes changes to the CheckList.
        
        This function is passed to the CheckList component as a prop and the
        CheckList will call it when its selected values change.
    */
    const GetInputFromCheckList = (skills) => {
        techList = skills;
    }
    
    if ((valid) && (num !== 0)){
        if (submit){
            return(
                <Results num = {num} techList = {techList}/>
            );
        }else{
            return(
                <div>
                    <div>
                        <div>
                            Please, Enter the Desired Technical Skills for this Position:
                        </div>
                        {<CheckList SendToParent={GetInputFromCheckList} defaultSelected={[]} />}
                    </div>  
                    <div style = {{marginTop: "15px"}}>
                        <Button  variant="primary" href='/build' onClick = {handleSubmit} className = "col-2">Build</Button>
                    </div>
                </div>
            );
        }
    }else{

        return(
            <Size setValid={setValid} setNum = {setNum} valid = {valid}/>
        );
    }
    
    
}

export default Parameters;
