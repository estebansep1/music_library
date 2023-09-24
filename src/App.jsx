import './App.css';
import { useState, useRef } from 'react'
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { DataContext } from './Context/DataContext.js'
import { SearchContext } from './Context/SearchContext.js'

function App() {
  let [data, setData] = useState([]);
  let [message, setMessage] = useState('Search for Music!');
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='



  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${term} Music`;
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      if (resData.results.length) {
        setData(resData.results)
      }else {
        setMessage('Not Found')
      }
    }
    fetchData()
  }

  return (
    <div className="App">
      <SearchContext.Provider value={{
        term: searchInput,
        handleSearch: handleSearch
      }}>
        <SearchBar /> 
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data} >
      <Gallery/> 
      </DataContext.Provider>
    </div>
  );
}

export default App;