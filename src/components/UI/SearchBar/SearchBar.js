import React, { useState, useEffect, useRef } from 'react';
import axiosProducts from '../../../axios-products';
import svg from '../../../assets/images/sprite.svg';

import classes from './SearchBar.module.scss';
import SearchItem from './SearchItem/SearchItem';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    let searchWrapper = useRef(null);

    const onEscKeyDown = (event) => {
        if(event.keyCode === 27) {
            if(showSearchResults) {
                setShowSearchResults(showSearchResults => false);
            }
        }
    }

    const onClickOutside = (event) => {
        if((searchWrapper.current && !searchWrapper.current.contains(event.target)) && showSearchResults) {
            setShowSearchResults(showSearchResults => false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', onEscKeyDown);
        window.addEventListener('mousedown', onClickOutside);
        return () => {
            window.removeEventListener('keydown', onEscKeyDown);
            window.removeEventListener('mousedown', onClickOutside);
        }
    });

    const onInputChanged = (event) => {
        event.preventDefault();
        let inp = event.target.value;
        setSearchValue(inp);
        setShowSearchResults(showSearchResults => inp.length > 0);

        axiosProducts.get(`/search?incl=${event.target.value}`).then(response => {
            setSearchResults(searchResults => response.data.products);
        });
    }

    const onSearchSubmitHandler = (event) => {
        event.preventDefault();
    }

    const onSearchResultClickedHandler = () => {
        setShowSearchResults(showSearchResults => false);
        setSearchValue("");
        setSearchResults([]);
    }

    let searchResultClassList = [classes.SearchResults];
    if(!showSearchResults) {
        searchResultClassList = [classes.SearchResults];
    } else {
        searchResultClassList = [classes.SearchResults, classes.SearchResults__Shown];
    }

    let searchContent = <p>No such product was found!</p>;
    if(searchResults.length > 0) {
        searchContent = searchResults.map(item => {
            return <SearchItem 
                key={item._id}
                {...item}
                clicked={onSearchResultClickedHandler}
            />;
        });
    }

    return (
        <div className={classes.SearchBarWrapper} ref={searchWrapper}>
            <form className={classes.SearchBar} onSubmit={onSearchSubmitHandler}>
                <input 
                    type="text"
                    placeholder="What are you looking for?"
                    className={classes.SearchInput}
                    value={searchValue}
                    onChange={(event) => onInputChanged(event)}
                />
                
                <button className={classes.SearchButton}>
                    <svg className={classes.SearchIcon}>
                        <use xlinkHref={`${svg}#icon-search`}></use>
                    </svg>
                </button>
            </form>

            <div className={searchResultClassList.join(' ')}>
                {searchContent}
            </div>
        </div>
    )
}

export default SearchBar;