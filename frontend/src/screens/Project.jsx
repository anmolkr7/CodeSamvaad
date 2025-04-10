// src/screens/Project.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import { UserContext } from "../context/userContext";
import { initializeSocket, receiveMessage, sendMessage } from "../config/socket";
import Markdown from 'markdown-to-jsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';
import { getWebContainer } from "../config/webContainer";

function SyntaxHighlightedCode(props) {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current && props.className?.includes("lang-")) {
            hljs.highlightElement(ref.current);
            ref.current.removeAttribute("data-highlighted");
        }
    }, [props.className, props.children]);

    return <code {...props} ref={ref} />;
}

const Project = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useContext(UserContext);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [project, setProject] = useState(location.state?.project || null);
    const [selectedUserId, setSelectedUserId] = useState(new Set());
    const [fileTree, setFileTree] = useState({});
    const [message, setMessage] = useState('');
    const messageBox = useRef(null);
    const [messages, setMessages] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [openFiles, setOpenFiles] = useState([]);
    const [webContainer, setWebContainer] = useState(null);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [runProcess, setRunProcess] = useState(null);

    function WriteAiMessage(message) {
        const messageObject = JSON.parse(message);
        return (
            <div className='overflow-x-auto bg-slate-950 text-white rounded-sm p-2'>
                <Markdown
                    children={messageObject.text}
                    options={{
                        overrides: {
                            code: SyntaxHighlightedCode,
                        },
                    }}
                />
            </div>
        );
    }

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
    };

    function addCollaborators() {
        axios.put("/projects/add-user", {
            projectId: location.state.project._id,
            users: Array.from(selectedUserId)
        }).then(res => {
            console.log(res.data);
            setIsModalOpen(false);
        }).catch(err => {
            console.log(err);
        });
    }

    function send() {
        appendOutgoingMessage(message);
        sendMessage('project-message', {
            message,
            sender: user
        });
        setMessage('');
    }

    useEffect(() => {
        if (!location.state?.project) {
            console.error('No project provided in location.state');
            navigate('/');
            return;
        }

        const projectId = location.state.project._id;
        console.log('projectId from location.state:', projectId);

        axios.get(`/projects/get-project/${projectId}`)
            .then(res => {
                console.log('Project data:', res.data.project);
                setProject(res.data.project);
                setFileTree(res.data.project.fileTree || {});
                saveFileTree(res.data.project.fileTree || {});
            })
            .catch(err => {
                console.error('Project fetch error:', err.response?.data || err);
                navigate('/');
            });

        initializeSocket(projectId);
        if (!webContainer) {
            getWebContainer().then(container => {
                setWebContainer(container);
                console.log("container started");
            });
        }
        receiveMessage('project-message', (data) => {
            if(data.sender._id=='ai'){
                const message = JSON.parse(data.message);
                if (message.fileTree) {
                    const newFileTree = { ...message.fileTree };
                    webContainer?.mount(newFileTree);
                    setFileTree(newFileTree);
                    const updatedOpenFiles = openFiles.filter(file => newFileTree.hasOwnProperty(file));
                    setOpenFiles(updatedOpenFiles);
                    const newCurrentFile = newFileTree.hasOwnProperty(currentFile) ? currentFile : Object.keys(newFileTree)[0] || null;
                    setCurrentFile(newCurrentFile);
                }
            }
            appendIncomingMessage(data);
        });
        axios.get('/users/all')
            .then(res => setUsers(res.data.users))
            .catch(err => console.log(err));
    }, [location.state?.project, navigate]);

    function appendIncomingMessage(messageObject) {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                type: 'incoming',
                sender: messageObject.sender,
                message: messageObject.message,
            },
        ]);
    }

    function appendOutgoingMessage(messageObject) {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                type: 'outgoing',
                sender: user,
                message: messageObject,
            },
        ]);
    }

    useEffect(() => {
        if (messageBox.current) {
            messageBox.current.scrollTo({
                top: messageBox.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    function saveFileTree(fileTree) {
        axios.put('/projects/update-file-tree', {
            projectId: location.state.project._id,
            fileTree
        }).then(res => {
            console.log(res.data.project);
            setProject(res.data.project);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="w-full h-full flex">
            <section className="left relative flex flex-col w-96 bg-slate-300 h-full">
                <header className="flex justify-between items-center p-2 px-4 w-full bg-slate-100">
                    <button className="flex gap-2" onClick={() => setIsModalOpen(true)}>
                        <i className="ri-add-fill mr-1"></i>
                        <p>Add Collaborators</p>
                    </button>
                    <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} className="p-2">
                        <i className="ri-group-fill"></i>
                    </button>
                </header>
                <div className="conversation-area flex flex-col flex-grow overflow-hidden">
                    <div 
                        ref={messageBox}
                        className="message-box p-1 flex-grow flex flex-col gap-1 overflow-y-auto"
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message max-w-[90%] flex flex-col p-2 w-fit rounded-md whitespace-pre-wrap ${
                                    msg.type === 'incoming' ? 'bg-slate-50' : 'ml-auto bg-blue-100'
                                }`}
                            >
                                <small className="opacity-65 text-xs">{msg.sender.email}</small>
                                {msg.sender._id === 'ai' ? (
                                    WriteAiMessage(msg.message)
                                ) : (
                                    <p className="text-sm">{msg.message}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="inputField w-full flex bg-white border-t border-slate-200">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    send();
                                }
                            }}
                            className="p-2 px-4 border-none outline-none flex-grow"
                            type="text"
                            placeholder="Enter your message"
                        />
                        <button
                            onClick={send}
                            className="px-4 bg-slate-400 text-white rounded-r hover:bg-slate-500 transition flex items-center justify-center"
                        >
                            <i className="ri-send-plane-fill text-xl"></i>
                        </button>
                    </div>
                </div>
                <div className={`absolute top-0 left-0 h-full w-full flex flex-col gap-2 bg-slate-200 z-20
                    transition-transform duration-300 ease-in-out
                    ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <header className="flex justify-between items-center p-2 px-3 border-b border-slate-300 bg-slate-100">
                        <h1 className="font-bold">Collaborators</h1>
                        <button onClick={() => setIsSidePanelOpen(false)} className="p-2">
                            <i className="ri-close-large-line"></i>
                        </button>
                    </header>
                    <div className="users flex flex-col gap-2 overflow-y-auto flex-grow">
                        {project?.users && project.users.map((user, index) => (
                            <div key={user._id || index} className="user cursor-pointer hover:bg-slate-300 p-2 flex items-center">
                                <div className="aspect-square w-10 h-10 rounded-full flex items-center justify-center p-2 bg-slate-600 text-white">
                                    <i className="ri-user-fill"></i>
                                </div>
                                <h1 className="font-semibold text-lg p-2">{user.email}</h1>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="right bg-red-50 flex-grow flex h-full overflow-hidden">
                <div className="explorer h-full max-w-64 min-w-52 bg-slate-200 overflow-y-auto">
                    <div className="file-tree w-full">
                        {Object.keys(fileTree).map((file, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentFile(file);
                                    setOpenFiles([...new Set([...openFiles, file])]);
                                }}
                                className="tree-element cursor-pointer p-2 px-4 flex items-center gap-2 bg-slate-300 w-full"
                            >
                                <p className="font-semibold text-lg">{file}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="code-editor flex flex-col flex-grow h-full overflow-hidden">
                    <div className="top flex justify-between w-full">
                        <div className="files flex overflow-x-auto">
                            {openFiles.map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentFile(file)}
                                    className={`open-file cursor-pointer p-2 px-4 flex items-center whitespace-nowrap gap-2 bg-slate-300 ${currentFile === file ? 'bg-slate-400' : ''}`}
                                >
                                    <p className="font-semibold text-lg">{file}</p>
                                </button>
                            ))}
                        </div>
                        <div className="actions flex gap-2">
                            <button
                                onClick={async () => {
                                    await webContainer.mount(fileTree);
                                    const installProcess = await webContainer.spawn("npm", ["install"]);
                                    await installProcess.exit;
                                    installProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk);
                                        }
                                    }));
                                    if (runProcess) {
                                        runProcess.kill();
                                    }
                                    let tempRunProcess = await webContainer.spawn("npm", ["start"]);
                                    tempRunProcess.output.pipeTo(new WritableStream({
                                        write(chunk) {
                                            console.log(chunk);
                                        }
                                    }));
                                    setRunProcess(tempRunProcess);
                                    webContainer.on('server-ready', (port, url) => {
                                        console.log(port, url);
                                        setIframeUrl(url);
                                    });
                                }}
                                className="p-2 px-4 bg-slate-300 text-white"
                            >
                                run
                            </button>
                        </div>
                    </div>
                    <div className="bottom flex flex-grow overflow-hidden">
                        {fileTree[currentFile] && (
                            <div className="code-editor-area h-full overflow-auto flex-grow bg-slate-50">
                                <pre className="hljs h-full">
                                    <code
                                        className="hljs h-full outline-none"
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => {
                                            const updatedContent = e.target.innerText;
                                            const ft = {
                                                ...fileTree,
                                                [currentFile]: {
                                                    file: {
                                                        contents: updatedContent
                                                    }
                                                }
                                            };
                                            console.log("onBlur triggered, updatedFileTree:", updatedContent);
                                            setFileTree(ft);
                                            saveFileTree(ft);
                                        }}
                                        dangerouslySetInnerHTML={{ __html: hljs.highlight('javascript', fileTree[currentFile].file.contents).value }}
                                        style={{
                                            whiteSpace: 'pre-wrap',
                                            paddingBottom: '25rem',
                                            counterSet: 'line-numbering',
                                        }}
                                    />
                                </pre>
                            </div>
                        )}
                        
                        {iframeUrl && webContainer && (
                            <div className="flex min-w-96 flex-col h-full overflow-hidden">
                                <div className="address-bar">
                                    <input
                                        type="text"
                                        onChange={(e) => setIframeUrl(e.target.value)}
                                        value={iframeUrl}
                                        className="w-full p-2 px-4 bg-slate-200"
                                    />
                                </div>
                                <iframe src={iframeUrl} className="w-full h-full"></iframe>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-md w-96 max-w-full relative">
                        <header className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Select User</h2>
                            <button onClick={() => setIsModalOpen(false)} className="p-2">
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
                                    <h1 className="font-semibold text-lg">{user.email}</h1>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={addCollaborators}
                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        >
                            Add Collaborators
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Project;