import React from 'react';
import { Link } from 'react-router-dom';

import classes from './SearchItem.module.scss';

const SearchItem = (props) => {

    return (
        <Link to={`/products/${props._id}`} className={classes.SearchItemLink} onClick={props.clicked}>
            <div className={classes.SearchItem}>
                <img src={props.imageUrl} alt={props.name} className={classes.SearchItem__Image} />

                <p className={classes.SearchItem__Name}>{props.name}</p>

                <p className={classes.SearchItem__Price}>$ {props.price}</p>
            </div>
        </Link>
    )
}

export default SearchItem;