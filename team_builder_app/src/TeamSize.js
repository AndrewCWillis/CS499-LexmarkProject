import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import React, { Component, useRef } from 'react';

class TeamSize extends Component {
    constructor() {
        super();
        this.myRef = React.createRef();
      }
    handleChange(event) {
        if (isNaN(event.target.value)){
            console.log("ERROR, insert a number.");
            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "invalid-feedback visible"
        }else{
            if (event.target.value > 0){
                console.log("LOOKING GOOD");
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "invalid-feedback invisible"
            }else{
                console.log("ERROR, insert a POSTIVE number.");
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "invalid-feedback visible"
            }
        }
    }
    render(){
        
        return(
        <>
            <form>
                <label className = "form-label">
                    Please, Enter the Number of Employees For Your Team
                </label>
                <Stack direction='horizontal' className="col-md-5 mx-auto my-auto h-100">
                    <input type="text"  id="teamSize" onChange = {this.handleChange} className ="form-control"></input>
                    <Button className="mx-auto my-auto" variant="primary" href='/build'>Enter</Button>
                    <div ref={this.myRef} className="invalid-feedback invisible" id="ErrorMessage">Please, insert a postive number.</div>
                </Stack>
            </form>
        </>);
    }
}

export default TeamSize;