import React from 'react';
import './search.css';

const Search = ({handleSearch, searchValue, onInputChange}) => {
  return (
    <div>
         <form className="d-flex" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control"
          placeholder="Search ..."
          value={searchValue}
          onChange={onInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default Search