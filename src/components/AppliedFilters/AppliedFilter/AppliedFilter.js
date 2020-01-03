import React from 'react';

import classes from './AppliedFilter.module.scss';

const AppliedFilter = (props) => {
    return (
        <div className={classes.AppliedFilter}>
            <span className={classes.AppliedFilter__Name}>
                {props.name}
            </span>
            <span className={classes.AppliedFilter__Button} onClick={() => props.closed(props.name, props.type)}>
                X
            </span>
        </div>
    );
}

export default AppliedFilter;