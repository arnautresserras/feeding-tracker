import React, { useEffect, useState } from 'react';
import './LastFeed.css';
import { timeStamp } from 'console';

interface Props{
    side: string
}

const LastFeed = (props: Props) => {
    const startTimeString = localStorage.getItem("lastFeedStart");
    const endTimeString = localStorage.getItem("lastFeedEnd");
    const startTime = startTimeString ? new Date(+startTimeString) : null;
    const endTime = endTimeString ? new Date(+endTimeString) : null;
    const [timeDifference, setTimeDifference] = useState<number | null>(null);
    const [feedDuration, setFeedDuration] = useState<string>("");

    useEffect(() => {
        if(endTime && startTime){
            const diff = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
            setFeedDuration(formatTime(Math.floor(diff! / 3600)) + ":" + formatTime(Math.floor((diff! % 3600) / 60)) + ":" + formatTime((diff! % 60)))
        }
    }, [])

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
        return (
            <section className='LastFeed'>
                <div className='LastFeed-row'>
                    <span>No previous feed found.</span>
                </div>
            </section>);
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
                <h2>Previous feed</h2>
            </div>
            <div className='LastFeed-row'>
                <p>
                    <span className='LastFeed-side'>Side: </span>
                    <span className='LastFeed-side'>{props.side}</span>
                </p>
            </div>
            <div className='LastFeed-row'>
                <p>
                    <span>Time: </span>
                    <span className='LastFeed-time'>{startTime.toLocaleTimeString("es-es")}</span>
                </p>
            </div>
            <div className='LastFeed-row'>
                <p>
                    <span>Duration: </span>
                    <span className='LastFeed-time'>{feedDuration}</span>
                </p>
            </div>            
            <div className='LastFeed-row'>
                <p>
                    {hours > 0 ? <span>{formatTime(hours)} h</span> : ""}
                    {minutes > 0 ? <span>{formatTime(minutes)} m </span> : ""}
                    {seconds > 0 ? <span>{formatTime(seconds)} s </span> : ""}
                    <span> ago</span>
                </p>
            </div>
        </section>
    )
}
export default LastFeed;