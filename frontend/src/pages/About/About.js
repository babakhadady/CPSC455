
import Navbar from "../../components/Navbar/Navbar";
import "./About.css";


function About() {
    return (
        <div>
            <Navbar />
            <div className="about">
                <h1 className="about-header"> About </h1>
                <div className="about-container">
                    <div className="about-text">
                        My name is Babak. I'm a fourth year CS student at UBC.
                    </div>
                    <div className="about-text">
                        This is my application for Assignment 5 of CPSC 445. It allows a user to add simple cards containing a name, price, cost, description, and to also do fun stuff with the cards.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;
