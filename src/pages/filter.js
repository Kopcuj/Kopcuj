import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, Form, Table} from "react-bootstrap";
import LoadingScreen from "../components/LoadingScreen";
import { fetchHills } from "../helpers";

function createData(id, name, rating, food, difficulty, parking, path, stroller) {
    return {id, name, rating, food, difficulty, parking, path, stroller};
}

function processHillName(name) {
    let hill = name.toLowerCase();
    hill = hill.replace(" ", "-");
    hill = hill.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return hill;
}

const FilterPage = () => {
    const [type, setType] = useState('asc');
    const [rowData, setRowData] = useState([]);
    const [filter, setFilter] = useState('name');
    const [refresh, setRefresh] = useState(false);
    const [hillRatings, setHillRatings] = useState();
    const [hills, setHills] = useState();

    const handleChange = async () => {
        await setRowData(sortArray(rowData, type, filter));
        await setRefresh(!refresh)
    }

    const handleType = async (event) => {
        await setType(event.target.value);
    }

    const handleFilter = async (event) => {
        await setFilter(event.target.value);
    }

    const sortArray = (arr, orderBy, orderType) => {
        switch (orderBy) {
            case "asc":
            default:
                if (orderType === 'name') {
                    return arr.sort((a, b) =>
                        processHillName(a.name) > processHillName(b.name) ? 1 : processHillName(b.name) > processHillName(a.name) ? -1 : 0
                    );
                }
                if (orderType === 'rating') {
                    return arr.sort((a, b) =>
                        a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
                    );
                }
                if (orderType === 'food') {
                    return arr.sort((a, b) =>
                        a.food > b.food ? 1 : b.food > a.food ? -1 : 0
                    );
                }
                if (orderType === 'difficulty') {
                    return arr.sort((a, b) =>
                        a.difficulty > b.difficulty ? 1 : b.difficulty > a.difficulty ? -1 : 0
                    );
                }
                if (orderType === 'parking') {
                    return arr.sort((a, b) =>
                        a.parking > b.parking ? 1 : b.parking > a.parking ? -1 : 0
                    );
                }
                if (orderType === 'path') {
                    return arr.sort((a, b) =>
                        a.path > b.path ? 1 : b.path > a.path ? -1 : 0
                    );
                }
                if (orderType === 'stroller') {
                    return arr.sort((a, b) =>
                        a.stroller > b.stroller ? 1 : b.stroller > a.stroller ? -1 : 0
                    );
                }
            case "desc":
                if (orderType === 'name') {
                    return arr.sort((a, b) =>
                        processHillName(a.name) < processHillName(b.name) ? 1 : processHillName(b.name) < processHillName(a.name) ? -1 : 0
                    );
                }
                if (orderType === 'rating') {
                    return arr.sort((a, b) =>
                        a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
                    );
                }
                if (orderType === 'food') {
                    return arr.sort((a, b) =>
                        a.food < b.food ? 1 : b.food < a.food ? -1 : 0
                    );
                }
                if (orderType === 'difficulty') {
                    return arr.sort((a, b) =>
                        a.difficulty < b.difficulty ? 1 : b.difficulty < a.difficulty ? -1 : 0
                    );
                }
                if (orderType === 'parking') {
                    return arr.sort((a, b) =>
                        a.parking < b.parking ? 1 : b.parking < a.parking ? -1 : 0
                    );
                }
                if (orderType === 'path') {
                    return arr.sort((a, b) =>
                        a.path < b.path ? 1 : b.path < a.path ? -1 : 0
                    );
                }
                if (orderType === 'stroller') {
                    return arr.sort((a, b) =>
                        a.stroller < b.stroller ? 1 : b.stroller < a.stroller ? -1 : 0
                    );
                }
        }
    };

    const fetchRatings = async () => {
        const response = await axios.get(process.env.REACT_APP_HOST + '/api/reviews/hills');
        return response.data;
    }

    useEffect(() => {
        fetchHills().then((res) => {
            setHills(res);

            fetchRatings().then((res) => {
                setHillRatings(res);
            })
        })
    }, [])

    useEffect(() => {
        if (hills === undefined || hillRatings === undefined) return;
        let tmp = [];
        setRowData([])

        let beenPushed = false;
        hills.forEach((hill) => {
            beenPushed = false;
            hillRatings.forEach((rating) => {
                if (rating.name === hill.name) {
                    tmp.push(createData(hill.id, hill.name, rating.rating, rating.food, rating.difficulty, rating.parking, rating.path, rating.stroller))
                    beenPushed = true;
                }
            })

            if (!beenPushed) {
                tmp.push(createData(hill.id, hill.name, 0, 0, 0, 0, 0, 0))
            }
        })

        setRowData(sortArray(tmp, "asc", "name"))
    }, [hillRatings, hills])

    return (
        <>
            {rowData !== undefined ? <>
                <div className={"d-flex flex-row"}>
                    <div className={"d-flex flex-column m-5 w-25 p-5"}>
                        <Card>
                            <Card.Body>
                                <Form.Select id="filter" value={filter} label="Filtr" onChange={handleFilter}
                                             className={"textarea mb-2"}>
                                    <option value={'name'}>Jm??no</option>
                                    <option value={'rating'}>Hodnocen??</option>
                                    <option value={'food'}>J??dlo</option>
                                    <option value={'difficulty'}>Obt????nost</option>
                                    <option value={'parking'}>Parkov??n??</option>
                                    <option value={'path'}>Cesta</option>
                                    <option value={'stroller'}>Dostupnost s ko????rky</option>
                                </Form.Select>
                                <Form.Select
                                    id="filter2"
                                    value={type}
                                    label="Filtr"
                                    onChange={handleType}
                                    className={"textarea"}
                                >
                                    <option value={'asc'}>Vzestupn??</option>
                                    <option value={'desc'}>Sestupn??</option>
                                </Form.Select>

                                <Form.Group className={'mt-2'}>
                                    <Button onClick={handleChange} className={'btn2 w-100'}>Se??adit</Button>
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className={'container'}>
                        <Table aria-label="simple table" className={"mt-4"}>
                            <thead>
                            <tr>
                                <td align="center" aria-describedby={refresh}>
                                    <b>Jm??no</b>
                                </td>

                                <td align="center">
                                    <b>Hodnocen??</b>
                                </td>

                                <td align="center">
                                    <b>J??dlo</b>
                                </td>

                                <td align="center">
                                    <b>Obt????nost</b>
                                </td>

                                <td align="center">
                                    <b>Parkov??n??</b>
                                </td>

                                <td align="center">
                                    <b>Cesta</b>
                                </td>

                                <td align="center">
                                    <b>Ko????rek</b>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {rowData?.map((row) => (
                                <tr key={row.id}>
                                    <td component="th" scope="row" align="center">
                                        {row.name}
                                    </td>
                                    <td align="center">{row.rating}</td>
                                    <td align="center">{row.food}</td>
                                    <td align="center">{row.difficulty}</td>
                                    <td align="center">{row.parking}</td>
                                    <td align="center">{row.path}</td>
                                    <td align="center">{row.stroller}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </> : <LoadingScreen />
            }

        </>
    );
}

export default FilterPage