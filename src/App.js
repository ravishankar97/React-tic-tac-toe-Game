import React, { useReducer } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import BoardComponent from './Components/boardComp';

export const onClickContext = React.createContext();


const initialState ={
  history : [
    {
        squareValues: Array(9).fill(null),
        location:{
            row:0,
            col:0
		},
		active:false
		
    }
  ],
  XisNext : true,
  stepNumber : 0,
  
  resulter :{
	  status:null,
	  result:{
		player:"",
		data:[]
	  }
  }
  

}

const reducer = (state,action) =>{
  
  switch(action.type){
    case 'INSERT_DATA':{
    	const history_copy = state.history.slice(0,state.stepNumber + 1)           
      	const current_move_state = history_copy[history_copy.length - 1]
		const square_values = current_move_state.squareValues.slice();
		const current_result = state.resulter.result.data;
		
      	if(current_result.length > 0 || square_values[action.index]){
			return state;
		  }
		  square_values[action.index] = state.XisNext ? "X" :"O";
		  
      	const col = Math.floor(action.index % 3) + 1;
		const row = Math.floor(action.index / 3) + 1;
		
		history_copy.map((move)=>
			(
				move.active=false
		))

    	const  final_copy= history_copy.concat([
      	{
        	squareValues:square_values,
        	location:{
          		row:row,
          		col:col
			},
			active:true
		  }])

		const result = calculateWinner(square_values)
	 	return {...state , history : final_copy , XisNext:!state.XisNext,stepNumber:state.stepNumber+1,resulter:result }
	 
      
	}

	case 'RESET_GAME':{
		return initialState;
	}

	case "MOVE_POS":{
		const history = state.history
		let resulter ={
			status:null,
			result:{
			  player:"",
			  data:[]
			}
		}
		history.map((move)=>
			(
				move.active=false
		))
		history[action.value].active=true;
		const XisNext = action.value %2 === 0

		const square_values = history[action.value].squareValues.slice();

		let res=calculateWinner(square_values);
		if(res)
			resulter=res;
		
	
		return {...state,history:history,XisNext:XisNext,resulter:resulter,stepNumber:action.value }
		
		
	}
	
	default:{
		return initialState;
		
	}
  }
}

const calculateWinner=(square_values)=>{
	const winLines=[
		[0, 1, 2],
    	[3, 4, 5],
    	[6, 7, 8],
    	[0, 3, 6],
    	[1, 4, 7],
    	[2, 5, 8],
    	[0, 4, 8],
    	[2, 4, 6],
	]

	let return_data={status:null,result:{player:"",data:[]}}


	

	for(let i=0;i< winLines.length;i++){
		const [a,b,c] = winLines[i]
		if(square_values[a] && square_values[a]===square_values[b] && square_values[a]===square_values[c]){
			return_data = {status:"win", result:{player:square_values[a],data:[a,b,c]}}
			return return_data;
		}

	}

	let tempSq = square_values.filter(item => item === null);
	if (tempSq.length === 0) {
		return_data = { status: "draw", result: {player:"",data:[]}}
		return return_data
	}
	return return_data
}




function App() {

  const [current_state,dispatch] = useReducer(reducer,initialState);

	let result_text="" ;
  if(current_state.resulter.status ==="win"){
	result_text = current_state.resulter.result.player+" is the winner";
  }else if(current_state.resulter.status ==="draw"){
	  result_text = "Match Draw"
  }
  return (
    <onClickContext.Provider value={{squares:current_state,buttonClick:dispatch}}>
	<div className='game'>
        <BoardComponent />

		{
			result_text.length > 0 ? (
			<div className="reset-btn" >
			<button className="btn btn-warning"  onClick={()=>dispatch({type:'RESET_GAME'})}>Play Again</button>
			
		  </div>
		) : (
			<div className='reset-btn'>
                <button className="btn btn-danger"  onClick={()=>dispatch({type:'RESET_GAME'})}>Reset Game</button>
                
              </div>
		)}		
	</div>

	
	<div className='toggle-btn'>
			
			

		<p className="bg-success" style={{marginTop:15,color:"white"}}>{result_text} </p>
        <p>Steps Occured</p>
				
		{
			current_state.history.map((move, index) => {
				const desc = index ? "Go to move #" + index : "Go to game start";
				let btnClasses='btn btn-sm btn-'
				
					return (
					<li  key={index}>
						<button className={current_state.history[index].active ? btnClasses+'primary':btnClasses+'secondary'} onClick={()=>dispatch({type:"MOVE_POS",value:index})}>
						{`${desc} (${move.location.row}, ${move.location.col})`}
						</button>
					</li>)
				
			})
		}
    
    </div>
    </onClickContext.Provider>
  );
}

export default App;
