import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import Map from '../components/Map'
import Cookies from 'js-cookie';
import Searchbar from '../components/Searchbar';
import Sidebar from '../components/Sidebar';
import {Button, Dropdown, DropdownButton} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { fetchHills, fetchUser, fetchUserClimbedHills } from '../helpers';
import LoadingScreen from '../components/LoadingScreen';

axios.defaults.withCredentials = true;

function MapPage() {
    //USER
    const [userClimbedHills, setUserClimbedHills] = useState([]);

    //Hill variables
    const [hills, setHills] = useState([]);
    const [currentHill, setCurrentHill] = useState();
    const [climbed, setClimbed] = useState(true);
    const [btnClimb, setBtnClimb] = useState(false);

    //Misc variables
    const [center, setCenter] = useState(true)
    const [centerValue, setCenterValue] = useState(null)
    const [user, setUser] = useState([]);

    //Reviews variables
    const [rating, setRating] = useState(0);
    const [txtArea, setTxtArea] = useState('none');
    const [btnHelpful, setBtnHelpful] = useState(false);

    const navigate = useNavigate();

    //Check if user is logged in. If not, redirect user to login page
    let authToken = Cookies.get('authToken');
    if (authToken === '' || authToken === undefined || authToken === null) {
        document.location.replace(document.location + 'login');
    }

    //Functions
    const logout = () => {
        Cookies.remove("authToken");
        navigate("/login");
    }

    const mapClicked = async (e) => {
        if (e.target.toString() === '[object HTMLImageElement]') {
            setCurrentHill(undefined);
            setCenter(false);
            setClimbed(false);
            setTxtArea('none')

            let hillName = e.target.title;
            let clickedHill = await axios.get(process.env.REACT_APP_HOST + `/api/hills/name/${hillName}`);
            clickedHill = clickedHill.data[0];

            if (userClimbedHills.filter(uHill => uHill.id === clickedHill.id)[0] !== undefined) setClimbed(true);

            setCurrentHill(clickedHill);
        }
    }

    useEffect(() => {
        fetchUser().then((res) => {
            setUser(res);
        })

        fetchUserClimbedHills().then((res) => {
            setUserClimbedHills(res);
        })

        fetchHills().then((res) => {
            setHills(res);
        })
    }, [])

    //BTN CLIMBED PRESSED
    useEffect(() => {
        fetchUserClimbedHills().then((res) => {
            setUserClimbedHills(res);
        })

        setClimbed(true)
    }, [btnClimb])

    return (
        <>
            {
                (user === '' || user === undefined || user === null) ?
                    document.location.replace(document.location + 'login') : null
            }

            <Searchbar hills={hills} setCenter={setCenter} setCenterValue={setCenterValue}/>

            {currentHill && <Sidebar    currentHill={currentHill}
                                        setBtnClimb={setBtnClimb}
                                        btnClimb={btnClimb}
                                        rating={rating}
                                        user={user}
                                        setTxtArea={setTxtArea}
                                        btnHelpful={btnHelpful}
                                        setBtnHelpful={setBtnHelpful}
                                        climbed={climbed}
                                        setRating={setRating}
                                        txtArea={txtArea}
            />
            }


            <div className='bottomItems'>


                <DropdownButton
                    drop={"up"}
                    title={<img alt={"profile"} className='pfp' src={`${process.env.REACT_APP_HOST}/upload/${user.id}.webp`} onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=require(`../img/nohill.webp`);
                      }}></img>}
                    variant={""}
                >
                    <Dropdown.Item eventKey="1" onClick={() => navigate("/profile")}>Profil</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={() => navigate("/settings")}>Nastaven??</Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={logout}>Odhl??sit se</Dropdown.Item>
                </DropdownButton>

                <a href={'/discussions'}><Button type="button" className="btn1">Diskuze</Button></a>

                {user.isAdmin ? <a href={'/admin'}>
                    <Button type="button" className="btn1">Admin</Button>
                </a> : null}
            </div>


            <div className={"clickMap"} onClick={mapClicked}>
                {userClimbedHills !== undefined ?
                    <Map center={center} centerValue={centerValue} userClimbedHills={userClimbedHills}
                         hills={hills}/> : <LoadingScreen />}
            </div>
        </>
    )
}

export default MapPage;