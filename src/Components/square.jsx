import React from 'react';
import { useContext } from 'react';
import { onClickContext } from '../App';


const SquareComponent = (props) => {
  const handleClick = useContext(onClickContext)
  
    return (
        <button
          className={(handleClick.squares.resulter.result.data.indexOf(props.value)===-1) ? "square":"winningSquares square"} onClick={()=>handleClick.buttonClick({type:'INSERT_DATA',index:props.value})}>
          
          {handleClick.squares.history[handleClick.squares.stepNumber].squareValues[props.value]}
        </button>
      );
}
 
export default SquareComponent;