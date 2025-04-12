import React, { useEffect, useState } from 'react';
import '../Landing.css'; 

export const LandingPage = () => {
  const [animationVisible, setAnimationVisible] = useState(false);
  
  useEffect(() => {
    
    setAnimationVisible(true);
  }, []);
  
  
  const particles = Array(20).fill().map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() > 0.8 ? 'w-1 h-1' : 'w-0.5 h-0.5',
    duration: `${Math.random() * 10 + 15}s`,
    delay: `${Math.random() * 5}s`
  }));

 
  const icons = {
    code: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    users: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    zap: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    terminal: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5"></polyline>
        <line x1="12" y1="19" x2="20" y2="19"></line>
      </svg>
    ),
    gitBranch: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15"></line>
        <circle cx="18" cy="6" r="3"></circle>
        <circle cx="6" cy="18" r="3"></circle>
        <path d="M18 9a9 9 0 0 1-9 9"></path>
      </svg>
    ),
    playCircle: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
    )
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-950 text-white overflow-hidden flex flex-col">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <div 
            key={particle.id}
            className={`absolute rounded-full bg-purple-500 opacity-40 animate-float ${particle.size}`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay
            }}
          />
        ))}
      </div>

     
      <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-purple-400">{icons.code}</span>
            <span>CodeSamvaad</span>
          </div>
          
          <div className="flex gap-4">
            <a href="/login" className="px-4 py-2 rounded-md text-sm font-medium bg-gray-700 bg-opacity-40 border border-gray-600 hover:bg-gray-600 transition-all duration-300">
              Login
            </a>
            <a href="/register" className="px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-purple-900/30">
              Register
            </a>
          </div>
        </div>
      </header>

      
      <div className="container mx-auto px-4 pt-8 pb-24 flex-grow">
        <div className="flex flex-col lg:flex-row">
          
          <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
              CodeSamvaad
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Code. Collaborate. Communicate.
            </p>

           
            <div className="text-gray-200 space-y-4 mb-8">
              <p>
                CodeSamvaad is a platform designed for developers and teams, offering real-time code editing, version control integration, and an intuitive interface to streamline workflows. Built with cutting-edge technology, it supports multiple languages and frameworks.
              </p>
              <p>
                Join our community to collaborate, access tutorials, and leverage AI-assisted tools. Whether you're a beginner or expert, CodeSamvaad provides the resources to succeed.
              </p>
            </div>

            
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-gray-700 bg-opacity-30 px-3 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-700 hover:bg-purple-900 hover:bg-opacity-20 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="w-4 h-4">{icons.terminal}</span> Multiple Languages
              </span>
              <span className="bg-gray-700 bg-opacity-30 px-3 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-700 hover:bg-purple-900 hover:bg-opacity-20 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="w-4 h-4">{icons.users}</span> Team Collaboration
              </span>
             
              <span className="bg-gray-700 bg-opacity-30 px-3 py-2 rounded-full text-sm flex items-center gap-2 border border-gray-700 hover:bg-purple-900 hover:bg-opacity-20 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-0.5">
                <span className="w-4 h-4">{icons.zap}</span> AI Assistance
              </span>
            </div>

            
            <div className="flex flex-wrap gap-4">
              <a href="/register" className="px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-purple-900/30">
                <span className="w-5 h-5">{icons.playCircle}</span> Get Started
              </a>
              
            </div>
          </div>

          
          <div className="w-full lg:w-1/2 relative">
            
            <div className={`relative w-full h-64 md:h-96 perspective-1000 ${animationVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 animate-spin-slow preserve-3d">
                
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-fade-in-down">
                  <span className="text-white w-6 h-6">{icons.code}</span>
                </div>
                
                
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-fade-in-up">
                  <span className="text-white w-6 h-6">{icons.terminal}</span>
                </div>
                
                
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-fade-in-left">
                  <span className="text-white w-6 h-6">{icons.gitBranch}</span>
                </div>
                
                
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-fade-in-right">
                  <span className="text-white w-6 h-6">{icons.users}</span>
                </div>
                
                
                <div className="absolute top-1/4 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-fade-in delay-500">
                  <span className="text-white w-6 h-6">{icons.zap}</span>
                </div>
              </div>
            </div>

           
            <div className={`absolute top-1/4 md:top-1/3 right-4 md:right-12 w-64 md:w-80 p-4 rounded-lg bg-gray-900 bg-opacity-80 border-l-4 border-purple-500 shadow-xl transform rotate-2 ${animationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-1000 delay-700`}>
              <pre className="text-xs md:text-sm font-mono">
                <code>
                  <span className="text-purple-400">function</span> <span className="text-blue-400">collaborate</span>() {'{'}
                  <br />
                  <span className="text-gray-500">{'  // Real-time editing'}</span>
                  <br />
                  <span className="text-purple-400">{'  const'}</span> team = <span className="text-blue-400">connect</span>(<span className="text-green-400">'project-id'</span>);
                  <br />
                  <span className="text-purple-400">{'  return'}</span> team.<span className="text-blue-400">codeShare</span>();
                  <br />
                  {'}'}
                </code>
              </pre>
            </div>

            
            <div className={`absolute bottom-1/4 left-8 md:left-16 p-3 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-lg transform -rotate-3 ${animationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-1000 delay-1000`}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white w-4 h-4">{icons.terminal}</span>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Syntax Support</div>
                  <div className="text-sm font-medium text-white">20+ Languages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <footer className="relative w-full bg-gradient-to-r from-gray-800 to-gray-900 py-4 px-4 mt-auto">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <a href="https://www.linkedin.com/in/anmol-kumar-ojha-0b270b251" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-sm border border-gray-700 hover:bg-blue-900 hover:bg-opacity-30 hover:border-blue-500 transition-all duration-300 mb-2 md:mb-0">
            LinkedIn
          </a>
          <a href="https://github.com/anmolkr7/CodeSamvaad" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md bg-gray-700 bg-opacity-40 text-sm border border-gray-700 hover:bg-gray-800 hover:border-gray-300 transition-all duration-300 mb-2 md:mb-0">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}