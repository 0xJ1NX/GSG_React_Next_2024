
import "./screen.css"
import DisplayValue from "../../types/DisplayValue.ts"

interface IProps extends DisplayValue {
}



function Screen(props: IProps){


    return (
        <div className="screen">
            <div className="result">{props.result}</div>
            <div className="equation">{props.equation}</div>
        </div>
    )

}



export default Screen;