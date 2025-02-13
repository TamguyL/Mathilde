import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './editbutton.css'

const HiddenEditButton = () => {
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    const handleClick = () => {
        if (clickCount + 1 >= 3) {
            navigate("/login"); // Redirection vers la page de connexion
        } else {
            setClickCount(clickCount + 1);
        }
    };

    return (
        <button onClick={handleClick} name="hidden" className="hiddenButton"></button>
    );

}; export default HiddenEditButton;
