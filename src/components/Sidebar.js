import axios from "axios";
import React, {useEffect, useState} from 'react';
import {Badge, Button, Nav, Tab} from "react-bootstrap";
import Reviews from "./Reviews";
import Faults from "./Faults";
import { tryImage } from "../helpers";
import LoadingScreen from "./LoadingScreen";

const Sidebar = (props) => {
    const [hillAttributes, setHillAttributes] = useState();

    const addHill = async () => {
        await axios.post(process.env.REACT_APP_HOST + '/api/users/addClimbed', {
            id_user: props.user.id,
            id_hill: props.currentHill.id
        });

        props.setBtnClimb(!props.btnClimb)
    }

    const fetchHillAttributes = async () => {
        const response = await axios.get(process.env.REACT_APP_HOST + `/api/hills/attributes/${props.currentHill.id}`);
        return response.data[0];
    }

    useEffect(() => {
        fetchHillAttributes().then((res) => {
            setHillAttributes(res);
        })
    }, [])

    if (hillAttributes === undefined) return <LoadingScreen />;

    return (
        <div className={'sidebar'}>
            <div className={'hill'}>
                <h1>{props.currentHill.name}<small style={{fontSize: 'medium'}}>({props.currentHill.elevation}m)</small>
                </h1>

                <hr/>

                <div style={{
                    width: "100%",
                    height: "200px",
                    backgroundImage: `url(${tryImage(`./img/hills/`, `${processHillName(props.currentHill.name)}-${props.currentHill.elevation}`)})`,   //Path must be relative to helpers.js file
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}></div>

                <hr/>

                <div className={"border-line"}>
                    <h2>Informace</h2>

                    <div>
                        <b>Lat: </b>{props.currentHill.lat}<br/>
                        <b>Lng: </b>{props.currentHill.lon}<br/>
                        <b>Prominence: </b>{props.currentHill.prominence}<br/>
                        <b>Izolace: </b> {props.currentHill.isolation}<br/>
                        <b>Materi??l: </b> {props.currentHill.material}<br/>
                        <b>Povod??: </b> {props.currentHill.basin}<br/>
                        <b>Okres: </b> {props.currentHill.district}<br/>
                        <b>Um??st??n??: </b> {props.currentHill.location}<br/>
                    </div>

                    <hr/>

                    <Badge className={'badge1'}
                           bg={"null"}>{hillAttributes.difficulty > 0 ? "Obt????n?? " : ""}</Badge>&nbsp;
                    <Badge className={'badge1'}
                           bg={"null"}>{hillAttributes.path > 0 ? "Dostupn?? cesta " : ""}</Badge>&nbsp;
                    <Badge className={'badge1'}
                           bg={"null"}>{hillAttributes.food > 0 ? "Vhodn?? pro ko????rky " : ""}</Badge>&nbsp;
                    <Badge className={'badge1'}
                           bg={"null"}>{hillAttributes.parking > 0 ? "Parkovi??t?? " : ""}</Badge>&nbsp;
                    <Badge className={'badge1'}
                           bg={"null"}>{hillAttributes.stroller > 0 ? "Ob??erstven?? " : ""}</Badge>&nbsp;

                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button id={'btnClaimHill'} type="button" className="btn1" onClick={addHill}
                                disabled={props.climbed}>Poko??it
                        </Button>
                    </div>
                </div>


            </div>


            <hr/>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className={"align-items-center"}>
                    <div>
                        <Nav variant="pills" className="flex-row justify-content-around">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className={"btn1 mr-5"}>Hodnocen??</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className={"btn1"}>Z??vady</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>

                    <div>
                        <Tab.Content className={""}>
                            <hr/>
                            <Tab.Pane eventKey="first">
                                <Reviews currentHill={props.currentHill} user={props.user}>
                                </Reviews>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Faults currentHill={props.currentHill} user={props.user}></Faults>
                            </Tab.Pane>
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        </div>
    )
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

export default Sidebar;