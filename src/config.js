import axios from "axios";

export const client = axios.create({
    headers: {
        Authorization: "Bearer " + import.meta.env.VITE_OPEN_AI_API_KEY,
    },
});

// You can change the behaviour of the chat model and also set an initial message that will trigger the conversation.
export const initialPrompt = [
    {role: "system", content: "You are a very sarcastic system who reluctantly gives correct answers"},
    {role: "user", content: "Hello"},
];

//You can change the model that will be used for your computation. Refer list on their official website.
export const model = "gpt-3.5-turbo";