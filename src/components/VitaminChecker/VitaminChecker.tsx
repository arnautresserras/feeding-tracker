import { BsMoonStars, BsSun } from "react-icons/bs";

interface Props{
    vitaminDrops: boolean;
    setVitaminDrops: () => void;
}

const VitaminChecker = (props:Props) => {
    return (
        <button 
            className={`VitaminChecker ${props.vitaminDrops === true ? 'active' : ''}`}
            onClick={() => props.setVitaminDrops()}>
            {props.vitaminDrops ? (
                <span><BsMoonStars></BsMoonStars> Vitamins done!</span>
            ) : (
                <span><BsSun></BsSun> Vitamins missing today</span>
            ) }
        </button>
    )
}

export default VitaminChecker;