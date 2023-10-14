import React from 'react'
import Avatar from 'react-avatar';
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'


const UserMessage = ({ username, message }) => {
    console.log({ username, message });
    return (
        <div>
            <div className='flex gap-2'>
                <Avatar name={username} size={40} round="20px" />
                <div className='flex flex-col'>
                    <p className='text-white'>{username}</p>
                    <ReactMarkdown
                        className='text-gray-300 w-fit markdown'
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
                                                padding: "25px"
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