import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import LoadingScreen from './LoadingScreen';
import { fetchUser } from '../helpers';

const PrivateRoute = ({children}) => {
	const [user, setUser] = useState();

	useEffect(() => {
		fetchUser().then((res) => {
			setUser(res)
		})

	}, [])

	if (user !== undefined) {
		return user.isAdmin ? children : <Navigate to="/login"/>;
	}

	return <LoadingScreen />;
}

export default PrivateRoute