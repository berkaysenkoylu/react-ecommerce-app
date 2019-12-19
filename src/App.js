import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './components/Home/Home';
import Authentication from './containers/Authentication/Authentication';

const App = (props) => {

	let content = (
		<Switch>
			<Route path='/auth' component={Authentication} />
			<Route path='/' exact component={Home} />
		</Switch>
	)

	return (
		<Layout>
			{content}
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return {
		isAuth: state.isAuth
	}
}

export default connect(mapStateToProps, null)(App);