import { useOutletContext } from "react-router-dom";
import ImageUploadForm from "../components/ImageUploadForm";

const Upload = () => {
    const [isLoggedIn, setIsLoggedIn] = useOutletContext<any>();

    return (
        <>
            {isLoggedIn ? <ImageUploadForm /> : <p>Please Log In to Upload</p>}
        </>
    );
}

export default Upload;