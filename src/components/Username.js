import {Badge} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import { tryImage } from "../helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Username = (props) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const response = await axios.get(process.env.REACT_APP_HOST + `/api/users/id/${props.user}`)
        return response.data[0];
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res)
            setLoading(false)
        })
    }, [])

    if (loading) return <p>...</p>

    return (
        <>
            <img className="pfp" src={`${process.env.REACT_APP_HOST}/upload/${user.id}.webp`}></img>&nbsp;
            <b style={{color: (user.isAdmin) ? "red" : "" }}>{user.name || user.login}</b>&nbsp;
            {((user.isVerified) ? <FontAwesomeIcon style={{color: "dodgerblue"}} icon="fa-solid fa-check" /> : '')}
        </>
    )
}

export default Username;