import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('Search for Music!');

  const API_URL = 'https://itunes.apple.com/search?term=';

  useEffect(() => {
    if (search) {
      const fetchData = async () => {
        document.title = `${search} Music`;
        const response = await fetch(API_URL + search);
        const resData = await response.json();
        if (resData.results.length) {
          setData(resData.results);
        } else {
          setMessage('Not Found');
        }
      };
      fetchData();
    }
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch(term);
  };

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <DataContext.Provider value={data}>
                <React.Fragment>
                  <SearchBar handleSearch={handleSearch} />
                  <Gallery data={data} />
                </React.Fragment>
              </DataContext.Provider>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
