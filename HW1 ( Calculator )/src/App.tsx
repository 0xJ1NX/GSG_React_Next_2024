
import './App.css'

import ButtonBox from './components/button-box/button-box.component'
import Screen from './components/screen/screen.component'
import { useState } from 'react'
import DisplayValue from './types/DisplayValue'

import { create, all } from 'mathjs';

const math = create(all);




function App() {

  const [displayValue, setDisplayValue] = useState<DisplayValue>({
    equation: "",
    result: ""
  })

  const [resultCalculated, setResultCalculated] = useState<boolean>(false);



  const buttonClickHandler = (button: string) => {

    console.log(`[App.tsx] Button ${button} clicked`);
    
    if (button === "=") {
      
      if (displayValue.equation === "") {
        return;
      }

      if (resultCalculated) {
        return;
      }

    
      try {

        //const result = eval(displayValue.equation);   //!! Don't use eval

        const result = math.evaluate(displayValue.equation);



        setDisplayValue({
          equation: displayValue.equation + " =",
          result: result
        });

      } catch (error) {
        setDisplayValue({
          equation: "Error",
          result: ""
        });

      }
      
      setResultCalculated(true);
      return;
    }

    if(resultCalculated){
      setDisplayValue({
        equation: button,
        result: ""
      });
      setResultCalculated(false);
      return;
    }

    setDisplayValue({
      equation: displayValue.equation + button,
      result: displayValue.result
    });


  }

  return (
    <>
      <div className="calculator">
        <Screen equation={displayValue.equation} result={displayValue.result} />
        <ButtonBox onButtonClick={buttonClickHandler} />
      </div>
    </>
  )
}

export default App
