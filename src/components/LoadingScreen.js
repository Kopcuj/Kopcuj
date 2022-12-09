import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
    return (
        <>
            <div className="loading-screen">
                <Spinner animation="grow" />
            </div>
        </>
    )
}

export default LoadingScreen;