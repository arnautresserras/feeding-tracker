import { BsMoonStars, BsSun } from "react-icons/bs";

interface Props{
    vitaminDrops: boolean;
    setVitaminDrops: () => void;
}

const VitaminChecker = (props:Props) => {
    return (
        <button 
            className="VitaminChecker"
            onClick={() => props.setVitaminDrops()}>
            {props.vitaminDrops ? (
                <><BsMoonStars></BsMoonStars> Vitamins done!</>
            ) : (
                <><BsSun></BsSun> Vitamins missing today</>
            ) }
        </button>
    )
}

export default VitaminChecker;