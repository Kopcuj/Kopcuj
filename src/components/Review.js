import React, {useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "./Username";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

const Review = (props) => {
    const [likeCount, setLikeCount] = useState(0);
    const [btnLike, setBtnLike] = useState(false);

    const getLikeCount = async () => {
        const response = await axios.get(process.env.REACT_APP_HOST + `/api/reviews/likeCount/${props.review.id}`);
        return response.data[0].count;
    }

    const helpfulClicked = async () => {
        await axios.post(process.env.REACT_APP_HOST + `/api/reviews/like`, {
            user: props.user.id,
            review: props.review.id
        })

        setBtnLike(!btnLike);
    }

    useEffect(() => {
        getLikeCount().then((res) => {
            setLikeCount(res)
        })
    }, [])

    useEffect(() => {
        getLikeCount().then((res) => {
            setLikeCount(res)
        })
    }, [btnLike])

    if (likeCount === undefined) return <LoadingScreen />;

    return (
        <div key={props.review.id}>
            <Card className='card'>
                <Card.Body>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>
                            <Username user={props.review.user}></Username>
                        </div>
                        <div>
                            {[...Array(props.review.stars)].map((x, i) =>
                                <FontAwesomeIcon icon="fa-solid fa-star" key={i}/>
                            )}
                        </div>
                    </div>

                    <div>
                        {props.review.text}
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                        <Button className={"btn2"} style={{alignSelf: "flex-end"}} onClick={helpfulClicked}
                                aria-label="thumbs up" disabled={false}>
                            <FontAwesomeIcon icon="fa-solid fa-thumbs-up"/>&nbsp;{likeCount}
                        </Button>
                        <div style={{color: 'GrayText', alignSelf: "flex-end"}}>
                            {new Date(props.review.added).getDate()}.{new Date(props.review.added).getMonth() + 1}.{new Date(props.review.added).getFullYear()}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Review