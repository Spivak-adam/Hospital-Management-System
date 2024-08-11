import React, { useState } from 'react';

function SearchBar({ placeholder, onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm); // Trigger the search function as the user types
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={handleInputChange} 
                placeholder={placeholder} 
            />
        </div>
    );
}

export default SearchBar;
