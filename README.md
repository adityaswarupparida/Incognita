# Incognita

Incognita is an open-source, anonymous, real-time video and text chat application designed to create secure and temporary chat rooms where users can interact with each other without needing any personal information. Whether you're looking to chat with multiple people or have a private one-on-one video call, Incognita offers it all in a seamless and user-friendly experience.

## Features

- **Anonymous Rooms**: No sign-up or login required. Just generate or join a room using a unique room code, and you're in.
- **Temporary Room Destruction**: Rooms are destroyed automatically once all members leave, and chats are deleted for privacy.
- **Scalable Chat and Video**:
  - Up to **50+ participants** can chat with each other in a single room.
  - Any **2 people** can initiate a private one-on-one video call.
- Real-Time Communication: Users can chat and exchange video/audio messages in real-time.

## Tech Stack

- **WebRTC** - Used for real-time, peer-to-peer video communication.
- **WebSockets** - Used as signalling server for video and chat communication.
- **TypeScript** - Used for type-safety and code consistency throughout the backend & frontend.
- **React** - Used for UI and state management.
- **Tailwind CSS** - Used for styling and responsive design.

## Getting Started

To get started with Incognita, follow these steps:
1. Clone the repository:
```bash
git clone https://github.com/adityaswarupparida/Incognita.git
```
2. Install the required dependencies:
```bash
npm install
```
3. Run the application:
```bash
npm run dev
```
4. Access the application at http://localhost:5173