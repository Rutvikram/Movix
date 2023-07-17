import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, [location]);
    const controlNavbar = () =>{
        if (window.scrollY>200) {
            if (window.scrollY>lastScrollY && !mobileMenu) {
                setShow("hide");
            }else{
                setShow("show");
            }
        }else{
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    }


    useEffect(()=>{
        window.addEventListener("scroll",controlNavbar)
        return ()=>{
            window.removeEventListener("scroll",controlNavbar);
        }
    }, [lastScrollY])
    const serchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
            setTimeout(() => {
                setShowSearch(false);
            }, 1000)
        }
    }
    const openSearch = () => {
        setShowSearch(true);
        setMobileMenu(false);
    }

    const openMobailMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        } else {
            navigate("/explore/tv");
        }
        setMobileMenu(false)
    }


    return (
        <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
            <ContentWrapper>
                <div className="logo" onClick={()=>navigate("/")} >
                    <img  src={logo}  alt="logo" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")} >Movies</li>
                    <li className="menuItem" onClick={() => navigationHandler("tv")} >TV Shows</li>
                    <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobailMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input type="text" onChange={(e) => setQuery(e.target.value)} onKeyUp={serchQueryHandler} placeholder='Search for a movie and tv show...' />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;