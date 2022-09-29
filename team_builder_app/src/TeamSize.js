import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';
import TeamMember from './TeamMember.js'

class TeamSize extends Component {
    constructor() {
        super();
        this.state = {valid: false, num: 0};

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
      }

    handleChange(event) {

        if (isNaN(event.target.value)){

            event.target.className = "form-control is-invalid"
            document.getElementById("ErrorMessage").className = "invalid-feedback visible"

        }else{
            if (event.target.value > 0){
                this.setState({
                    valid: true,
                    num : 0
                  });
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "invalid-feedback invisible"
            }else{
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "invalid-feedback visible"
            }
        }

    }
    handleClick(event){
        event.preventDefault()
        var amt = document.getElementById("teamSize").value
        if(this.state.valid){
            this.setState({
                valid: true,
                num : amt
              });
            console.log("ACCEPTED!")

        }else{
            console.log("REJECTED!")
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {favoritecolor: props.favcol };
      }
    render(){
        if ((this.state.valid) && (this.state.num !== 0)){
            var amt = this.state.num
            return(
                <>
                    <Stack direction='horizontal' className="mx-auto my-auto">
                    {Array.from({length:amt}, (_, i) => {return(<div key = {i} className="p-5 ml-2 mr-2 bg-secondary text-white"><TeamMember key = {i} /></div>);})}
                    </Stack>
                </>
            );
        }else{
            return(
                <>
                    <form>
                        <label className = "form-label">
                            Please, Enter the Number of Employees For Your Team
                        </label>
                        <Stack direction='horizontal' className="col-md-5 mx-auto my-auto h-100">
                            <input type="text"  id="teamSize" onChange = {this.handleChange} className ="form-control"></input>
                            <Button  onClick = {this.handleClick} variant="primary" href='/build'>Build</Button>
                            <div className="invalid-feedback invisible" id="ErrorMessage">Please, insert a postive number.</div>
                        </Stack>
                    </form>
                </>
            );
        }
    }
}

export default TeamSize;