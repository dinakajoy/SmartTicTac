# Tic-Tac-Toe Game with AI

This is a **Tic-Tac-Toe** game built with Next.js and TypeScript. It features a board where players can make moves, and an AI (using the Minimax algorithm) that can play against the user. The game also tracks the state of the game, including wins, draws, and player turns.

## Features

- **Human vs AI**: Play against an AI that uses the Minimax algorithm to make decisions.
- **AI Difficulty**: Easy, Medium and Hard levels. The AI plays optimally.
- **Game State**: The game tracks the moves made by both players and can determine the winner or declare a draw.
- **Game Reset**: Players can restart the game at any time.
- **Responsive Design**: The game is designed to work on both desktop and mobile screens.

## Usage

1. The game begins with the player making the first move as "X".
2. The AI takes its turn, making optimal moves based on the Minimax algorithm.
3. The game continues until there is a winner or the game ends in a draw.
4. Players can click on any empty cell to make their move.
5. The game can be reset at any time using the **RESET GAME** button.
6. Displays steps played in `Asc` or `Desc` order (time travel)
7. Allows time travel to previously played steps

## Installation

To get started with this project, follow the steps below.

### Prerequisites

- Node.js (version 14 or higher)
- npm (or yarn)

### Steps to Run the App

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dinakajoy/tic-tac-toe-with-ai-player.git
   cd tic-tac-toe-with-ai-player
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   The app will be running on `http://localhost:3000`.
