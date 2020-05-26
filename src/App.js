import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Pulse from 'react-reveal/Pulse'

import './App.css'

import img from './Images/kobe-4975863_1920.jpg'

function App() {
  const [card, setCard] = useState('') 

  useEffect(() => {
    fetchQuote()
    /* eslint-disable no-eval */
  }, []) 

  const fetchQuote = () => {
    axios.get('https://api.stoic.rest/quote')
      .then(res => {
        setCard('')
        const { author, quote } = res.data
        const authorCaps = author.charAt(0).toUpperCase() + author.slice(1)
        setCard(
          <Pulse duration={500}>
            <div className="inner-container">
              <p> {quote} </p>
              <cite> {authorCaps} </cite>
              <button onClick={handleOther}>Load Another</button>
            </div>
          </Pulse>
        )
      })
      .catch((err) => {
        console.log(err)
      })
      
  }

  const handleOther = () => {
    fetchQuote()
  }

  return (
    <div className="image-container" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${img})` }}>
      {card}
    </div>
  );
}

export default App;
