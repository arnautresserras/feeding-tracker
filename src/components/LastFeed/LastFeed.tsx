import React, { useEffect, useState } from 'react';
import './LastFeed.css';
import { timeStamp } from 'console';

const LastFeed = () => {
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


    return (
        <section className='LastFeed'>
            <div className='LastFeed-row'>
                <p>
                    <span className='LastFeed-side'>L</span>
                    <span> - Duration </span>
                    <span className='LastFeed-time'>00:18:52</span>
                </p>
            </div>
            <div className='LastFeed-row'>
                <p>
                    <span>{`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}</span>
                </p>
            </div>
        </section>
    )
}
export default LastFeed;