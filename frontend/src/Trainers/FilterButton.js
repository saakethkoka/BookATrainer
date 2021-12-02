import React, { useState } from 'react';
import './FilterButton.css';


const FilterButton = props => {

const toggleSelected = () => {
    props.onClick()
}
    return (
      <div className="toggle-container" onClick={toggleSelected}>
        <div className="button" style={{backgroundColor: props.selected ? "green":"gray"}}>
          { <label className = "thing">   {props.name}</label> }
        </div>
      </div>
    );
} 
export default FilterButton;