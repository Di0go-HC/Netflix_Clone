import React from 'react';
import './Header.css';
import logo from '../logo_netflix.png';
import profile from '../profile_netflix.png';
export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className= "header--logo">
                <a href ="/">
                    <img src={logo} alt="" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src={profile} alt="" />
                </a>
            </div>
        </header>
    )
}