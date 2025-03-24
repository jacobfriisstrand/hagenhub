import { io } from 'socket.io-client';

// Create a Socket.IO client instance
const socket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000', {
  // Add any client options here
});

// Add connection event listeners
socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});

export default socket; 