// Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Menu = () => {
    return (
        <nav className="menu">
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="/" className="menu-link"> <strong> Home </strong> </Link>
                </li>
                <li className="menu-item">
                    <Link to="/admin" className="menu-link"> <strong>  Admin </strong></Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
