import React, {useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from "axios";
import LoadingScreen from './LoadingScreen';

const PrivateRoute = ({children}) => {
	const [user, setUser] = useState();

	const fetchUser = async () => {
		const response = await axios.get(process.env.REACT_APP_HOST + `/api/users/${Cookies.get('authToken')}`);
		return response.data[0]
	}

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