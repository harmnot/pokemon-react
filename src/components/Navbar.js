import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <>
            <div id="mySidepanel" className="sidepanel">
                <a href="javascript:void(0)" className="closebtn">×</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
            <button className="openbtn">☰ Toggle Sidepanel</button>
        </>
    )
}

export default Navbar
