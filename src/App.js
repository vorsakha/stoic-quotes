import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Pulse from 'react-reveal/Pulse'

import './App.css'

import { imgs } from './Images/Images'

function App() {
  const [bgImage, setBg] = useState('')
  const [card, setCard] = useState('') 

  useEffect(() => {
    fetchQuote()
    fetchImage()
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

  const fetchImage = () => {
    const index = Math.floor(Math.random() * 10)
    setBg(imgs[index])
  }

  const handleOther = () => {
    fetchQuote()
    fetchImage()
  }

  return (
    <div className="image-container" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgImage})` }}>
      {card}
    </div>
  );
}

export default App;
