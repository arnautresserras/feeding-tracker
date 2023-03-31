import { useEffect, useState } from 'react';
import './NewFeed.css';

interface Props {
    setNewFeed: React.Dispatch<React.SetStateAction<boolean>>;
    setLastSide: React.Dispatch<React.SetStateAction<string>>;
}

const NewFeed = (props: Props) => {
    const [activeSide, setActiveSide] = useState('');
    const startTimeString = localStorage.getItem("lastFeedStart");
    const startTime = startTimeString ? new Date(+startTimeString) : null;
    const [timeDifference, setTimeDifference] = useState<number | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const endTime = new Date();
            if (startTime) {
                const diffInMs = endTime.getTime() - startTime.getTime();
                const diffInSec = Math.floor(diffInMs / 1000);
                setTimeDifference(diffInSec);
            }
            }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    if (!startTime) {
        return <span>Start time not found</span>;
    }

    const hours = Math.floor(timeDifference! / 3600);
    const minutes = Math.floor((timeDifference! % 3600) / 60);
    const seconds = (timeDifference! % 60);

    const formatTime = (value: number): string => {
        return value < 10 ? `0${value}` : `${value}`;
    };

    const endFeed = () => {
        const current =  new Date;
        localStorage.setItem("lastFeedEnd", current.getTime().toString());
        localStorage.setItem("lastFeedSide", activeSide);
        props.setLastSide(activeSide);
        props.setNewFeed(false);
    }

    return (
        <div className="NewFeed">
            <div className="NewFeed-row">
                <button 
                    className={`NewFeed-side ${activeSide == "L" ? 'active' : ''}`}
                    onClick={() => setActiveSide("L")}>
                        L
                </button>
                <button 
                    className={`NewFeed-side ${activeSide == "R" ? 'active' : ''}`}
                    onClick={() => setActiveSide("R")}>
                        R
                </button>
            </div>
            <div className="NewFeed-row">
                <p className='NewFeed-timer'>
                    <span>{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</span>
                </p>
            </div>
            <div className="NewFeed-row">
                <button className='NewFeed-stop' onClick={endFeed}>Stop</button>
            </div>
        </div>
    );
}

export default NewFeed;