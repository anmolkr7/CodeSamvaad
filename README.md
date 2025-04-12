# CodeSamvaad

**CodeSamvaad** is a collaborative web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to collaborate on projects in real-time. The platform provides user authentication, live messaging, project file management, and more. It is designed to facilitate easy collaboration and project management for developers.

## Features

- **User Authentication:** Users can sign up, log in, and manage their sessions.
- **Real-time Collaboration:** Collaborators can work together in real-time on a project with live updates.
- **File Management:** Users can open, edit, and save files in the project with an integrated file tree structure.
- **AI Integration:** AI-powered tools to assist users in their projects.
- **Responsive Design:** The app has a clean, dark-themed, animated login page with a developer-friendly UI.

## Tech Stack

- **Frontend:**
  - React.js
  - Tailwind CSS (for styling)
  - Recoil (for state management)
  - Axios (for API calls)

- **Backend:**
  - Node.js with Express.js
  - MongoDB with Mongoose
  - Redis (for user session management)
  - JWT for authentication

## File Tree
- **project-root**
  - **backend**
    - **controllers**
      - `aiController.js`
      - `projectController.js`
      - `userController.js`
    - **db**
      - `db.js`
    - **middlewares**
      - `authMiddleware.js`
    - **models**
      - `projectModel.js`
      - `userModel.js`
    - **routes**
      - `aiRoutes.js`
      - `projectRoutes.js`
      - `userRoutes.js`
    - **services**
      - `aiService.js`
      - `projectService.js`
      - `redisService.js`
      - `userService.js`
    - `app.js`
    - `server.js`
    - `package.json`
  - **frontend**
    - **public**
      - `logo.png`
      - `vite.svg`
    - **src**
      - **assets**
      - **auth**
      - **components**
      - **config**
      - **context**
      - **routes**
      - **screens**
      - `App.jsx`
      - `index.css`
      - `main.jsx`
    - `.gitignore`
    - `README.md`
    - `index.html`
    - `package.json`
    - `postcss.config.js`
    - `tailwind.config.js`
    - `vite.config.js`
  - `.gitignore`
  - `README.md`

## Installation

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)

### Steps to Run Locally

#### 1. Clone the repository

To get started, clone the repository:

```
git clone https://github.com/anmolkr7/CodeSamvaad.git
cd CodeSamvaad 
```
### Setup

1. Clone the repository:
   `git clone https://github.com/anmolkr7/CodeSamvaad.git`

2. Set up environment variables
Create a .env file in the backend directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/codesamvaad
JWT_SECRET=your_jwt_secret
REDIS_HOST= host
REDIS_PORT= port
REDIS_PASSWORD= pass
GOOGLE_AI_KEY=api key
```
Replace `mongodb://localhost:27017/codesamvaad` with your MongoDB connection string if using a cloud instance.
Replace `your_jwt_secret` with a secure secret key for JWT authentication.
Replace others as necessary.

3. Install dependencies and run the backend
Open a terminal and run the following commands:
```
cd backend
npm install
npm start
```
This will start the backend server.

4.Install dependencies and run the frontend
Open another terminal and run the following commands:
```
cd frontend
npm install
npm run dev
```
## Contributing
I welcome contributions! To contribute to the project:

1.Fork the repository
2.Create a new branch (git checkout -b feature/your-feature-name)
3.Make your changes
3.Commit your changes (git commit -am 'Add new feature')
4.Push to the branch (git push origin feature/your-feature-name)
5.Create a pull request

## License
This project is licensed under the MIT License - see the  file for details.

## Acknowledgements
MongoDB: NoSQL database for data storage.
React: JavaScript library for building the UI.
Tailwind CSS: Utility-first CSS framework for styling.
Vite: A modern build tool for fast development.
