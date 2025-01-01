
import "./button.css";


interface IProps {
    text: string;
    onClick: (button: string) => void;
    className?: string;
}

function Button(props: IProps){

    const handleButtonClick = () => {

        // console.log(`[Button.tsx] Button ${props.text} clicked`);
        
        props.onClick(props.text);
    }

    return (
        <button className={props.className} onClick={handleButtonClick}>{props.text}</button>
    );
}

export default Button;
