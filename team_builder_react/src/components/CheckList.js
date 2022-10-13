import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';

// https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/
const CheckList = ( { SendToParent }) => {
  const skills = ['JavaScript', 'React', 'Python', 'HTML', 'Bootstrap', 'JQuery', 'DJango'];
  //const [options, setOptions] = useState(skills.map((skill, index) => ({'name' : skill, 'id' : index})));
  var options = skills.map((skill, index) => ({'name' : skill, 'id' : index}));
  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues([selectedList]);
    console.log(selectedList);
    console.log(selectedItem);
    //SendToParent(selectedList);
  }
    
  const onRemove = (selectedList, removedItem) => {
    setSelectedValues([...selectedValues, removedItem]);
    console.log("Here")
    SendToParent(selectedList)
  }

    
  return(
    <Multiselect
      options={options} // Options to display in the dropdown
      //selectedValues={selectedValues} // Preselected value to persist in dropdown
      values={selectedValues}
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
    />
  );
}

export default CheckList;