import React, { Component } from 'react';

import classes from './Toolbar.module.scss';
import MenuToggle from '../../UI/MenuToggle/MenuToggle';
import Logo from '../../Logo/Logo';
import SearchBar from '../../UI/SearchBar/SearchBar';
import CartLink from '../../UI/CartLink/CartLink';
import NavigationItems from '../NavigationItems/NavigationItems';

class Toolbar extends Component {
    bottomNavClassList = [classes.BotNav];
    navToggleClassList = [classes.TopNav__MenuToggle];

    checkBoxRef = React.createRef();

    state = {
        showLinks: true,
        scrolledDown: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScrollEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScrollEvent);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.scrolledDown !== this.state.scrolledDown) {
            this.handleScrollEvent();
        }
    }

    handleScrollEvent = () => {
        if(!this.state.scrolledDown) {
            if(window.pageYOffset >= 50) {
                this.setState({
                    showLinks: false,
                    scrolledDown: true
                });
            }
            else {
                this.checkBoxRef.current.checked = false;
                this.setState({
                    showLinks: true
                });
            }
        }
        else {
            if(window.pageYOffset <= 5) {
                this.setState({
                    scrolledDown: false
                });
            }
        }
    };

    navToggleClickedHandler = () => {
        // Get the screen width and check if it is within the breakpoints
        // If it is, toggle big menu instead
        if(window.innerWidth <= 600) {
            this.props.toggleBigMenu();
        }

        // If the screen is larger, enlarge the navbar
        this.setState(prevState => {
            return {
                showLinks: !prevState.showLinks
            }
        });
    }

    render() {
        if(!this.state.showLinks) {
            this.bottomNavClassList = [classes.BotNav, classes.BotNavHidden];
        }
        else {
            this.bottomNavClassList = [classes.BotNav];
        }

        if(this.state.scrolledDown) {
            this.navToggleClassList = [classes.TopNav__MenuToggle, classes.TopNav__MenuToggle__Revealed];
        }
        else {
            this.navToggleClassList = [classes.TopNav__MenuToggle];
        }

        if(!this.props.hideNavbar) {
            if(this.checkBoxRef.current !== null) {
                this.checkBoxRef.current.checked = false;
            }
        }

        return (
            <header className={classes.Toolbar}>
                <div className={classes.TopNav}>
                    <div className={this.navToggleClassList.join(' ')}>
                        <MenuToggle clicked={this.navToggleClickedHandler} checkBox={this.checkBoxRef} />
                    </div>
                    
                    <div className={classes.TopNav__Middle} style={this.props.hideNavbar ? {display: 'none'} : null}>
                        <Logo />
                        <div className={classes.TopNav__Middle__Form} ref={this.wrapperRef}>
                            <SearchBar />
                        </div>
                    </div>
                    
                    <div className={classes.TopNav__Cta} style={this.props.hideNavbar ? {display: 'none'} : null}>
                        <CartLink isAuth={this.props.isAuth} />
                    </div>
                </div>
                
                <nav className={this.bottomNavClassList.join(' ')}>
                    <NavigationItems isAuth={this.props.isAuth} status={this.props.userStatus} />
                </nav>
            </header>
        );
    }
}

export default Toolbar;