import React, { useState } from 'react';

function SearchBar({ placeholder, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleInputChange} 
                placeholder={placeholder} 
            />
            <button onClick={handleSearchClick}>Search</button>
        </div>
    );
}

export default SearchBar;
