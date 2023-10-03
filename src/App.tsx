import React, { useEffect, useState } from 'react';
import LastFeed from './components/LastFeed/LastFeed';
import './App.css';
import NewFeed from './components/NewFeed/NewFeed';
import { BsMoonStars, BsSun } from "react-icons/bs";
import VitaminChecker from './components/VitaminChecker/VitaminChecker';

function App() {

  const [newFeed, setNewFeed] = useState(false);
  const [lastSide, setLastSide] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [vitaminDrops, setVitaminDrops] = useState(false);

  // This code uses the useEffect hook to set the last side that the user was on
  // and to determine whether the user has taken their vitamin drops today.
  // It then sets the state for those variables.

  useEffect(() => {
    setLastSide(localStorage.getItem("lastFeedSide") ?? "");
    const current =  new Date();
    localStorage.getItem("vitaminDrops") === current.getDate().toString() ? setVitaminDrops(true) : setVitaminDrops(false);
  }, [])

  // This code checks the local storage for the date of the last time the user took their vitamins. 
  // It then compares that date to the current date, and if they match, it sets the state of vitaminDrops to true.
  // If they don't match, it sets the state of vitaminDrops to false.
  useEffect(() => {
    const interval = setInterval(() => {
      const current =  new Date();
      localStorage.getItem("vitaminDrops") === current.getDate().toString() ? setVitaminDrops(true) : setVitaminDrops(false);
    }, 7200000);
    return () => clearInterval(interval);
  }, [])

  // This function is called whenever the user clicks the "Track Time" button. It updates the state of the app to indicate that the user has started a new feed.
  const trackTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNewFeed(true);
    // The current time is stored in the user's local storage so it can be used later.
    const current =  new Date();
    localStorage.setItem("lastFeedStart", current.getTime().toString());
    // If the user has already taken vitamin drops today, then the state is updated to reflect this.
    localStorage.getItem("vitaminDrops") === current.getDate().toString() ? setVitaminDrops(true) : setVitaminDrops(false);
  }

  //The trackDrops function will set the vitaminDrops variable to true and save the date and time that the function was called in local storage. 
  const trackDrops = () => {
    setVitaminDrops(true);
    const current =  new Date();
    localStorage.setItem("vitaminDrops", current.getDate().toString());
  }

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="App-mode">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BsSun /> : <BsMoonStars/>}
        </button>
      </div>
      <h1 className='title'>Baby feeding tracker</h1>
      {newFeed ? (
          <NewFeed setNewFeed={setNewFeed} setLastSide={setLastSide}></NewFeed>
      ) : (
        <div className='App-content'>
          <button className='track-feed' onClick={e => trackTime(e)}>Start feed</button>
          <LastFeed side={lastSide}/>
          <VitaminChecker vitaminDrops={vitaminDrops} setVitaminDrops={trackDrops}/>
        </div>
      )}
    </div>
  );
}

export default App;
