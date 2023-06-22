import React, { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom"


import classes from './Header.module.scss'
import { Sidebar } from "../../../Data/AdminMenuBar";


const Header = () => {


    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'
    const walpaper2 = process.env.PUBLIC_URL + '/wallpaper/starry2.jpg'


    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);



    return (
        <div>
            <IconContext.Provider value={{ color: "#FFF" }}>

                <div className={classes.navbar} style={{ backgroundImage: `url(${walpaper})` }}>
                    <span className={classes.menu_bars} title="Menu Bar">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </span>

                    <Link to="/" className={classes.home_icon} title="Home Page">
                        <FaIcons.FaHome />
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
        </div>
    );

}
export default Header;