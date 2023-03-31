import React, { useState } from 'react';
import LastFeed from './components/LastFeed/LastFeed';
import './App.css';
import NewFeed from './components/NewFeed/NewFeed';

function App() {

  const [newFeed, setNewFeed] = useState(false);

  const trackTime = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const current =  new Date;
    setNewFeed(true);
    localStorage.setItem("lastFeedStart", current.getTime().toString());
  }

  return (
    <div>
      {newFeed ? (
        <div className="App">
          <NewFeed setNewFeed={setNewFeed}></NewFeed>
        </div>
      ) : (
        <div className='App'>
          <button onClick={e => trackTime(e)}>+ Track feed</button>
          <LastFeed></LastFeed>
        </div>
      )}
    </div>
  );
}

export default App;
