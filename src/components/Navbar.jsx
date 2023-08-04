import React from 'react';
import logo from './logo.png';
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from 'react-icons/fa'
import { useRef } from 'react'
import "../Styles/Main.css"


export default function Navbar(props) {
    const navRef = useRef()

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }
    return (
        <>
            <header>
                <nav ref={navRef} className={props.darkMode ? "dark" : ""}>
                    <img src={logo} alt=" logo" className='nav-logo' />

                    <h2 className="nav--logo_text" >Pod Cast</h2>

                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    


                    

                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/BlogPage">Blog</Link></li>
                    <li><Link to="/ContactPage">Contact</Link></li>
                    <li><Link to="/Login">Login</Link></li>
                    <li><Link to="/SignUp">SignUp</Link></li>
                    <button className="nav-btn nav-close-button" onClick={showNavbar}><FaTimes /></button>


                    <div className="toggler"
                    >
                        <p className="toggler--light"></p>
                        <div
                            className="toggler--slider"
                            onClick={props.toggleDarkMode}
                        >
                            <div className="toggler--slider--circle"></div>
                        </div>
                        <p className="toggler--dark"></p>
                    </div>


                </nav>
                <button className="nav-btn" onClick={showNavbar}>
                    <FaBars />
                </button>

            </header>

        </>
    )


}
