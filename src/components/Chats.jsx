import React from "react";
import ScrollableFeed from "react-scrollable-feed";

export default function Chats(props) {
    return(
        <div className='chats' id='chat-scroll'>
            <ScrollableFeed  className='chats' forceScroll={true}>
                {
                    props.chatLog.map((value, index) => <div key={index} className={value.role}>
                        {value.content}
                    </div>)
                }
                {
                    props.isLoading && <div className='loader'></div>
                }
                {
                    props.isError && <div className='assistant error'>
                        Something went wrong...Try again
                    </div>
                }
            </ScrollableFeed>
        </div>
    )
}
