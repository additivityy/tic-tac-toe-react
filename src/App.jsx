import React from 'react';
import {useState} from 'react';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';

export default function App () {  
    const [xIsNext, setXIsNext] = useState(true);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const currentSquares = history[history.length - 1];
    const { width, height } = useWindowSize();

    function handlePlay(nextSquares) {
        setHistory([...history,nextSquares]);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (move) => {
        setHistory(history.slice(0, move + 1));
        setXIsNext(move % 2 === 0);
    }   

    const historyButtons = history.map((squares, move) => {
        let description;
        if (move > 0) {
        description = 'GO TO MOVE #' + move;
        } else {
        description = 'GO TO START !!';
        }
        return (
        <li key ={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    });   

    function getStatus() {
        const winner = calculateWinner(currentSquares);
        if (winner) {
          return `Winner: ${winner}!`;
        } else if (currentSquares.every(square => square !== null)) {
          return 'It’s a draw!';
        } else {
          return `Next player: ${xIsNext ? 'X' : 'O'}`;
        }
      }

    return (
    <div className='game'>
         {calculateWinner(currentSquares) && <Confetti width={width} height={height} 
            colors={['	#AFEEEE', '#0ABAB5', '#8FD6D6', '#FFBCD9', '#FF6F91', 'FC8EAC', 'FF69B4', 'FFC0CB', '#FFB6C1', '#FF00FF', '#FFB7CE']}
            />}
        <div className='game-column'>
            <h1>Tic-Tac-Toe</h1>
            <h2>{getStatus()}</h2>
            <div className='game-board'>
            <Board xIsNext={xIsNext} squares={currentSquares} onBoardClick= {handlePlay}/> 
            <div className='game-row'>                
                <div><ul>{historyButtons}</ul></div>
            </div>
            </div>
        </div>
    </div>);
};

function Board({xIsNext, squares, onBoardClick}) {

    function handleClick(i){
        const nextSquares = squares.slice();              
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        if(xIsNext){
            nextSquares[i] = 'X';
        }
        else{
            nextSquares[i] = 'O';
        }
        onBoardClick(nextSquares);
    }

    return <div className='board'>
    <div className='board-row'>
        <Square value={squares[0]} onSquareClick= {() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick= {() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick= {() => handleClick(2)}/>
    </div>
    <div className='board-row'>
        <Square value={squares[3]} onSquareClick= {() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick= {() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick= {() => handleClick(5)}/>
    </div>
    <div className='board-row'>
        <Square value={squares[6]} onSquareClick= {() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick= {() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick= {() => handleClick(8)}/>
    </div>  
</div>  
}

function Square({value, onSquareClick}) {  
    return <button className='square' onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

