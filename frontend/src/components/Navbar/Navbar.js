import { useNavigate } from "react-router-dom";
import "./Navbar.css";




function Navbar() {
    const navigate = useNavigate();


    function changePage(home) {
        if (home) {
            navigate("/");
        } else {
            navigate("/about");
        }


    }

    return (
        <div>
            <ul className="navbar">
                <li onClick={() => changePage(true)} className={"nav-element"}>
                    Home
                </li>
                <li onClick={() => changePage(false)} className={"nav-element"}>
                    About
                </li>
            </ul>
        </div>
    )
}

export default Navbar;
