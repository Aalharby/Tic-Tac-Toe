import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const Square = (props)=>{
  const [value, setValue] = useState(null);
  return(
  <button className='square' onClick={props.onClickEvent}>
    {props.value}
  </button>
);
};

const Board = ()=>{
  const initialSquares= Array(9).fill(null);
  const [squares, setSquare] = useState(initialSquares);
  const [xIsNext, setXisNext]= useState(true);

const resetOnClick= (i)=>{
  const resetSquares = [...squares];
  resetSquares[i] = null
}


  const handleClickEvent= (i)=>{

    const newSquares = [...squares];   // Make copy of squares state array
    
    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if(winnerDeclared || squareFilled){
      return;
    }
    
    newSquares[i] = xIsNext? 'X': 'O';               
    setSquare(newSquares);
    setXisNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  const status= winner? `The Winner is: ${winner} Congrates`:  
  `Next player is: ${xIsNext? 'X': 'O'}`;

  const renderSquare= (i)=>{
    return(
      <Square 
      value={squares[i]}
      onClickEvent= {() =>{handleClickEvent(i)}}
      />
    );
  };

return(
  
    <div className='status'>
      {status}
   
    <div className='board-row'>
      {renderSquare(1)}{renderSquare(2)}{renderSquare(3)}
    </div>
    <div className='board-row'>
      {renderSquare(4)}{renderSquare(5)}{renderSquare(6)}
    </div>
    <div className='board-row'>
      {renderSquare(7)}{renderSquare(8)}{renderSquare(9)}
    </div> 
   </div>
);
};

const Game = ()=>{
  return(
    <div className='Game'>
      Tic-Tac-Toe
      <Board/>
    </div>
  );
};

function calculateWinner(squares){
  const lines = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],   //rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9],  //columns
    [1, 5, 9], [3, 5, 7],            //diagonals
  ];

    for( let line of lines){
      const [a, b, c] = line;

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return squares[a];   //return the winner 'x' or 'o'
      }
    }
    return null;
}


ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);