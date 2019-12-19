import React from 'react';
import svg from '../../../assets/images/sprite.svg';

import classes from './SearchBar.module.scss';

const SearchBar = () => {
    return (
        <form className={classes.SearchBar}>
            <input type="text" placeholder="What are you looking for?" className={classes.SearchInput} />
            <button className={classes.SearchButton}>
                <svg className={classes.SearchIcon}>
                    <use xlinkHref={`${svg}#icon-search`}></use>
                </svg>
            </button>
        </form>
    )
}

export default SearchBar;