import React from 'react';
import {useState,useEffect} from 'react';
import Multiselect from 'multiselect-react-dropdown'; // https://www.npmjs.com/package/multiselect-react-dropdown

/*
  This component renders a multiselect-react-dropdown component.

  props: SendToParent - a callback function that this component will call whenever
          the selected values in the multiselect-react-dropdown changes. The
          function should take a single parameter, a list.

         defaultSelected - an array of objects with the structure
          { 'name' : string, 'id' : number }. These will be the already selected
          values in the CheckList.

  https://www.geeksforgeeks.org/how-to-pass-data-from-child-component-to-its-parent-in-reactjs/
*/
const CheckList = ( { SendToParent, defaultSelected }) => {
  const skills = ['JavaScript', 'React', 'Python', 'HTML', 'Bootstrap', 'JQuery', 'DJango'];
  var options = skills.map((skill, index) => ({'name' : skill, 'id' : index}));
  const [data,setData]=useState([]);
  /*
    Callback function for when the user selects a new item.
  */
  const onSelect = (selectedList, selectedItem) => {
    // console.log(selectedList);
    // console.log(selectedItem);
    SendToParent(selectedList);
  }
  
  /*
    Callback function for when the user deselects an item.
  */
  const onRemove = (selectedList, removedItem) => {
    // console.log("Here")
    SendToParent(selectedList)
  }
  const getData=()=>{
    fetch('techSkills.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[]);

  return(
    <Multiselect
      options={data["Tech_Skills"]?.map((skill, index) => ({'name' : skill, 'id' : index}))} // Options to display in the dropdown
      onSelect={onSelect} // Function will trigger on select event
      onRemove={onRemove} // Function will trigger on remove event
      displayValue="name" // Property name to display in the dropdown options
      avoidHighlightFirstOption={true}
      selectedValues={defaultSelected}
    />
  );
}

export default CheckList;