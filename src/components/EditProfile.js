import React, {useRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";

const EditProfile = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const name = useRef();
    const desc = useRef();

    const handleEdit = (event) => {
        event.preventDefault(); //prevent reload of page

        const data = {
            userId: props.user.id,
            name: (name.current.value) ? name.current.value : props.user.name,
            description: (desc.current.value) ? desc.current.value : props.user.desc,
            isVerified: props.user.isVerified,
            isAdmin: props.user.isAdmin
        };

        //post data to database
        axios.post(process.env.REACT_APP_HOST + "/api/users/update", data)
            .then(() => {
              setShow(false);
              props.setEdit(!props.edit);
            })
            .catch(err => {
              console.log("Error in register user!\n" + err);
            });
    }

    return (
        <div>
            <Button className={'btn1'} onClick={handleShow}>Upravit profil</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upravit profil</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="username">Jméno</Form.Label><br/>
                            <Form.Control className={'textarea'} ref={name} type="text" name={"username"} placeholder={"Jméno"}/>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="username">Popisek</Form.Label><br/>
                            <Form.Control className={'textarea'} as={'textarea'} ref={desc} rows={5} type="text" name={"username"} placeholder={"Popisek"}/>
                        </Form.Group>

                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="username">Profilový obrázek</Form.Label><br/>
                        </Form.Group>
                    </Form>

                    <Form action={`${process.env.REACT_APP_HOST}/api/users/profile/upload`} method="POST">
                        <input type="file" name="image" />
                        <button type="submit">Upload</button>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button type={'submit'} className={'btn2'} variant="primary" onClick={handleEdit}>Uložit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProfile;