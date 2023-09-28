import './App.css';
import { useEffect, useState, Suspense } from 'react'
import Gallery from './Components/Gallery.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { createResource as fetchData } from './helper';
import Spinner from './Spinner.jsx';

function App() {
  let [search, setSearch] = useState(''); 
  let [data, setData] = useState(null);
  let [message] = useState('Search for Music!');

  //const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if (search) {
      document.title=`${search} Music`
      setData(fetchData(search))
      console.log(fetchData(search))
    // const fetchData = async () => {
    //   document.title = `${search} Music`;
    //   const response = await fetch(API_URL + search)
    //   const resData = await response.json()
    //   if (resData.results.length) {
    //     setData(resData.results)
    //   }else {
    //     setMessage('Not Found')
    //   }
    // }
    // fetchData();
  }
}, [search]); 

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  const renderGallery = () => {
    if(data) {
        return (
            <Suspense fallback={<Spinner />}>
                <Gallery data={data} />
            </Suspense>
        )
    }
}

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      {renderGallery()}
    </div>
  );
}




export default App;