import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState()

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
    })

  return (
    <div className="App">
      <header className="App-header">
        {}
      </header>
    </div>
  );
}

export default App;
