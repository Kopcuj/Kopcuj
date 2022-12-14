import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

const UploadPicture = (props) => {
    const [image, setImage] = useState({ preview: '', data: '' })
    const [status, setStatus] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', image.data)
        const response = await fetch(`${process.env.REACT_APP_HOST}/api/users/profile/upload`, {
            method: 'POST',
            body: formData,
        })
        if (response.status === 200) setStatus("Změněno. Může to chvíli trvat.")
    }

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data:  new File([e.target.files[0]], `${props.user.id}.webp`),
        }
        setImage(img)
    }

    return (
        <div>
            {image.preview && <img alt={"profile"} className={'profile-image mb-1'} src={image.preview}/>}
            <Form onSubmit={handleSubmit}>
                <div className={"d-flex justify-content-between"}>
                    <Form.Control onChange={handleFileChange} name={"file"} type="file" />

                    <Button className={"btn2"} type='submit'>Nahrát</Button>
                </div>

            </Form>
            {status && <h4>{status}</h4>}
        </div>
    )
}

export default UploadPicture;