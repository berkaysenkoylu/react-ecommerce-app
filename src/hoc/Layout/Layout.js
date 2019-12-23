import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar isAuth={props.isAuthenticated} />
            
            <main style={{ marginTop: '8rem'}}>
                {props.children}
            </main>

            {/* FOOTER */}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuth
    }
}

export default connect(mapStateToProps)(Layout);