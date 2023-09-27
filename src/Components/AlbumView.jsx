// These components will be making separate API calls from the app
// component to serve specific data about a given album
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AlbumView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')

    const renderSongs = justSongs.map((song, index) => {
        return (
            <div key={index}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            <h2>{albumData.length ? albumData[0].collectionName : 'Loading...'}</h2>
            {renderSongs}
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    )
}

export default AlbumView