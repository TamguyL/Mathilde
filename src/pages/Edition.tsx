import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JsonEditor from "../components/Edition/JsonEditor";

const EditPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem("auth") === "true";
            if (!isAuthenticated) {
                navigate("/login");
            }
    }, [navigate]);


    const handleClick = () => {
        navigate("/");
    };
      
    return (
        <div className="fondSaumon">
            <h1>Page d'Édition</h1>

            <div className="fondSaumon text-center">
                <button onClick={handleClick} className="cta">
                    <span>One Page</span>
                </button>
            </div>
        
            <JsonEditor/>
        </div>
    );

}; export default EditPage;