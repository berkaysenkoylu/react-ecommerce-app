import React, { useState } from 'react';
import svg from '../../../assets/images/sprite.svg';

import classes from './SearchBar.module.scss';
import SearchItem from './SearchItem/SearchItem';

const SearchBar = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([
        {
            id: "87jh23j123987akjdk213n",
            name: "Einstein",
            imageUrl: require('../../../assets/images/hard.jpg'),
            price: 12.99
        },
        {
            id: "87jh23j123987akasdsad",
            name: "Schrodinger",
            imageUrl: require('../../../assets/images/school.jpg'),
            price: 19.99
        }
    ]);

    const onInputChanged = (event) => {
        event.preventDefault();
        let inp = event.target.value;
        setSearchValue(inp);

        let copiedResults = [...searchResults];

        copiedResults = copiedResults.filter(item => {
            if(item.name.toLowerCase().includes(inp.toLowerCase())) {
                return item;
            }
            else {
                return null;
            }
        });

        // setSearchResults(searchResults => searchResults.filter(item => item.name.includes(inp) ? item : null));
    }

    let searchResultClassList = [classes.SearchResults];
    if(searchValue === "") {
        searchResultClassList = [classes.SearchResults];
    } else {
        searchResultClassList = [classes.SearchResults, classes.SearchResults__Shown];
    }

    return (
        <div className={classes.SearchBarWrapper}>
            <form className={classes.SearchBar}>
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
                {searchResults.map(item => {
                    return <SearchItem key={item.id} name={item.name} imageUrl={item.imageUrl} price={item.price} />
                })}
            </div>
        </div>
    )
}

export default SearchBar;