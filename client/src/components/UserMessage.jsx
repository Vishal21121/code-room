import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar';
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'


const UserMessage = ({ username, message }) => {
    return (
        <div>
            <div className='flex gap-2'>
                <Avatar name={username} size={40} round="20px" />
                <div className='flex flex-col'>
                    <div className='flex gap-2'>
                        <p className='text-white text-lg font-semibold'>{username}</p>
                    </div>
                    <ReactMarkdown
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
                </div>
            </div>
        </div>
    )
}

export default UserMessage