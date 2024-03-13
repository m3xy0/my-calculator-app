import { useState } from 'react';
import './App.css';
import Button from './components/Button';


function App() {
  const [input, setInput] = useState([0]);
  const currentValue = display(input);




  function write(e) {
    let regex1 = /[1234567890]/
    let regex2 = /[+\-/x]/
    if(input.join("").length > 15) {
      setInput(input);
    }
    
    else if( input[0] === 0 && e.target.innerText === "0") {
      setInput(input);
    }
    else if(input[0] === 0 && e.target.innerText !== ".") {
      setInput([e.target.innerText]);
    }

    else if (e.target.innerText === "=" && input[input.length - 1] !== "=") {
      let solution = calculate(input);
      setInput([...input,e.target.innerText, solution]);
    }
    else if (e.target.innerText === "=" && input[input.length - 1] === "=") {
      setInput([...input]);
    }

    else if (regex2.test(e.target.innerText)) { /* bir işarete basıldıysa */
      if(input[input.length-2] === "=") {
        setInput([...input.slice(-1), e.target.innerText]);
      } 
      else {
        if(regex2.test(input[input.length-1])  && input[input.length-1].toString().length < 2) { /* inputun son öğesi bir işaret ise */  /* +-/* */ 
          if (e.target.innerText === "-" && input[input.length - 1] !== "-")  { /* basılan işaret - ise ve son öğe - değil ise */
          setInput([...input, e.target.innerText]); /* işareti inputa ekle, yani yaz */ 
          }
          else { /* aksi halde; yani basılan işaret +,* ya da / ise veya son öğe - değil ise */ 
            if (regex2.test(input[input.length-2])) {
            setInput([...input.slice(0,input.length-2), e.target.innerText]);
            } 
            else {
              setInput([...input.slice(0, input.length - 1), e.target.innerText]); /* son öğeyi silip basılan işareti ekle */
            }
          }
        } 
        else { /* inputun son öğesi bir işaret değilse */ 
          setInput([...input,e.target.innerText]); /* basılan işareti inputa ekle */ 
        }
      }
    }
    else if (regex1.test(e.target.innerText)) {
      if (input[input.length-2] === "=") {
        setInput([e.target.innerText]);
      }
      else if (/[+/x]/.test(input[input.length-1])) {
        setInput([...input, e.target.innerText]);
      }
      else if (/-/.test(input[input.length-1]) && regex1.test(input[input.length-2])) {
        setInput([...input,e.target.innerText]);
      }
      else {
        setInput([...input.slice(0,-1), input.slice(-1)+e.target.innerText]);
      }
    }
    

    else if ( e.target.innerText === "." && regex2.test(input[input.length-1])) {
      setInput([...input, "0."]);
    }
    else if (e.target.innerText === "." && /\./.test(input[input.length - 1])) {
      setInput([...input]);
    }
    else {
      let newInput = input.slice(0,input.length-1).concat(input[input.length-1] + e.target.innerText);
      setInput(newInput);
    }
  }

  function display (){
    const characters = ["/","x","-","+"];
    const solution = calculate(input);

    if (characters.includes(input[input.length-1])) {
      return input[input.length-1];
    }
    else if (input.slice(-1) === "=") {
      return solution;
    }
    else if (input.some(element => element === "+" || element === "-" || element === "/" || element === "x") ) {
      return input.slice(input.length-1);
    }
    else {
      return input;
    }
  }

  function clear() {
    setInput([0]);
  }

  function division (Array) { 
    if (Array.indexOf("/",1) === -1) {
      return Array}
    else if (Array.indexOf("/",1)) {
    let divisionIndex = Array.indexOf("/",1);
    let result = (Array[divisionIndex-1] / Array[divisionIndex+1]).toString();
    let newArray = Array.slice(0,divisionIndex - 1).concat([result]).concat(Array.slice(divisionIndex + 2));
    return division(newArray);
    }
  }

  function addition (Array) { 
    if (Array.indexOf("+",1) === -1 || Array[0] === "x" || Array[0] === "/"){
      return Array}
    else if (Array.indexOf("+",1)){
    let additionIndex = Array.indexOf("+",1);
    let result = (+Array[additionIndex-1] + +Array[additionIndex+1]).toString();
    let newArray = Array.slice(1,additionIndex - 1).concat([result]).concat(Array.slice(additionIndex + 2));
    return addition(newArray);
    }
    else {
      return input;
    }
  }

  function multiplication (Array) { 
    if (Array.indexOf("x") === -1){
      return Array}
    else if (Array.indexOf("x") > 0){
    let multiplicationIndex = Array.indexOf("x");
    let result = (Array[multiplicationIndex-1] * Array[multiplicationIndex+1]).toString();
    let newArray = Array.slice(0,multiplicationIndex - 1).concat([result]).concat(Array.slice(multiplicationIndex + 2));
    return multiplication(newArray);
    }
    else {
      return input;
    }
  }


  function subtraction (Array) { 
    if (Array.indexOf("-",1) === -1){
      return Array}
    else if (Array.indexOf("-",1)) {
    let subtractionIndex = Array.indexOf("-",1);
    let result = (Array[subtractionIndex-1] - Array[subtractionIndex+1]).toString();
    let newArray = Array.slice(0,subtractionIndex - 1).concat([result]).concat(Array.slice(subtractionIndex + 2));
    return subtraction(newArray);
    }
    else {
      return input;
    }
  }
  
  function calculate(input) {
    let chiseledInput = input.filter(item => item !== "=");
    return addition(subtraction(multiplication(division(chiseledInput))))[0];
  }


  return (
    <div className="App">
      <div id="calculator">
        <div id="formula">{input}</div>
        <div id="display">{currentValue}</div>
        <div id="buttonDivs">
          <Button Id="clear" Content="AC" Write={clear}/>
          <Button Id="divide" Content="/" Write={write}/>
          <Button Id="multiply" Content="x" Write={write}/>
          <Button Id="seven" Content="7" Write={write}/>
          <Button Id="eight" Content="8" Write={write}/>
          <Button Id="nine" Content="9" Write={write}/>
          <Button Id="subtract" Content="-" Write={write}/>
          <Button Id="four" Content="4" Write={write}/>
          <Button Id="five" Content="5" Write={write}/>
          <Button Id="six" Content="6" Write={write}/>
          <Button Id="add" Content="+" Write={write}/>
          <Button Id="one" Content="1" Write={write}/>
          <Button Id="two" Content="2" Write={write}/>
          <Button Id="three" Content="3" Write={write}/>
          <Button Id="equals" Content="=" Write={write}/>
          <Button Id="zero" Content="0" Write={write}/>
          <Button Id="decimal" Content="." Write={write}/>
        </div>
      </div>
    </div>
  );
}

export default App;
