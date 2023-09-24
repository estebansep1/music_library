import { SearchContext } from '../Context/SearchContext.js'
import { useContext } from 'react'

export default function SearchBar() {
const {term, handleSearch} = useContext(SearchContext)

    return (
        <form>
            <input ref={term} type="text" placeholder="Enter a search term" />
            <input type="submit" onClick={e => handleSearch(e, term.current.value)} />
        </form>
    )
}