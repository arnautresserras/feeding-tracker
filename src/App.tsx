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

  useEffect(() => {
    setLastSide(localStorage.getItem("lastFeedSide") ?? "");
    const current =  new Date();
    localStorage.getItem("vitaminDrops") === current.getDate().toString() ? setVitaminDrops(true) : setVitaminDrops(false);
  }, [])

  const trackTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNewFeed(true);
    const current =  new Date();
    localStorage.setItem("lastFeedStart", current.getTime().toString());
  }

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
