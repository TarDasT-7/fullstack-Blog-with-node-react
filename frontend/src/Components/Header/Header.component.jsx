import React, { useEffect, useState, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import { Link, useNavigate } from "react-router-dom"


import classes from './Header.module.scss'
import { Sidebar } from "../../Data/MenuBar";
import { isAuth, signOut } from "../../Actions/Auth";


const Header = () => {


    const walpaper = process.env.PUBLIC_URL + '/wallpaper/starry1.jpg'
    const walpaper2 = process.env.PUBLIC_URL + '/wallpaper/starry2.jpg'

    const history = useNavigate();

    const modalRef = useRef(null);
    const AccontRef = useRef(null);
    const [userBar, setUserBar] = useState(false)
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);


    function useOutsideClick(modalRef, AccontRef) {
        useEffect(() => {

            function handleClickOutside(event) {
                if (AccontRef.current && AccontRef.current.contains(event.target))
                    setUserBar(!userBar)
                else if (modalRef.current && !modalRef.current.contains(event.target))
                    setUserBar(false)
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [modalRef, AccontRef, userBar]);
    }

    useOutsideClick(modalRef, AccontRef);

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


                    <div className={classes.search_box}>
                        <input type="search" className={classes.search_inp} placeholder="Search..." />
                    </div>

                    {/* {JSON.stringify(isAuth())} */}
                    {isAuth() ?

                        <Link className={classes.accont_bar} title="your accont"

                            ref={AccontRef}
                        >
                            <span className={classes.acount_title}>
                                <FaIcons.FaSortDown />
                                {isAuth().name}
                            </span>
                            <FaIcons.FaUser />
                        </Link>
                        :
                        <Link to="/login" className={classes.accont_bar} title="Login And Register">
                            <span className={classes.acount_title}>
                                Login
                            </span>
                            <FaIcons.FaUser />
                        </Link>
                    }

                    {
                        userBar ?
                            <div className={classes.user_bar}
                                ref={modalRef}
                            >
                                <ul>
                                    <li onClick={() => {
                                        isAuth().role === 1 ?
                                            history('/admin')
                                            :
                                            history('/user');
                                    }}>profile</li>

                                    <li onClick={() => signOut(() => {
                                        setUserBar(false);
                                        history('/login');
                                    })}>log out</li>
                                </ul>
                            </div>
                            :
                            ''
                    }

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