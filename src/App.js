import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';
import Logout from './components/Auth/Logout/Logout';
import ProductContainer from './containers/ProductContainer/ProductContainer';
import AdminProduct from './containers/AdminProduct/AdminProduct';
import ProductPage from './components/ProductPage/ProductPage';

import * as actions from './store/actions/index';

const App = (props) => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.authCheckState());
	}, [dispatch]);

	let routes = (
		<Switch>
			<Route path='/products/:id' component={ProductPage} />
			<Route path='/products' component={ProductContainer} />
			<Route path='/auth' component={Authentication} />
			<Route path='/' exact component={Home} />
			<Redirect to='/' />
		</Switch>
	);

  
	if(props.isAuth) {
		routes = (
			<Switch>
				{props.userStatus === 'admin' ? <Route path='/admin' component={AdminProduct} /> : null}
				<Route path='/products/:id' component={ProductPage} />
				<Route path='/products' component={ProductContainer} />
				<Route path='/logout' component={Logout} />
				<Route path='/auth' component={Authentication} />
				<Route path='/' exact component={Home} />
				<Redirect to='/' />
			</Switch>
		);
	}

	return (
		<Layout>
			{routes}
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.isAuth,
		userStatus: state.userStatus
	}
}

export default connect(mapStateToProps, null)(App);