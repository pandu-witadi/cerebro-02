"use client";

import React, { useState } from "react";
import ChatInterfaceComponent from "./ChatInterface";
import { SettingsConfiguration } from "../Settings/types";
import { DocumentChunk } from "../Document/types";

import ChunksComponent from "../Document/ChunksComponent";
import DocumentComponent from "../Document/DocumentComponent";

import { RAGConfig } from "../RAG/types";

import InfoComponent from "../Navigation/InfoComponent";
import {
    document_interface_info,
    chunk_interface_info,
    chat_interface_info,
} from "@/app/info"

import {
    sty_ChatDocuments,
    sty_ChatDocuments_Chat_Interface,
    sty_ChatDocuments_Relevant_and_Document_Interface
} from "../pageLayout"


interface ChatComponentProps {
    settingConfig: SettingsConfiguration
    APIHost: string | null
    setCurrentPage: (p: any) => void
    RAGConfig: RAGConfig | null
    production: boolean
}

const ChatComponent: React.FC<ChatComponentProps> = ({
    APIHost,
    settingConfig,
    setCurrentPage,
    RAGConfig,
    production,
}) => {
    const [chunks, setChunks] = useState<DocumentChunk[]>([])
    const [context, setContext] = useState("")
    const [chunkTime, setChunkTime] = useState(0)
    const [selectedChunk, setSelectedChunk] = useState<DocumentChunk | null>(null)

    return (
        <div className = {sty_ChatDocuments}>
            {/* Chat Interface */}
            <div className = {sty_ChatDocuments_Chat_Interface}>
                <InfoComponent
                  settingConfig={settingConfig}
                  tooltip_text={chat_interface_info}
                  display_text="Chat Interface"
                />
                <ChatInterfaceComponent
                  setContext={setContext}
                  production={production}
                  RAGConfig={RAGConfig}
                  settingConfig={settingConfig}
                  APIHost={APIHost}
                  setChunks={setChunks}
                  setChunkTime={setChunkTime}
                  setCurrentPage={setCurrentPage}
                />
            </div>

            {/* Relevant Interface */}
            <div className= {sty_ChatDocuments_Relevant_and_Document_Interface}>
                {/* Chunk Selection */}
                <div className="sm:w-full lg:w-1/4 flex h-full flex-col gap-2">
                    <InfoComponent
                        settingConfig={settingConfig}
                        tooltip_text={chunk_interface_info}
                        display_text="Relevant Context"
                    />
                    <ChunksComponent
                        context={context}
                        production={production}
                        chunks={chunks}
                        RAGConfig={RAGConfig}
                        selectedChunk={selectedChunk}
                        setSelectedChunk={setSelectedChunk}
                        chunkTime={chunkTime}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                {/* Document Viewer */}
                <div className= "sm:w-full lg:w-3/4 flex  h-full flex-col gap-2">
                    <InfoComponent
                        settingConfig={settingConfig}
                        tooltip_text={document_interface_info}
                        display_text="Document Viewer"
                    />
                    <DocumentComponent
                        production={production}
                        setSelectedChunk={setSelectedChunk}
                        selectedChunk={selectedChunk}
                        APIhost={APIHost}
                        settingConfig={settingConfig}
                        deletable={false}
                        selectedDocument={null}
                    />
                </div>
            </div>
        </div>
    )
};

export default ChatComponent;
