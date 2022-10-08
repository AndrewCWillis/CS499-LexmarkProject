import React, { Component } from 'react';
import Multiselect from 'multiselect-react-dropdown';

class CheckList extends Component {
    constructor(props) {
        super(props);
        const skills = ['JavaScript', 'React', 'Python', 'HTML', 'Bootstrap', 'JQuery', 'DJango']
        this.state = {
          options: skills.map((skill, index) => ({'name' : skill, 'id' : index}))
        }
      }
    onSelect(selectedList, selectedItem) {
       console.log("Here")
    }
    
    onRemove(selectedList, removedItem) {
      console.log("Here")
    }
    render(){
        return(
          <Multiselect
            options={this.state.options} // Options to display in the dropdown
            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          />
        );
    }
}
export default CheckList;