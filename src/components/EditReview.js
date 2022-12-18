import {Button, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import React, {useRef, useState} from "react";
import axios from "axios";

const EditReview = (props) => {
    const [show, setShow] = useState(false);


    const text = useRef();
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    const handleEdit = (event) => {
        event.preventDefault(); //prevent reload of page

        //post data to database
        axios.post(process.env.REACT_APP_HOST + "/api/reviews/update", {
            reviewId: props.review.id,
            text: text.current.value ? text.current.value : props.review.text
        })
            .then(() => {
                setShow(false);
                document.location.reload();
            })
    }

    const handleDelete = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_HOST}/api/reviews/delete`, {reviewId: props.review.id})
            .then(() => {
                setShow(false);
                document.location.reload();
            })
    }

    return (
        <div>
            <Modal key={props.review.id + 'modal'} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upravit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className={"mb-3"}>
                            <Form.Label className={"mb-0"} htmlFor="username">Description</Form.Label><br/>
                            <Form.Control className={"textarea"} ref={text} type="text" as={"textarea"} rows={5} placeholder={props.review.text}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <DropdownButton
                drop={"down"}
                title={""}
                variant={""}
            >
                <Dropdown.Item eventKey="1" onClick={handleShow}>Upravit</Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={handleDelete}>Smazat</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default EditReview;