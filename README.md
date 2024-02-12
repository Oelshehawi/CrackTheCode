# Crack The Code

## Description

This project is a multiplayer and SinglePlayer game built with NextJS,React, and Ably for real-time communication. The game challenges players to guess a secret code, with turns and feedback provided in real-time.

## Key Features

- **Real-Time Multiplayer Gameplay**: Utilizes Ably Realtime channels for synchronous multiplayer interactions.
- **Dynamic Turn Handling**: Players take turns guessing the code, with the turn order managed dynamically.
- **Immediate Feedback**: After each guess, players receive instant feedback to aid in deducing the code.
- **Adaptive UI**: Features provide engaging visual cues to indicate whose turn it is.

## Technical Challenges and Solutions

### Real-Time Synchronization

**Challenge**: Ensuring that all players see turn changes and guess results synchronously.

**Solution**: Implemented a single Ably Realtime channel to broadcast turn changes and game states, ensuring consistent and timely updates across clients.

### State Management

**Challenge**: Managing complex game state, including player turns, guesses, and the secret code, in a distributed environment.

**Solution**: Leveraged React's state management and useEffect hooks to maintain local state in sync with global game state broadcasted via Ably.

### UI Responsiveness

**Challenge**: Creating a responsive and intuitive UI that updates in real-time to reflect game changes.

**Solution**: Used Framer Motion for smooth animations and Tailwind CSS for a responsive layout, enhancing user experience.

### Security and Fair Play

**Challenge**: Preventing players from accessing the secret code unfairly.

**Solution**: Ensured that the code generation and validation logic are securely managed, with only the necessary information being transmitted via Ably channels.
