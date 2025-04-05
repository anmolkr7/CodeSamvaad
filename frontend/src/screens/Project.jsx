import React from "react";
import { useState } from "react";
import { useLocation} from "react-router-dom";
const Project=() => { 
    const location=useLocation()

    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)

    console.log(location.state)
    return (
        <main className="h-full w-full flex">
            <section className="left flex flex-col h-full min-w-72 bg-slate-300 relative">
                <header className="flex justify-end p-2 px-4 w-full bg-slate-100">
                    <button onClick={()=>setIsSidePanelOpen(!isSidePanelOpen)} className="p-2">
                    <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area flex flex-col flex-grow">
                    <div className="message-box p-1 flex-grow flex flex-col gap-1">
                        <div className="incoming-message max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className="opacity-65 text-xs">example@gmail.com</small>
                            <p className="text-sm">Lorem lorem20ipsum dolor sit amet consectetur adipisicing elit. Omnis, dolores.</p>
                        </div>
                        <div className="outgoing-message ml-auto max-w-56 flex flex-col p-2 bg-slate-50 w-fit rounded-md">
                            <small className="opacity-65 text-xs">example@gmail.com</small>
                            <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                    <div className="inputField w-full flex ">
                        <input className="p-2 px-4 border-none outline-none"type="text" placeholder="Enter your message"></input>
                        <button className="w-full h-full bg-slate-400 text-white rounded-r hover:bg-slate-500 transition flex items-center justify-center">
                            <i className="ri-send-plane-fill text-xl"></i>
                        </button>
                    </div>
                </div>
                <div className={`absolute top-0 left-0 h-full w-72 bg-slate-200 z-20
                transition-transform duration-300 ease-in-out
                ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end p-2">
                    <button onClick={()=>setIsSidePanelOpen(false)} className="text-xl">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                </div>
            </section>
        </main>
    )
}
export default Project