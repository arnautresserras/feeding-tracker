import React, { useEffect, useState } from 'react';
import LastFeed from './components/LastFeed/LastFeed';
import './App.css';
import NewFeed from './components/NewFeed/NewFeed';
import { BsMoonStars, BsSun } from "react-icons/bs";

function App() {

  const [newFeed, setNewFeed] = useState(false);
  const [lastSide, setLastSide] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setLastSide(localStorage.getItem("lastSide") ?? "");
  }, [])

  const trackTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const current =  new Date;
    setNewFeed(true);
    localStorage.setItem("lastFeedStart", current.getTime().toString());
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
        </div>
      )}
    </div>
  );
}

export default App;
