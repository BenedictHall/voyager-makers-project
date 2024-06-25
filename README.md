# voyager-makers-project

**How to run this application**
Install dependencies for both the frontend and api applications:

cd frontend
npm install
cd ../api
npm install

**Install MongoDB**

brew tap mongodb/brew
brew install mongodb-community@6.0
Note: If you see a message that says If you need to have mongodb-community@6.0 first in your PATH, run:, follow the instruction. Restart your terminal after this.

**Start MongoDB**

brew services start mongodb-community@6.0
Setting up environment variables.
We need to create two .env files, one in the frontend and one in the api.

**Frontend**
Create a file frontend/.env with the following contents:

VITE_BACKEND_URL="http://localhost:3000"
**Backend**
Create a file api/.env with the following contents:

MONGODB_URL="mongodb://0.0.0.0/acebook"
NODE_ENV="development"
JWT_SECRET="secret"

**Flight API**
Follow the instructions at
https://developers.amadeus.com/get-started/get-started-with-self-service-apis-335
Get your authorization token and add a line to api/.env called FLIGHT_API_KEY={your_token_here}. This expires every 20 minutes or so but you can get a new one.

**How to run the server and use the app**
Start the server application (in the api directory) in dev mode:
; cd api
; npm run dev
Start the front end application (in the frontend directory)
In a new terminal session...

; cd frontend
; npm run dev
You should now be able to open your browser and go to http://localhost:5174/.
