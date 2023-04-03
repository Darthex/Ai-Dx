import React from "react";
import dark from "../assets/dark-mode.png"
import light from "../assets/dark-mode-light.png"
import logoLight from "../assets/logo-light.png"
import logoDark from "../assets/logo-dark.png"
import gallery from "../assets/gallery.png"

export default function Header(props) {
    return (
        <div className={props.isDarkMode ? 'header' : ' header header-light'}>
            <header className='header-content'>
                <div className='logo'>
                    <img src={props.isDarkMode ? logoDark : logoLight} alt='' className='logo-icon'/>
                </div>
                <div className='utils-section'>
                    <button onClick={props.typeChatRoom} className='toggle-button'>
                        <img src={gallery} alt='' className='toggle-button-icon'/>
                    </button>
                    <button onClick={props.darkMode} className='toggle-button'>
                        <img src={props.isDarkMode ? light : dark} alt='' className='toggle-button-icon'/>
                    </button>
                </div>
            </header>
        </div>
    )
}
