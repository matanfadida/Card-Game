import { useEffect, useState } from 'react';
import classess from '../Stayls/Card.module.css'

const CardName = (props) => {
    const [matched, setMatched] = useState(props.selectedArray.some(x => x.key === props.animal));

    useEffect(() => {
        setMatched(props.selectedArray.some(x => x.key === props.animal));
    }, [props.tryFindName, props.selectedArray])
    

    const SelectedHandler = async (animal) => {
        if(props.noClick){
            return;
        }
        props.setTryFind(animal);
    }

    return <li className={`${classess.card} ${props.tryFindName === props.animal ? classess.selected : ""} ${matched ? classess.matched :""} ${props.noClick ? classess["not-click"] : ""}`} onClick={() => {SelectedHandler(props.animal)}}>
        {(props.tryFindName === props.animal || matched) && props.animal}
    </li>
}

export default CardName;