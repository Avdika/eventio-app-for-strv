import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../Config/routes';
import { userContext } from '../Context/userContext';

const PublicRoute = ({ component: Component, ...options}) => {
	const { state } = useContext(userContext)
	const { isLogged } = state

	return <Route {...options} render={props => {
		return !isLogged ? <Component {...options} {...props} />
		: <Redirect to={ROUTES.EVENTS} />
	}} />
}

export default PublicRoute;
