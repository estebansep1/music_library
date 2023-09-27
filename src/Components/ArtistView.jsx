import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

function ArtistView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

    const renderAlbums = justAlbums.map((album, index) => {
        return (
            <div key={index}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            <h2>{artistData.length ? artistData[0].artistName : 'Loading...'}</h2>
            {renderAlbums}
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        </div>
    )
}

export default ArtistView