"use client"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {setUserProfile} from "@/app/components/utils";

const Page = () => {
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const router = useRouter();
    const loginUser = () => {
        const status = (userEmail === 'admin@mail.com') && (userPassword === 'admin');
        if(status) {
            setUserProfile('true');
            router.push('/')
        }
        else {
            setUserProfile('false');
        }
    }

    const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setUserEmail(newText);
    };
    const handleUserPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setUserPassword(newText);
    };

    return (
        <>
            <div className="bg-no-repeat bg-cover bg-center relative">
                <div className="absolute bg-gradient-to-b from-blue-400 to-blue-600 opacity-75 inset-0 z-0"></div>
                <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div className="flex justify-center self-center  z-10">
                        <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div className="mb-4">
                                <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
                                <p className="text-gray-500">Please sign in to your account.</p>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 tracking-wide">Email</label>
                                    <input
                                        onChange={handleUserEmailChange}
                                        className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="" placeholder="mail@gmail.com"/>
                                </div>
                                <div className="space-y-2">
                                    <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                        Password
                                    </label>
                                    <input
                                        onChange={handleUserPasswordChange}
                                        className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                                        type="password" placeholder="Enter your password"/>
                                </div>
                                {/*<div className="flex items-center justify-between">*/}
                                {/*    <div className="flex items-center">*/}
                                {/*        <input id="remember_me" name="remember_me" type="checkbox"*/}
                                {/*               className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"/>*/}
                                {/*        <label className="ml-2 block text-sm text-gray-800">*/}
                                {/*            Remember me*/}
                                {/*        </label>*/}
                                {/*    </div>*/}
                                {/*    <div className="text-sm">*/}
                                {/*        <a href="#" className="text-green-400 hover:text-green-500">*/}
                                {/*            Forgot your password?*/}
                                {/*        </a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div>
                                    <button className="btn btn-success w-full" onClick={() => loginUser()}>
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page