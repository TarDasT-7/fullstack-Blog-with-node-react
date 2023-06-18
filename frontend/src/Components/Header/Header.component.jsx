import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { Link } from "react-router-dom"

import { IconContext } from "react-icons";
import classes from './Header.module.scss'
import { Sidebar } from "../../Data/MenuBar";


const Header = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'
    const walpaper2 = process.env.PUBLIC_URL + '/wallpaper/starry2.jpg'
    return (
        <>
            <IconContext.Provider value={{ color: "#FFF" }}>

                <div className={classes.navbar} style={{ backgroundImage: `url(${walpaper})` }}>
                    <span className={classes.menu_bars} title="Menu Bar">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </span>

                    <Link to="/" className={classes.home_icon} title="Home Page">
                        <FaIcons.FaHome />
                    </Link>
                    

                    <div className={classes.search_box}>
                        <input type="search" className={classes.search_inp} placeholder="Search..." />
                    </div>

                    <Link to="/login" className={classes.accont_bar} title="Login And Register">
                        <span className={classes.acount_title}>
                            Login
                        </span>
                        <FaIcons.FaUser />
                    </Link>

                </div>

                <nav className={sidebar ? classes.nav_menu + ' ' + classes.active : classes.nav_menu} style={{ backgroundImage: `url(${walpaper2})` }}>
                    <ul className={classes.nav_menu_items} onClick={showSidebar} >
                        <li className={classes.navbar_toggle} style={{ backgroundImage: `url(${walpaper2})` }}>
                            <span className={classes.menu_bars}>
                                <AiIcons.AiOutlineClose />
                            </span>
                        </li>

                        {Sidebar.map((item, index) => {
                            return (
                                <li key={index} className={classes.nav_text}>
                                    <a href={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>



            </IconContext.Provider>
        </>
    );

}
export default Header;