# Real-time Chat App

A simple real-time messaging application built with **Node.js**, **Express.js**, and **Socket.IO**.  
Users can join with a unique username, send messages, and see the list of active users in real-time.

---

## Features

- Users can join with a **unique username**
- Real-time **chat messages**
- **Active users list** updates automatically
- System notifications when a user joins or leaves
- Prevents **duplicate usernames** and empty messages
- Responsive and modern **UI design**

---

## Project Structure

chat-app/
├── package.json
├── server.js
├── README.md
└── public/
├── index.html
├── style.css
└── script.js

---

## Prerequisites

- Node.js installed (v14 or above)
- npm installed

---

## Installation & Run

1.Clone the repository:

```bash
git clone https://github.com/riyasoner/Real-Time-Messaging-App-with-Socket.IO.git
```

2.Navigate to the project folder:
cd Real-Time-Messaging-App-with-Socket.IO

3.Install dependencies:
npm install

4.Start the server:
node server.js

5.Open browser and visit:
http://localhost:3000

How to Use

Enter a unique username in the login popup
Click Join Chat
Type messages and send using Enter key or Send button
See the active users on the left panel
Open multiple browser tabs to test real-time messaging

Notes
Make sure usernames are unique; duplicates are not allowed
Empty messages are ignored
Messages display sender name and timestamp
Fully functional in multiple browser windows or devices on the same network
