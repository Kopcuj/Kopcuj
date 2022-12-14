import axios from "axios";
import Cookies from "js-cookie";

export const fetchUser = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + `/api/users/${Cookies.get('authToken')}`);
    return response.data[0];
}

export const fetchHills = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + `/api/hills/`);
    return response.data;
}

export const fetchUserClimbedHills = async () => {
    const response = await axios.get(process.env.REACT_APP_HOST + `/api/users/${Cookies.get('authToken')}/climbedHills`);
    return response.data;
}

export const tryImage = (path, name) => {
    try {
        return require(`${path}${name}.webp`);
    } catch (err) {
        return require(`./img/nohill.webp`);
    }
};