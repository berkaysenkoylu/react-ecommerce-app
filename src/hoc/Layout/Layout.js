import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import BigMenu from '../../components/BigMenu/BigMenu';

const Layout = (props) => {
    const [openMenu, setOpenMenu] = useState(false);

    const onBigMenuToggled = () => {
        setOpenMenu(openMenu => !openMenu);
    }

    return (
        <Fragment>
            <Toolbar isAuth={props.isAuthenticated} userStatus={props.userStatus} toggleBigMenu={onBigMenuToggled} hideNavbar={openMenu} />

            <BigMenu show={openMenu} closed={onBigMenuToggled} isAuth={props.isAuthenticated} userStatus={props.userStatus} />
            
            <main style={{ marginTop: '8rem'}}>
                {props.children}
            </main>

            {/* FOOTER */}
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuth,
        userStatus: state.userStatus
    }
}

export default connect(mapStateToProps)(Layout);