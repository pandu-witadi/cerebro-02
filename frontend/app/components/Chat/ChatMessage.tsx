//
//
"use client"

import React from "react"

import remarkGfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import { FaDatabase } from "react-icons/fa"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { Message } from "./types"
import { SettingsConfiguration } from "../Settings/types"

interface ChatMessageProps {
    message: Message;
    handleCopyToBillboard: (m: string) => void
    settingConfig: SettingsConfiguration
}

const ChatMessage: React.FC<ChatMessageProps> = ({
    message,
    handleCopyToBillboard,
    settingConfig,
}) => {
    return (
        <div className={`flex items-end gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`} >
            <div className={`flex flex-col items-start p-1  animate-press-in shadow-md sm:text-sm md:text-base ${message.role === "user" ? "bg-primary-verba" : "bg-bg-verba"}`} >
                {message.cached && <FaDatabase size={12} className="text-text-verba" />}
                { (message.role === "user") ? (
                    <div className="whitespace-pre-wrap">{message.content}</div> // Use whitespace-pre-wrap for user messages
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        className="prose md:prose-sm sm:prose-sm p-2 prose-pre:bg-bg-alt-verba"
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "")
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={ settingConfig.Customization.settings.theme === "dark" ? (oneDark as any) : (oneLight as any) }
                                        language={match[1]}
                                        PreTag="div"
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
            <div className="flex flex-col items-center justify-center">
                {(message.role === "system" || message.role === "assistant") && (
                    <button
                        onClick={() => handleCopyToBillboard(message.content)}
                        className={`btn border-none shadow-none flex gap-1 bg-bg-alt-verba hover:bg-secondary-verba hover:text-text-verba text-text-alt-verba`}
                    >
                        <p className="text-xs">Copy</p>
                    </button>
                )}
            </div>
        </div>
    )
}

export default ChatMessage
