import React from 'react';
import logo from '../assets/titleimage.jpeg';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="flex items-center p-4 text-white bg-green-950" >
            <nav className="items-center">
                <ul className="flex flex-row space-x-4 text-4xl p-1 my-0">
                    <li><img src={logo} alt="Logo" className="w-14 h-14 mr-4 my-0"/></li>
                    <li className="my-2"><Link to="/">Home</Link></li>
                    <li className="my-2"><Link to="/projects">Projects</Link></li>
                    <li className="my-2"><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
