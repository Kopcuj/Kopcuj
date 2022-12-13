import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import axios from "axios";
import Cookies from 'js-cookie';
import {Alert, Button, Card, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoadingScreen from '../components/LoadingScreen';
import { fetchHills, fetchUser, fetchUserClimbedHills } from '../helpers';
import EditProfile from '../components/EditProfile';


axios.defaults.withCredentials = true;

function ProfilePage() {
    const [user, setUser] = useState([]);
    const [hills, getHills] = useState([]);
    const [climbedHills, setClimbedHills] = useState([]);
    const [notClimbedHills, setNotClimbedHills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);

    const fetchData = () => {
        setLoading(true);
        fetchUser().then((res) => {
            setUser(res)
        })

        fetchHills().then((res) => {
            getHills(res)

            fetchUserClimbedHills().then((res) => {
                setClimbedHills(res);
                setLoading(false);
            })
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [edit])

    useEffect(() => {
        let ncHills = hills;

        climbedHills.forEach((hill) => {
            ncHills = ncHills.filter(item => item.id !== hill.id)
        })

        setNotClimbedHills(ncHills);
    }, [climbedHills])

    if (loading) return <LoadingScreen />;

    return (
        <>
            <div className={'container profile'}>
                <div className={'d-flex justify-content-between align-items-center mb-3'}>
                    <div className='d-flex mt-5 align-items-center'>
                        <img className='profile-image' src={`${process.env.REACT_APP_HOST}/upload/${user.id}.webp`}></img>&nbsp;
                        <h1 className={"d-inline-block"}>{user.login}</h1>&nbsp;<small className={"d-inline-block"}>({user.name})</small>
                    </div>

                    <EditProfile setEdit={setEdit} edit={edit} user={user}></EditProfile>
                </div>

                <div className={"mb-3 border-line"}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Card.Text>
                            {user.description === null ? "Popisek..." : user.description}
                        </Card.Text>
                    </div>
                </div>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Pokořené kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {climbedHills ? climbedHills?.map(hill => <li key={hill.id}>{hill.name}</li> ) : "Načítání..."}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card className={"mb-3"}>
                    <Card.Header>
                        <h2>Zbývající kopce</h2>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text className={"hills"}>
                            {notClimbedHills ? notClimbedHills?.map(hill => <li key={100+hill.id}>{hill.name}</li>) : "Načítání..."}
                        </Card.Text>
                    </Card.Body>
                </Card>

                <a href="/"><Button type="button" className="btn1">Domov</Button></a>

                {user.isVerified === false ?
                    <Alert className={"mt-3"} variant='info'>Email s ověřením účtu byl odeslán na email!</Alert> : ""}
            </div>

        </>
    )
}

export default ProfilePage;