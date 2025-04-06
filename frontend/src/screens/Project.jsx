import React from "react";
import { useState,useContext,useRef,useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/userContext";
import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
const Project=() => { 
    const location=useLocation()
    const { user } = useContext(UserContext)
    const [isSidePanelOpen,setIsSidePanelOpen]=useState(false)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ users, setUsers ] = useState([])
    const [ project, setProject ] = useState(location.state.project)
    const [ selectedUserId, setSelectedUserId ] = useState(new Set())
    const [ fileTree, setFileTree ] = useState({})
    const [message, setMessage] = useState('')
  

    const handleUserClick = (id) => {
        setSelectedUserId(prevSelectedUserId => {
            const newSelectedUserId = new Set(prevSelectedUserId);
            if (newSelectedUserId.has(id)) {
                newSelectedUserId.delete(id);
            } else {
                newSelectedUserId.add(id);
            }

            return newSelectedUserId;
        });
    }
    function addCollaborators() {

        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data)
            setIsModalOpen(false)

        }).catch(err => {
            console.log(err)
        })

    }

    function send(){
        sendMessage('project-message', {
            message,
            sender:user._id
        })
        setMessage('')
    }

   useEffect(() => {
        axios.get(`/projects/get-project/${location.state.project._id}`).then(res => {
            console.log(res.data.project)
            setProject(res.data.project)
            setFileTree(res.data.project.fileTree || {})
        }).catch(err => {
            console.log(err)})

        initializeSocket(project._id);
        
        receiveMessage('project-message', (data) => {
            console.log(data)
        })

        axios.get('/users/all').then(res => {
            setUsers(res.data.users)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <main className="h-full w-full flex">
            <section className="left flex flex-col h-full min-w-72 bg-slate-300 relative">
                <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
                    <button className="flex gap-2" onClick={()=>setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add Collaborators</p>
                    </button>
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
                        <input value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                        className="p-2 px-4 border-none outline-none flex-grow"type="text" placeholder="Enter your message"></input>
                        <button
                        onClick={send}
                        className="px-4 bg-slate-400 text-white rounded-r hover:bg-slate-500 transition flex items-center justify-center">
                            <i className="ri-send-plane-fill text-xl"></i>
                        </button>
                    </div>
                </div>
                <div className={`absolute top-0 left-0 h-full w-full flex flex-col gap-2 bg-slate-200 z-20
                transition-transform duration-300 ease-in-out
                ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <header className="flex justify-between items-center p-2 px-3 border-b border-slate-300 bg-slate-100">
                    <h1 className="font-bold">Collaborators</h1>
                    <button onClick={()=>setIsSidePanelOpen(false)} className="p-2">
                        <i className="ri-close-large-line"></i>
                    </button>
                </header>
                <div className="users flex flex-col gap-2">
                    {project.users && project.users.map((user, index) => {
                        return (
                            <div key={user._id || index} className="user cursor-pointer hover:bg-slate-300 p-2 flex items-center">
                                <div className="aspect-square w-10 h-10 rounded-full flex items-center justify-center p-2 bg-slate-600 text-white">
                                    <i className="ri-user-fill"></i>
                                </div>
                                <h1 className="font-semibold text-lg p-2 ">{user.email}</h1>
                            </div>
                        );
                    })}
                </div>
                </div>
            </section>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-semibold'>Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className='p-2'>
                                <i className="ri-close-large-fill"></i>
                            </button>
                        </header>
                        <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
                            {users.map((user, index) => (
                                <div
                                    key={user._id || index}
                                    className={`user cursor-pointer hover:bg-slate-200 ${Array.from(selectedUserId).indexOf(user._id) !== -1 ? 'bg-slate-200' : ''} p-2 flex gap-2 items-center`}
                                    onClick={() => handleUserClick(user._id)}
                                >
                                    <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                                        <i className="ri-user-fill absolute"></i>
                                    </div>
                                    <h1 className='font-semibold text-lg'>{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md'>
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}        
        </main>
    )
}
export default Project