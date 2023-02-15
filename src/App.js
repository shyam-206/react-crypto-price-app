import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin'

function App() {

  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    axios.get("https://api.coinstats.app/public/v1/coins?skip=0").then(
      (response) => {
        setListOfCoins(response.data.coins);
      }
    );
  }, []);

  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="crypto-header">
      <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      <div className="crypto-display">
        {filteredCoins.map((coin) => {
          return (
            <Coin 
              name = {coin.name}
              icon = {coin.icon}
              price = {coin.price}
              symbol = {coin.symbol}
            />
          )
        })}
      </div>
    </div>
  );
}

export default App;
