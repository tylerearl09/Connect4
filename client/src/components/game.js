import logo from '../logo.svg';
import '../App.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
//import { useParams, useNavigate } from "react-router";

let moves = 0;

function Square({value, onSquareClick}){
  
  return (
  <button 
          className="square"
          id = {value}
            onClick={onSquareClick}
        >
              {value}
            </button>
            );
}  



export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(42).fill(null));

  function calculateWinner(squares) {
    const lines = [
      // Horizontal wins
      [0, 1, 2, 3],
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [3, 4, 5, 6],
      [7, 8, 9, 10],
      [8, 9, 10, 11],
      [9, 10, 11, 12],
      [10, 11, 12, 13],
      [14, 15, 16, 17],
      [15, 16, 17, 18],
      [16, 17, 18, 19],
      [17, 18, 19, 20],
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [23, 24, 25, 26],
      [24, 25, 26, 27],
      [28, 29, 30, 31],
      [29, 30, 31, 32],
      [30, 31, 32, 33],
      [31, 32, 33, 34],
      [35, 36, 37, 38],
      [36, 37, 38, 39],
      [37, 38, 39, 40],
      [38, 39, 40, 41],
      // Vertical wins
      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [3, 10, 17, 24],
      [4, 11, 18, 25],
      [5, 12, 19, 26],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 16, 23, 30],
      [10, 17, 24, 31],
      [11, 18, 25, 32],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [15, 22, 29, 36],
      [16, 23, 30, 37],
      [17, 24, 31, 38],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],
      // Diagonal wins
      [0, 8, 16, 24],
      [1, 9, 17, 25],
      [2, 10, 18, 26],
      [3, 11, 19, 27],
      [3, 9, 15, 21],
      [4, 10, 16, 22],
      [5, 11, 17, 23],
      [6, 12, 18, 24],
      [7, 15, 23, 31],
      [8, 16, 24, 32],
      [9, 17, 25, 33],
      [10, 18, 26, 34],
      [10, 16, 22, 28],
      [11, 17, 23, 29],
      [12, 18, 24, 30],
      [13, 19, 25, 31],
      [14, 22, 30, 38],
      [15, 23, 31, 39],
      [16, 24, 32, 40],
      [17, 25, 33, 41],
      [17, 23, 29, 35],
      [18, 24, 30, 36],
      [19, 25, 31, 37],
      [20, 26, 32, 38]
    ];

    
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c] &&
        squares[c] === squares[d]
      ) {
        return squares[a];
      }      
    
  }
  if (squares[41] && squares[40] && squares[39] && squares [38] && squares[37] && squares[36] && squares[35]){
    return "Tie";
  }
  
    return null;
  }

  function handleClick(i) {
    
    if (calculateWinner(squares)){
      return;
    }
    
    for(let j = 0; j <= 6; j++){
      if(j === 6) return;
      if(squares[i]){
        i += 7;
      }
      else break;
    }

    moves++;
    
    const nextSquares = squares.slice();
    if (xIsNext){
    nextSquares[i] = "X";
    const element = document.querySelector('.S1');
    console.log(element) 
       
    }
    else{
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext (!xIsNext);
  }

  const winner = calculateWinner(squares);
    let status;
    if (winner){
      status = "Winner: " + winner;      
      //window.location.replace("http://localhost:3000/create");
      let thing = document.getElementById("newRecord");
      thing.style.display = 'inline'
      
      if(winner === "Tie"){
        status = "Tie";
      }
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }

    const [form, setForm] = useState({
      name: "",
      score: "",
    });
    const navigate = useNavigate();
    
    // These methods will update the state properties.
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }
    
    // This function will handle the submission.
    async function onSubmit(e) {
      e.preventDefault();
    
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newPerson = { ...form };
      newPerson.score = Math.ceil(moves / 2);
    
      await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
    
      setForm({ name: "", score: "" });
      // window.location.replace("http://localhost:3000");
      navigate("/recordList");
    }
    
    

  return (
  <>
  <div className='status'>{status}</div>
  <div className="board-row">
    <Square value = {squares[35]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[36]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[37]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[38]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[39]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[40]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[41]} onSquareClick={() => handleClick(6)}/>   
  </div>

  <div className="board-row">
    <Square value = {squares[28]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[29]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[30]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[31]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[32]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[33]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[34]} onSquareClick={() => handleClick(6)}/>   
  </div> 
  
  <div className="board-row">
    <Square value = {squares[21]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[22]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[23]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[24]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[25]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[26]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[27]} onSquareClick={() => handleClick(6)}/> 
  </div>
  
  <div className="board-row">
    <Square value = {squares[14]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[15]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[16]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[17]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[18]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[19]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[20]} onSquareClick={() => handleClick(6)}/>   
  </div>

  <div className="board-row">
    <Square value = {squares[7]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[8]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[9]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[10]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[11]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[12]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[13]} onSquareClick={() => handleClick(6)}/>    
  </div>
  
  <div className="board-row">
    <Square value = {squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value = {squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value = {squares[2]} onSquareClick={() => handleClick(2)}/>
    <Square value = {squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value = {squares[4]} onSquareClick={() => handleClick(4)}/>  
    <Square value = {squares[5]} onSquareClick={() => handleClick(5)}/>  
    <Square value = {squares[6]} onSquareClick={() => handleClick(6)}/>   
  </div>
  <div id="newRecord">
     <h3>Submit New Score</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">Name</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="score">Score</label>
         
         <input
           type="int"
           className="form-control"
           id="score"
           value={Math.ceil(moves / 2)}
           onSubmit={(e) => updateForm({ score: e.target.value })}
         />
       </div>       
       <div className="form-group">
         <input
           type="submit"
           value="Submit New Score"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
  
</>
  );
}
  




// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
