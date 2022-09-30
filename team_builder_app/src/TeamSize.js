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
            document.getElementById("ErrorMessage").className = "text-danger visible"

        }else{
            if (event.target.value > 0){
                this.setState({
                    valid: true,
                    num : 0
                  });
                event.target.className = "form-control is-valid"
                document.getElementById("ErrorMessage").className = "text-danger invisible"
            }else{
                event.target.className = "form-control is-invalid"
                document.getElementById("ErrorMessage").className = "text-danger visible"
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
            return(<TeamMember key = {0} />);
        }else{
            return(
                <form>
                    <div className="container">
                    <label className = "form-group control-label" htmlFor="teamSize">
                        Please, Enter the Number of Employees For Your Team:
                    </label>
                    <div className="form-group row">
                        <div className = "row">
                            <div className="col">       
                                <input type="text"  id="teamSize" onChange = {this.handleChange} className ="form-control input-sm"></input>
                            </div>
                            <Button  onClick = {this.handleClick} variant="primary" href='/build' className = "col-2">Build</Button>
                        </div>
                    </div>  
                    <div className="text-danger invisible" id="ErrorMessage">Please, insert a postive number.</div>
                    </div>     
                        
                </form>
            );
        }
    }
}

export default TeamSize;