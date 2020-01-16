import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

function App() {

  const [data, setData] = useState()

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
      })
    })

  return (
    <div className="App">
      <header className="App-header">
        {data.map(curr => {
          return (
            <div key={curr.id}>
            <p>curr.title</p>
            <p>curr.contents</p>
            </div>
          )
          
        })}
      </header>
    </div>
  );
}

export default App;
