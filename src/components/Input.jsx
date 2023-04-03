import React from "react";
import sendDark from "../assets/send-dark.png"
import send from "../assets/send.png"

export default function Input(props) {
    return(
        <div className='input-field'>
            <input type='text'
                   className='text'
                   placeholder={props.typeRoomChat ? 'Type here to chat...' : 'Enter prompt to generate an image...'}
                   value={props.input}
                   onKeyDown={(e) => e.key === "Enter" ? props.getResponse() : null}
                   onChange={(e) => props.setInput(e.target.value)}/>
            <button onClick={props.getResponse} className='send-button' disabled={props.isLoading || props.isLoading2}>
                <img src={props.isDarkMode ? send: sendDark} alt='' className='send-icon'/>
            </button>
        </div>
    )
}
