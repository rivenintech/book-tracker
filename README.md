# Book Tracker

## Prerequisites

- Node.js (tested on v22.18.0)
- npm (tested on v10.9.3)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rivenintech/book-tracker.git
   cd book-tracker
   ```

2. Rename `.env.example` files to `.env` in the `frontend/` and `backend/` directories:

   ```bash
   mv frontend/.env.example frontend/.env
   mv backend/.env.example backend/.env
   ```

3. Install the dependencies (in the root directory):

   ```bash
   npm install
   ```

4. Install the packages for frontend, backend and seed the database with initial data:

   ```bash
   npm run prepare:all
   ```

5. Start the app:

   ```bash
   npm start
   ```

   *It should start the backend on the `http://localhost:3000` and frontend on `http://localhost:4173`.*

6. Go to the URL shown in the terminal - [`http://localhost:4173`](http://localhost:4173) (by default).
