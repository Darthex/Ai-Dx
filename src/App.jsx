import React from "react";

import {client, model, initialPrompt} from "./config.js";
import Input from "./components/Input.jsx";
import Chats from "./components/Chats.jsx";
import Header from "./components/Header.jsx";
import Image from "./components/Image.jsx";


export default function App() {
    const [input, setInput] = React.useState('') //input that is added by the user for either chat or image generation
    const [prompt, setPrompt] = React.useState(initialPrompt) //the stored prompt that is essentially an array of new and previously stored conversations with respective roles
    const [imagePrompt, setImagePrompt] = React.useState('')
    const [chatLog, setChatLog] = React.useState([]) //the outputs that are generated are stored here for display
    const [inputMounted, setInputMounted] = React.useState(true) //if the input is mounted then only the use effect hook is called
    const [imageMounted, setImageMounted] = React.useState(true)
    const [darkMode, setDarkMode] = React.useState(true) // as the name suggests
    const [isLoading, setIsLoading] = React.useState(false) //is set to true while the request is in process. This lets the user know that the output is being generated
    const [isImageLoading, setIsImageLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(false) //if the output isn't generated or due to connectivity issues this state is set to true
    const [isImageError, setIsImageError] = React.useState(false)
    const [typeChatRoom, setTypeChatRoom] = React.useState(true) //sets the type of chatroom between either chat or image generation
    const initialRender = React.useRef(true) //when the page is first loaded this will prevent the second use effect hook from running so the image isn't generated on an empty prompt
    const [imageUrl, setImageUrl] = React.useState('') //the url returned by the model that is used to load the image

    React.useEffect(() => {
        setIsLoading(prevState => !prevState)
        setIsError(false)

        client.post(import.meta.env.VITE_URL_OPENAI, {
            model: model,
            messages: prompt
        }).then((response) => {
            setPrompt(prevState => [...prevState, {
                role: "assistant",
                content: response.data.choices[0].message.content
            }])
            setChatLog(prevState => [...prevState, {
                role: "assistant",
                content: response.data.choices[0].message.content
            }])
            setIsLoading(prevState => !prevState)
        }).catch((error) => {
            console.log(error)
            setIsError(true)
            setIsLoading(prevState => !prevState)
        })
    }, [inputMounted])

    React.useEffect(() => {
        if (initialRender.current) {
            //this will not run the axios request hence not causing unnecessary empty requests
            console.log('first render')
            initialRender.current = false
        } else {
            setIsImageLoading(prevState => !prevState)
            setIsImageError(false)

            client.post(import.meta.env.VITE_URL_OPENAI_IMAGE, {
                prompt: imagePrompt,
                n: 1,
                size: "512x512",
            }).then((response) => {
                setImageUrl(response.data.data[0].url)
                setIsImageLoading(prevState => !prevState)
            }).catch((err) => {
                console.log(err)
                setIsImageError(true)
                setIsImageLoading(prevState => !prevState)
            })
        }
    }, [imageMounted])

    function getResponseChat() {
        if(input !== '') {
            setPrompt(prevState => [...prevState, {role: "user", content: input}])
            setChatLog(prevState => [...prevState, {role: "user", content: input}])
            setInputMounted(prevState => !prevState)
            setInput('')
        }
    }

    function getResponseImage() {
        if(input !== '') {
            setImagePrompt(input)
            setInput('')
            setImageMounted(prevState => !prevState)
        }
    }

    return (
        <div className={darkMode ? 'all-content': 'all-content light'}>
            <Header
                darkMode={() => setDarkMode(prevState => !prevState)}
                isDarkMode={darkMode}
                typeChatRoom={() => setTypeChatRoom(prevState => !prevState)}/>
            {
                typeChatRoom ?
                    <Chats chatLog={chatLog}
                           isLoading={isLoading}
                           isError={isError}/>
                    :
                    <Image url={imageUrl}
                           prompt={imagePrompt}
                           isLoading={isImageLoading}
                           isError={isImageError}/>
            }
            <Input input={input}
                   getResponse={() => typeChatRoom ? getResponseChat(): getResponseImage()}
                   setInput={setInput}
                   isDarkMode={darkMode}
                   typeRoomChat={typeChatRoom}
                   isLoading2={isImageLoading}
                   isLoading={isLoading}/>
        </div>
    )
}
