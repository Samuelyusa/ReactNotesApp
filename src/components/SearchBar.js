import React from 'react';
import PropTypes from 'prop-types';
import { LangConsumer } from '../contexts/LangContext';

function SearchBar({ keyword, keywordChange }) {
    return (
        <LangConsumer>
            {
                ({language}) => {
                    return(
                        <section className='search-bar'>
                            <input
                            className="search-bar"
                            type="text"
                            placeholder={language === 'id' ? 'Cari berdasarkan judul..' : 'Search by title..'}
                            value={keyword}
                            onChange={(event) => keywordChange(event.target.value)} />
                        </section>
                    ) 
                }
            }
        </LangConsumer>
    )
}

SearchBar.propType = {
    keyword: PropTypes.string.isRequired,
    keywordChange: PropTypes.func.isRequired
}

export default SearchBar;