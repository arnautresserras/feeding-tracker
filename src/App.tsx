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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const current =  new Date();

  useEffect(() => {
    setLastSide(localStorage.getItem("lastSide") ?? "");
    localStorage.getItem("vitaminDrops") === current.getDate().toString() ? setVitaminDrops(true) : setVitaminDrops(false);
  }, [])

  const trackTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setNewFeed(true);
    localStorage.setItem("lastFeedStart", current.getTime().toString());
  }

  const trackDrops = () => {
    setVitaminDrops(true);
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
        </div>
      )}
      <VitaminChecker vitaminDrops={vitaminDrops} setVitaminDrops={trackDrops}/>
    </div>
  );
}

export default App;
