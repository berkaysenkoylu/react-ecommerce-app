import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import BigMenu from '../../components/BigMenu/BigMenu';
import Footer from '../../components/Footer/Footer';
import UserChat from '../../components/UserChat/UserChat';

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

            { props.userStatus === 'user' ? <UserChat userId={props.userId} username={props.username} /> : null }

            <Footer />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        username: state.username,
        isAuthenticated: state.isAuth,
        userStatus: state.userStatus
    }
}

export default connect(mapStateToProps)(Layout);