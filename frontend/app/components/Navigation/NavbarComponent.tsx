"use client";

import React from "react"

import {IoChatbubbleSharp} from "react-icons/io5"
import {IoDocumentSharp} from "react-icons/io5"
import {HiOutlineStatusOnline} from "react-icons/hi"
import {IoMdAddCircle} from "react-icons/io"
import {IoSettingsSharp} from "react-icons/io5"
import {IoBuildSharp} from "react-icons/io5"
import {LuMenu} from "react-icons/lu"

import NavbarButton from "./NavButton"
import {
    sty_NavbarComponents
} from "../pageLayout"
import {useRouter} from "next/navigation";

interface NavbarProps {
    imageSrc: string
    title: string
    subtitle: string
    version: string
    currentPage: string
    APIHost: string | null
    production: boolean
    isAdmin: boolean
    onChangeUser: (s: boolean) => void;
    setCurrentPage: (
        page: "CHAT" | "DOCUMENTS" | "STATUS" | "ADD" | "SETTINGS" | "RAG"
    ) => void
}


const Navbar: React.FC<NavbarProps> = ({
                                           imageSrc,
                                           title,
                                           subtitle,
                                           APIHost,
                                           version,
                                           currentPage,
                                           setCurrentPage,
                                           production,
                                           onChangeUser,
                                           isAdmin
                                       }) => {

    const icon_size = 18

    const CreateAdminNavBar = () => {
        return (
            <>
                <div className="flex flex-row justify-center items-center">
                    <div className="hidden sm:h-[3vh] lg:h-[5vh] bg-text-alt-verba w-px sm:mx-2 md:mx-4"></div>

                    {/* Pages */}
                    <div className="lg:flex hidden lg:flex-row items-center lg:gap-3 justify-between">
                        <div
                            className={` ${production ? "h-[0vh]" : "sm:h-[3vh] lg:h-[5vh] mx-1"} hidden sm:block bg-text-alt-verba w-px`}></div>
                        <NavbarButton
                            hide={false}
                            APIHost={APIHost}
                            Icon={IoChatbubbleSharp}
                            iconSize={icon_size}
                            title="Chat"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="CHAT"
                        />
                        <NavbarButton
                            hide={false}
                            APIHost={APIHost}
                            Icon={IoDocumentSharp}
                            iconSize={icon_size}
                            title="Documents"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="DOCUMENTS"
                        />
                        <NavbarButton
                            hide={production}
                            APIHost={APIHost}
                            Icon={HiOutlineStatusOnline}
                            iconSize={icon_size}
                            title="Overview"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="STATUS"
                        />
                        <div
                            className={` ${production ? "h-[0vh]" : "sm:h-[3vh] lg:h-[5vh] mx-1"} hidden sm:block bg-text-alt-verba w-px`}></div>
                        <NavbarButton
                            hide={production}
                            APIHost={APIHost}
                            Icon={IoMdAddCircle}
                            iconSize={icon_size}
                            title="Add Documents"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="ADD"
                        />
                        <NavbarButton
                            hide={production}
                            APIHost={APIHost}
                            Icon={IoBuildSharp}
                            iconSize={icon_size}
                            title="RAG"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="RAG"
                        />
                        <NavbarButton
                            hide={production}
                            APIHost={APIHost}
                            Icon={IoSettingsSharp}
                            iconSize={icon_size}
                            title="Settings"
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setPage="SETTINGS"
                        />
                        <button className="btn btn-sm btn-active btn-neutral" onClick={() => {
                            onChangeUser(false);
                        }}>Logout
                        </button>

                        <div
                            className={` ${production ? "h-[0vh]" : "sm:h-[3vh] lg:h-[5vh] mx-1"} hidden sm:block bg-text-alt-verba w-px`}></div>
                    </div>

                    {/* Menu */}
                    <div className="flex flex-row items-center sm:gap-1 lg:gap-5 justify-between">
                        <div className="lg:hidden sm:flex md:ml-4 sm:mr-8">
                            <ul className="menu md:menu-md sm:menu-sm sm:menu-horizontal bg-base-200 rounded-box bg-bg-alt-verba z-50">
                                <li>
                                    <details>
                                        <summary>
                                            <LuMenu size={20}/>
                                        </summary>
                                        <ul className="bg-bg-alt-verba">
                                            <li onClick={(e) => {
                                                setCurrentPage("CHAT")
                                            }}>
                                                <a>Chat</a>
                                            </li>
                                            <li onClick={(e) => {
                                                setCurrentPage("DOCUMENTS");
                                            }}>
                                                <a>Documents</a>
                                            </li>
                                            {!production && (
                                                <li onClick={(e) => {
                                                    setCurrentPage("STATUS");
                                                }}>
                                                    <a>Status</a>
                                                </li>
                                            )}

                                            {!production && (
                                                <li onClick={(e) => {
                                                    setCurrentPage("ADD");
                                                }}>
                                                    <a>Add Documents</a>
                                                </li>
                                            )}

                                            {!production && (
                                                <li onClick={(e) => {
                                                    setCurrentPage("RAG");
                                                }}>
                                                    <a>RAG</a>
                                                </li>
                                            )}

                                            {!production && (
                                                <li onClick={(e) => {
                                                    setCurrentPage("SETTINGS");
                                                }}>
                                                    <a>Settings</a>
                                                </li>
                                            )}

                                            <li className="items-center justify-center text-xs text-text-alt-verba mt-2" onClick={() => {onChangeUser(false);}}>
                                                Logout
                                            </li>
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const router = useRouter();
    const CreateGuestNavBar = () => {
        return (
            <div className={'mr-2'}>
                <button className="btn btn-sm btn-active btn-primary" onClick={() => {
                    router.push('/login')
                }}>Login
                </button>
            </div>
        )
    }

    return (
        <div className={'sticky flex justify-between items-center mb-3'}>
            {/* Logo, Title, Subtitle */}
            <div className="flex flex-row items-center gap-3">
                <img src={imageSrc} width={42} className="flex"></img>
                <div className="flex flex-col lg:flex-row lg:items-end justify-center lg:gap-3">
                    <p className="sm:text-1xl md:text-1xl text-text-verba">
                        {title}
                    </p>
                    <p className="sm:text-sm text-base text-text-alt-verba font-light">
                        {subtitle}
                    </p>
                </div>
            </div>

            {
                isAdmin ? (<CreateAdminNavBar/>) : (<CreateGuestNavBar/>)
            }
        </div>
    )
}

export default Navbar
