import React from 'react';
import SquareComponent from './square';



const generateBoard=(rows,columns)=>{
    let board=[];

    for(let i=0;i<rows * columns ;i++){
        if(i%rows === 0){
            board.push(
                <div className="board-row" key={i}>
                    {generateRow(i,i+columns)}
                </div>
            );
        }
    }
return board;

}

const generateRow=(start,num_of_cols)=>{
    let row=[];
    for(let j=start;j<num_of_cols;j++){
        row.push( generateSquare(j));
    }

    return row;
}

const generateSquare=(key_val)=>{
    return(
    <SquareComponent 
        key={key_val}
        value={key_val}
        
         />);
}

const BoardComponent = () => {

    
    return ( 

        <div>
                {generateBoard(3,3)}
        </div>
     );
}
 
export default BoardComponent;