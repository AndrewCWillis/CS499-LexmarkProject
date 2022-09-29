import React, { Component } from 'react';
class CheckList extends Component {
    constructor(props) {
        super(props);

      }
    render(){
        return(
            <>
            <div className="form-check" >
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Technical Skill
                        </label>
            </div>
            </>
        );
    }
}
export default CheckList;