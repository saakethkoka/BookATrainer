import React, { useEffect, useState } from 'react';
import './FilterButton.css';


const FilterButton = props => {
const [ selected, setSelected ] = useState(false)

const toggleSelected = () => {
    setSelected(!selected)
    props.onClick()
}
    return (
      <div className="toggle-container" onClick={toggleSelected}>
        <div className="button" style={{backgroundColor: selected ? "green":"gray"}}>
          { <label className = "thing">   {props.name}</label> }
        </div>
      </div>
    );
} 
export default FilterButton;