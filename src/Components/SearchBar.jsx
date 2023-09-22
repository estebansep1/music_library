import { useState } from 'react'

export default function SearchBar(props) {
let [searchTerm, setSearchTerm] = useState('')

    return (
        <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>
            <input type="text" placeholder="Enter a search term"
            onChange={e => setSearchTerm(e.target.value)} />
            <input type="submit" />
        </form>
    )
}