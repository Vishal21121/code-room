import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'


const UserMessage = ({ username, message, createdAt, messageType, imageUrl }) => {
    const [time, setTime] = useState("")
    const decorateTime = (createdAt) => {
        let dateObj = new Date(createdAt);
        let day = String(dateObj.getDate()).padStart(2, '0');
        let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-11, add 1 and convert to string
        let year = dateObj.getFullYear();
        let hours = String(dateObj.getHours()).padStart(2, '0');
        let minutes = String(dateObj.getMinutes()).padStart(2, '0');
        let formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
        setTime(formattedDate)
    }
    useEffect(() => {
        decorateTime(createdAt)
    }, [])
    return (
        <div>
            <div className='flex gap-2'>
                <Avatar name={username} size={40} round="20px" />
                <div className='flex flex-col'>
                    <div className='flex gap-2'>
                        <div className='flex gap-2'>
                            <p className='text-white text-lg font-semibold'>{username}</p>
                            <p className='text-gray-400 text-xs font-semibold mt-2'>{time}</p>
                        </div>
                    </div>
                    {
                        messageType === "media" ? (
                            <img src={imageUrl} className='w-[400px] h-auto aspect-square' />
                        ) : <ReactMarkdown
                            className='text-gray-300 w-fit markdown -mt-2'
                            children={message}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <>
                                            <SyntaxHighlighter
                                                {...props}
                                                children={String(children).replace(/\n$/, '')}
                                                style={dracula}
                                                language={match[1]}
                                                customStyle={{
                                                    padding: "25px",
                                                    margin: "0px"
                                                }}
                                                wrapLongLines="true"
                                            />
                                        </>
                                    ) : (
                                        <code {...props} className={className}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserMessage