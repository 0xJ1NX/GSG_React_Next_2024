import Button from "../button/button.component";
import "./button-box.css";


const BUTTONS = [ 
    "1", "2", "3",
     "4", "5", "6", 
     "7", "8", "9", 
     "0", "+", "-", 
];


interface IProps {
    onButtonClick: (button: string) => void;
}


function ButtonBox(props: IProps){

    const handleButtonClick = (button: string) => {
        // console.log(`[ButtonBox.tsx] Button ${button} clicked`);
        props.onButtonClick(button);
    }

    return (
        <div className="btn-box">

            <div className="upper-part">
                {BUTTONS.map((button, index) => (
                    <Button 
                        key={index} 
                        text={button} 
                        onClick={handleButtonClick} 
                        className={
                            ((button === "+" || button === "-") ? "btn-operator" :"btn-operand")
                        }
                    />
                ))}
            </div>

            <div className="lower-part">
                <Button text="=" onClick={handleButtonClick} className="btn-equals" />
            </div>
            
        </div>

    );
}


export default ButtonBox;

