import './App.css';
import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';
import AlbumView from './Components/AlbumView';
import ArtistView from './Components/ArtistView';
import { DataContext } from './Context/DataContext';
import { createResource as fetchData } from './helper';
import Spinner from './Spinner.jsx';

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [message] = useState('Search for Music!');

  useEffect(() => {
    if (search) {
      document.title = `${search} Music`;
      setData(fetchData(search));
      console.log(fetchData(search));
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
                  <Suspense fallback={<Spinner />}>
                    <Gallery data={data} />
                  </Suspense>
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
