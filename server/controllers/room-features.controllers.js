import OpenAI from 'openai'
import { encode } from 'gpt-3-encoder';
import dotenv from "dotenv"

dotenv.config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

let messageArr = [{ 'role': 'system', 'content': 'you are a code assistant who only answers coding questions and does not replies to prompt outside of coding topic' }]

let length = 0

function addMessage(data, type) {
    let encoded = encode(data);
    // console.log("length is:" + length);
    if (length + encoded.length >= 3900) {
        let val = messageArr[0]
        messageArr.splice(0, messageArr.length / 2)
        messageArr.unshift(val)
    }
    if (type == 'user') {
        messageArr.push({ 'role': type, 'content': data })
    } else if (type == "assistant") {
        messageArr.push({ "role": type, "content": data })
    }
    // console.log(messageArr)
}


export const chatBot = async (req, res) => {
    const { prompt } = req.body
    addMessage(prompt, 'user')
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageArr,
        });
        length = completion.usage.total_tokens;
        addMessage(completion.choices[0].message.content, "assistant")
        res.status(200).json({
            status: "success",
            data: {
                response: completion.choices[0].message.content
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "failure",
            data: {
                response: "unable to process your request right now please try after some time"
            }
        })
        console.log(error)
    }
}