import React, { Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />
            
            <main style={{ marginTop: '8rem'}}>
                {props.children}
            </main>

            {/* FOOTER */}
        </Fragment>
    )
}

export default Layout;