import './App.css';
import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { DataContext } from './Context/DataContext'
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';

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
      {message}
      <Router>
        <Routes>
          <Route path = "/" element = {
            <DataContext.Provider value={data} >
            <Fragment>
              <SearchBar handleSearch={handleSearch}  /> 
              <Gallery data={data} /> 
            </Fragment>
            </DataContext.Provider>
          } />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />  
         </Routes>
        </Router>
    </div>
  );
}

export default App;