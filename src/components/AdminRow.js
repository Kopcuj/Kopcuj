import {Button, Collapse, Dropdown, DropdownButton, Form, Modal} from "react-bootstrap";
import React, {useRef, useState} from "react";
import axios from "axios";

const AdminRow = (props) => {
    const [desc, setDesc] = useState(false);
    const [reviews, setReviews] = useState(false);
    const [hills, setHills] = useState(false);
    const [replies, setReplies] = useState(false);
    const [discussions, setDiscussions] = useState(false);

    const [show, setShow] = useState(false);


  const editName = useRef();
  const editDesc = useRef();
  const [editIsAdmin, setEditIsAdmin] = useState(false);
  const [editIsVerified, setEditIsVerified] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

const handleEdit = (event) => {
    event.preventDefault(); //prevent reload of page
    const data = {
        userId: props.row.id_user,
        name: (editName.current.value) ? editName.current.value : props.row.name,
        description: (editDesc.current.value) ? editDesc.current.value : props.row.desc,
        isAdmin: editIsAdmin,
        isVerified: editIsVerified
    };

    //post data to database
    axios.post(process.env.REACT_APP_HOST + "/api/users/update", data)
        .then(() => {
            setShow(false);
            document.location.reload();
        })
}

const handleDelete = (event) => {
      event.preventDefault();

      axios.post(`${process.env.REACT_APP_HOST}/api/users/delete`, {userId: props.row.id_user})
          .then(() => {
          setShow(false);
          document.location.reload();
      })
}

    return (
        <>
        <Modal key={props.row.id_user + 'modal'} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upravit {props.row.login}</Modal.Title>
            </Modal.Header>
            
            <Modal.Body>
                <Form>
                    <Form.Group className={"mb-3"}>
                        <Form.Label className={"mb-0"} htmlFor="username">Name</Form.Label><br/>
                        <Form.Control className={"textarea"} ref={editName} type="text" name={"username"} placeholder={props.row.name}/>
                    </Form.Group>

                    <Form.Group className={"mb-3"}>
                        <Form.Label className={"mb-0"} htmlFor="username">Description</Form.Label><br/>
                        <Form.Control className={"textarea"} ref={editDesc} type="text" name={"username"} placeholder={props.row.desc}/>
                    </Form.Group>

                    <Form.Group className={"mb-3"}>
                        <Form.Check onClick={() => setEditIsAdmin(!editIsAdmin)} label={"isAdmin"}/>
                    </Form.Group>
                    
                    <Form.Group className={"mb-3"}>
                        <Form.Check onClick={() => setEditIsVerified(!editIsVerified)} label={"isVerified"}/>
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

        <tr key={props.row.id_user}>
            <td>{props.row.id_user}</td>
            <td>{props.row.login}</td>
            <td>{props.row.name}</td>
            <td>{props.row.email}</td>
            <td>
                <Button
                    onClick={() => setDesc(!desc)}
                    aria-controls="example-collapse-text"
                    aria-expanded={desc}
                    className={"btn2"}
                >
                    Desc
                </Button>
                <Collapse in={desc}>
                    <div id="example-collapse-text">
                        {props.row.desc}
                    </div>
                </Collapse>
            </td>
            <td>
                <Button
                    onClick={() => setHills(!hills)}
                    aria-controls="example-collapse-text"
                    aria-expanded={hills}
                    className={"btn2"}
                >
                    Hills
                </Button>
                <Collapse in={hills}>
                    <div id="example-collapse-text">
                        {props.row.hills}
                    </div>
                </Collapse>
            </td>
            <td>
                <Button
                    onClick={() => setDiscussions(!discussions)}
                    aria-controls="example-collapse-text"
                    aria-expanded={discussions}
                    className={"btn2"}
                >
                    Discussions
                </Button>
                <Collapse in={discussions}>
                    <div id="example-collapse-text">
                        {props.row.discussions}
                    </div>
                </Collapse>
            </td>
            <td>
                <Button
                    onClick={() => setReplies(!replies)}
                    aria-controls="example-collapse-text"
                    aria-expanded={replies}
                    className={"btn2"}
                >
                    Replies
                </Button>
                <Collapse in={replies}>
                    <div id="example-collapse-text">
                        {props.row.replies}
                    </div>
                </Collapse>
            </td>
            <td>
                <Button
                    onClick={() => setReviews(!reviews)}
                    aria-controls="example-collapse-text"
                    aria-expanded={reviews}
                    className={"btn2"}
                >
                    Reviews
                </Button>
                <Collapse in={reviews}>
                    <div id="example-collapse-text">
                        {props.row.reviews}
                    </div>
                </Collapse>
            </td>
            <td>{props.row.date_registered}</td>
            <td>{props.row.date_lastLogin}</td>
            <td>{props.row.isAdmin}</td>
            <td>{props.row.isVerified}</td>
            <td>
                <DropdownButton
                    drop={"up"}
                    title={"CRUD"}
                    variant={""}
                >
                    <Dropdown.Item eventKey="1" onClick={handleShow}>Upravit</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={handleDelete}>Smazat</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Ban</Dropdown.Item>
                </DropdownButton>
            </td>
        </tr>
        </>
    )
}

export default AdminRow;