"use client";
import React, { useEffect } from "react";
import { DocumentChunk } from "../Document/types";
import CountUp from "react-countup";

import { RAGConfig } from "../RAG/types";
import ComponentStatus from "../Status/ComponentStatus";

import { FaSearch } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";

import { IoSparkles } from "react-icons/io5";

import UserModalComponent from "../Navigation/UserModal";

import { sty_ChunksComponent_chunks } from "../pageLayout"



interface ChunksComponentComponentProps {
    chunks: DocumentChunk[];
    selectedChunk: DocumentChunk | null;
    chunkTime: number;
    setSelectedChunk: (c: DocumentChunk | null) => void;
    setCurrentPage: (p: any) => void;
    context: string;
    RAGConfig: RAGConfig | null;
    production: boolean;
}

const ChunksComponent: React.FC<ChunksComponentComponentProps> = ({
  chunks,
  selectedChunk,
  chunkTime,
  context,
  setSelectedChunk,
  setCurrentPage,
  RAGConfig,
  production,
}) => {
  useEffect(() => {
    if (chunks && chunks.length > 0) {
      setSelectedChunk(chunks[0]);
    } else {
      setSelectedChunk(null);
    }
  }, [chunks]);

  const openContextModal = () => {
    const modal = document.getElementById("context_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return (
      <div className="flex flex-col gap-2">
          {/*Chunks*/}
          <div className="flex flex-col bg-bg-alt-verba rounded-lg shadow-lg p-5 text-text-verba gap-3 md:h-[330px] overflow-auto">
              <div className="flex md:flex-col gap-5">
                  {/*<div className="flex flex-col gap-2 justify-center md:justify-start items-center w-full">*/}
                  {/*  {RAGConfig && (*/}
                  {/*    <div className="flex flex-row gap-2 items-center w-full">*/}
                  {/*      <ComponentStatus*/}
                  {/*        disable={production}*/}
                  {/*        component_name={*/}
                  {/*          RAGConfig ? RAGConfig["Embedder"].selected : ""*/}
                  {/*        }*/}
                  {/*        Icon={FaDatabase}*/}
                  {/*        changeTo={"RAG"}*/}
                  {/*        changePage={setCurrentPage}*/}
                  {/*      />*/}
                  {/*      <ComponentStatus*/}
                  {/*        disable={production}*/}
                  {/*        component_name={*/}
                  {/*          RAGConfig ? RAGConfig["Retriever"].selected : ""*/}
                  {/*        }*/}
                  {/*        Icon={FaSearch}*/}
                  {/*        changeTo={"RAG"}*/}
                  {/*        changePage={setCurrentPage}*/}
                  {/*      />*/}
                  {/*    </div>*/}
                  {/*  )}*/}
                  {/*</div>*/}
                  {chunks && chunks.length > 0 && (
                      <div className="sm:hidden md:flex items-center justify-center">
                          <p className="items-center justify-center text-text-alt-verba text-xs">
                              {chunks.length} chunks retrieved in {chunkTime} seconds.
                          </p>
                      </div>
                  )}
              </div>
              <div className="flex sm:flex-row gap-2 flex-wrap">
                  {chunks &&
                      chunks.map((chunk, index) => (
                          <button
                              key={chunk.doc_name + index}
                              onClick={() => setSelectedChunk(chunk)}
                              className={`btn md:btn-base bg-button-verba hover:bg-button-hover-verba border-none flex justify-start items-center gap-5 ${selectedChunk?.chunk_id === chunk.chunk_id && selectedChunk.doc_uuid === chunk.doc_uuid ? "bg-secondary-verba" : "bg-button-verba"} hover:button-hover-verba`}
                          >
                              <div
                                  className="mx-0 p-0 tooltip text-xs"
                                  data-tip={`Score: ${Math.round(chunk.score * 100)}`}
                              >
                                  <div
                                      className={`mx-0 p-0 btn btn-xs border-none text-xs btn-circle lg:btn-sm bg-bg-alt-verba hover:bg-primary-verba flex md:text-sm lg:text-base`}
                                  >
                                      <CountUp
                                          end={index + 1}
                                          className="mx-0 p-0 text-sm text-text-verba"
                                      />
                                  </div>
                              </div>
                              <div className="mx-0 p-0 flex flex-col items-start truncate sm:w-1/2">
                                  <p className="mx-0 p-0 text-xs lg:text-xs text-text-verba">
                                      {chunk.doc_name}
                                  </p>
                                  <p className="mx-0 p-0 text-xs text-text-alt-verba">
                                      {chunk.doc_type}
                                  </p>
                              </div>
                          </button>
                      ))}
                  {context !== "" && (
                      <button
                          onClick={openContextModal}
                          className="btn flex gap-2 w-full border-none bg-button-verba text-text-verba hover:bg-button-hover-verba"
                      >
                          <IoSparkles className="text-text-verba"/>
                          <p className="text-text-verba text-xs">See Context</p>
                      </button>
                  )}
              </div>
          </div>
          <UserModalComponent
              modal_id="context_modal"
              title="Context Used"
              text={context}
          />
      </div>
  );
};

export default ChunksComponent;
