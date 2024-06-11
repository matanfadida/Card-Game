import { useEffect, useState } from 'react';
import classess from '../Stayls/Card.module.css'

const CardName = (props) => {
    const [matched, setMatched] = useState(props.selectedArray.some(x => x.key === props.animal));
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(!matched || props.selectedArray.length === 0){
            setOpen(true);
            if(props.tryFindName === props.animal){
                setOpen(false);
            }
        }
        setMatched(props.selectedArray.some(x => x.key === props.animal));
    }, [props.tryFindName, props.selectedArray])
    
    const SelectedHandler = async (animal) => {
        if(props.noClick){
            return;
        }
        props.setTryFind(animal);
        setOpen(false);
    }

    return <li className={`${classess.card}  ${!open ? classess.open : classess.close} ${props.tryFindName === props.animal ? `${classess.selected}` : ""} ${matched ? classess.matched :""} ${props.noClick ? classess["not-click"] : ""}`} onClick={() => {SelectedHandler(props.animal)}}>
        {(props.tryFindName === props.animal || matched) && props.animal}
    </li>
}

export default CardName;