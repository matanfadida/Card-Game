import { useEffect, useState } from 'react';
import classess from '../Stayls/Game.module.css'
import CardName from "./CardName";
import CardImage from './CardImage';

const USERS = [{ id: 1, score: 0 }, { id: 2, score: 0 }];
const Game = (props) => {
    const [selectedArray, setSelectedArray] = useState([]);
    const [tryFindName, setTryFindName] = useState("");
    const [tryFindImage, setTryFindimage] = useState("");
    const [userPlay, setUserPlay] = useState(0);
    const [names, setNames] = useState(Object.keys(props.animals))
    const [images, setImages] = useState(Object.values(props.animals))

    useEffect(() => {
        if (tryFindName && tryFindImage) {
            MatchHandler();
        }
    }, [tryFindName, tryFindImage]);

    useEffect(() => {
        if (selectedArray.length > 0 && names.every(x => selectedArray.map(y => y.key).includes(x))) {
            setTimeout(() => {
                setSelectedArray([]);
                setTryFindName("");
                setTryFindimage("");
            }, 1000)
        }
    }, [selectedArray])

    useEffect(() => {
        Suffel();
        setUserPlay(1);
    }, []);

    const Suffel = () => {
        const keys = names;
        const values = images;

        // Fisher-Yates shuffle algorithm for shuffling arrays
        for (let i = keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap keys
            [keys[i], keys[j]] = [keys[j], keys[i]];
        }
        for (let i = keys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap values
            [values[i], values[j]] = [values[j], values[i]];
        }

        // Reconstruct the shuffled object
        const shuffledObj = {};
        for (let i = 0; i < keys.length; i++) {
            shuffledObj[keys[i]] = values[i];
        }
        setNames(Object.keys(shuffledObj));
        setImages(Object.values(shuffledObj));
    }

    const MatchHandler = () => {
        var nameFind = Object.keys(props.animals).filter(x => x === tryFindName);
        var imageFind = props.animals[nameFind] === tryFindImage;
        if (nameFind.length > 0 && imageFind) {
            setSelectedArray(prevSelectedArray => [...prevSelectedArray, { key: tryFindName, value: tryFindImage }]);
            let user = USERS.find(user => user.id === userPlay);
            user.score += 1;
        } else {
            let nextPlayer = userPlay + 1;
            if (nextPlayer > USERS.length) {
                nextPlayer = 1;
            }
            setUserPlay(nextPlayer);
        }
        setTimeout(() => {
            setTryFindName("");
            setTryFindimage("");
        }, 1000)
    }

    const TryFindNameHandler = (animal) => {
        setTryFindName(animal);
    }

    const TryFindImageHandler = (animal) => {
        setTryFindimage(animal);
    }

    const NewMatch = () => {
        USERS.map(user => user.score = 0);
        setSelectedArray([]);
        setTryFindName("");
        setTryFindimage("");
        Suffel();
    }

    return <div>
        {USERS.map((user, i) => <div key={i}>{`record-${user.id}: ${user.score}`}</div>)}
        <div>
            <button onClick={NewMatch}>New Game</button>
        </div>
        <div className={classess.game}>
            <div>
                <ul className={classess['grid-list']}>
                    {names.map((animal, i) => <CardName
                    selectedArray={selectedArray}
                    MatchHandler={MatchHandler}
                    key={i}
                    animal={animal}
                    noClick={tryFindName !== ""}
                    tryFindName={tryFindName}
                    setTryFind={TryFindNameHandler} />)}
                    </ul>
            </div>
            <div>
                <ul className={classess['grid-list']}>
                    {images.map((animal, i) => <CardImage
                        selectedArray={selectedArray}
                        MatchHandler={MatchHandler}
                        key={i}
                        animal={animal}
                        noClick={tryFindImage !== ""}
                        tryFindName={tryFindImage}
                        setTryFind={TryFindImageHandler}
                    />)}
                </ul>
            </div>
        </div>
    </div>
}

export default Game;