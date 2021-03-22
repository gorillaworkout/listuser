import React, { Component } from 'react';
import Logo from './../Assets/gadjian.png'
import user from './../Assets/2.jpg'
import {FaBars} from 'react-icons/fa'
import { Link, Redirect, useHistory } from 'react-router-dom';
export default function Header(){


    const onMenu=()=>{
        console.log('menu jalan')
    }

    return (
        <>
              <div className="box-header">
                    <img src={Logo} id="logo-gadjian"></img>
                    <div className="box-username">
                        <p>Hallo, <span>Gadjian User</span> </p>
                        <img src={user} id="logo-user"></img>
                    </div>
                </div>
                <header id="header-respo">
                    <div>
                        <FaBars className="icon-header2" onClick={onMenu}/>
                        <Link to="/" style={{textDecoration:'none'}}>
                            <img src={Logo} id="logo-gadjian"></img>
                        </Link>
                    </div>
                    <img src={user} id="logo-user"></img>
                
                </header>
                    
        </>
    )
}