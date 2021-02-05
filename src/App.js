import { useState } from 'react';
import { randomCombo, isItValid, gameCondition } from './game';
import './App.css';

// React set up
function App() {
  // Sets the random secret combo
  const [randCombo, setGoal] = useState(randomCombo());
  // User's guess
  const [guess, setInput] = useState("");
  // Guesses that the user has made
  const [guesses, setGuesses] = useState([]);
  // Results of the user's guesses
  const [result, setResult] = useState([]);

  // User's input
  function userInput(ev) {
    let num = ev.target.value;
    setInput(num);
  }

  // Resets the text guess box to be blank
  function resetBox() {
    setInput("");
  }

  // Adds the user's guess to the group of guesses
  function addGuess(num) {
    guesses.push(num);
  }

  // Restarts the game
  function restart() {
    window.location.reload();
  }

  // Key press enter function
  function keypress(ev) {
    if (ev.key == "Enter") {
      setGuesses(Array.from(new Set(guesses.concat(guess))));
      setInput("");
    }
  }

  // Checks whether the guess is valid and returns the result
  function checkGuess(num) {
    if (isItValid(num)) {
      let bulls = 0;
      let cows = 0
      let guess = num.split("");
      for (let i = 0; i < guess.length; i++) {
        let digit = parseInt(guess[i]);
        if (digit === randCombo[i]) {
          bulls++;
        } else if (randCombo.includes(digit)) {
          cows++;
        }
      }
      let string = bulls.toString() + "A" + cows.toString() + "B";

      addGuess(num)
      result.push(string);
      let randStr = strConvert();
      gameCondition(guesses, bulls, randStr);
    }
  }

  // Coverts the random combo to a string
  function strConvert() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += randCombo[i];

    }
    return result;
  }

  // Updates the table with every new user guess
  function UpdateTable() {
    let rows = [];
    for (let i = 0; i < 8; i++) {
      rows.push(
        <tr>
          <td>
            {i + 1}
          </td>
          <td>
            {guesses[i]}
          </td>
          <td>
            {result[i]}
          </td>
        </tr>
      )
    }
    return rows;
  }

  // Sets up the html for the page
  return (
    <div className="App">
      <header>
        <h1>Bulls and Cows</h1>
        <div>Guess the secret 4 digit combo.</div>
        <div>Once a guess has been made, it will be evaluated in the results column.</div>
        <div>B means you have a right digit in the right place.</div>
        <div>C means you have a right digit in the wrong place.</div>
        <div>You have 8 attempts</div>
        <div>Good Luck!</div>
      </header>
      <div><h3>Put in a unique, 4 digit guess:</h3></div>
      <input id="guess" type="text" value={guess} onChange={userInput} onKeyPress={keypress}></input>
      <br></br>
      <button onClick={() => { resetBox(); checkGuess(guess) }}>Guess!</button>
      <br></br>
      <table class="center">
        <tr>
          <th>Attempt</th>
          <th>Guesses</th>
          <th>Results</th>
        </tr>
        <UpdateTable></UpdateTable>
      </table>
      <br></br>
      <button onClick={restart}>Restart Game</button>
      <br></br>
    </div>
  );
}

export default App;
