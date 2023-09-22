import './App.css';
import { useEffect, useState } from 'react'
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';

function App() {
  let [search, setSearch] = useState(''); 
  let [data, setData] = useState([]);
  let [message, setMessage] = useState('Search for Music!');

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (search) {
    const fetchData = async () => {
      document.title = `${search} Music`;
      const response = await fetch(API_URL + search)
      const resData = await response.json()
      if (resData.results.length) {
        setData(resData.results)
      }else {
        setMessage('Not Found')
      }
    }
    fetchData();
  }
}, [search]); 

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch}  /> 
      {message}
      <Gallery data={data}/> 
    </div>
  );
}

export default App;
