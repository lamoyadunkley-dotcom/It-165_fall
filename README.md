# LASLOYALE Juice & Pastries Management System
### IT165 – Fall 2026 Final MERN Stack Project

## Project selection
This project is a web-based management system for **LASLOYALE Natural Juice and Pastries Bar**. It helps a small juice and pastry business maintain its product menu, record customer orders, monitor order status, and discover recipe ideas.

## Technology stack
- **MongoDB** – persistent storage for products and orders.
- **Express.js / Node.js** – REST API and server-side logic.
- **React** – interactive single-page user interface.
- **Mongoose** – MongoDB schemas, validation, and queries.
- **Vite** – frontend development server and build tool.
- **TheMealDB public API** – external recipe search integration. The backend calls the public API and returns recipe data to React.

## Architecture
```text
React (Vite) frontend :5173
        |
        | HTTP / JSON (VITE_API_URL)
        v
Express REST API :5000
  |       |          |
  |       |          +---- TheMealDB public REST API (recipe search)
  |       |
  |       +---- Product and Order routes/controllers
  |
  +---- Mongoose connection
             |
             v
       MongoDB database
       lasloyale_juice_bar
       - products collection
       - orders collection
```

### Main frontend areas
- **Dashboard:** overview counts and recent orders.
- **Products:** create, list, edit, and delete menu products.
- **Orders:** record orders and update their status.
- **Recipe ideas:** search public recipes through TheMealDB.

### Database models
**Product**
- `name` (required string)
- `category` (`Juice`, `Smoothie`, `Pastry`, or `Other`)
- `description` (string)
- `price` (required non-negative number)
- `size` (e.g. `16 oz`, `24 oz`, or `N/A`)
- `imageUrl` (optional URL)
- `available` (boolean)

**Order**
- `customerName` (required string)
- `customerPhone` (optional string)
- `items` (array of product snapshots with product ID, name, quantity, and unit price)
- `total` (calculated by the server)
- `status` (`Pending`, `Preparing`, `Ready`, or `Completed`)
- `notes` (optional string)

## REST API endpoints
Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API and database status |
| GET | `/dashboard` | Product/order summary and recent orders |
| GET | `/products` | List products; optional `?category=Juice` |
| GET | `/products/:id` | Get one product |
| POST | `/products` | Create a product |
| PUT | `/products/:id` | Update a product |
| DELETE | `/products/:id` | Delete a product |
| GET | `/orders` | List orders |
| GET | `/orders/:id` | Get one order |
| POST | `/orders` | Create an order; server calculates total |
| PATCH | `/orders/:id/status` | Update order status |
| DELETE | `/orders/:id` | Delete an order |
| GET | `/recipes/search?query=chicken` | Search TheMealDB recipes through the backend |

All API responses are JSON. Validation errors return HTTP 400, missing records return 404, and unexpected errors return an appropriate server error.

## Prerequisites
- Node.js 20.19+ or 22.12+ recommended (current Vite releases require a modern Node version).
- npm.
- A MongoDB database: local MongoDB Community Server or a free MongoDB Atlas cluster.
- Git and a GitHub account.

## Setup instructions

### 1. Clone the repository
```bash
git clone https://github.com/YOUR-GITHUB-USERNAME/it165_fall_26_final_project.git
cd it165_fall_26_final_project
```
Replace `YOUR-GITHUB-USERNAME` with your GitHub username. If you have not pushed the project yet, create a new GitHub repository with the exact name `it165_fall_26_final_project`, then follow the GitHub instructions in the submission section below.

### 2. Configure the backend
```bash
cd backend
npm install
```
Create a file named `.env` in the `backend` folder by copying `.env.example`. Set `MONGODB_URI` to your own MongoDB connection string.

Example for a local MongoDB installation:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lasloyale_juice_bar
CLIENT_URL=http://localhost:5173
```
For MongoDB Atlas, use the connection string supplied by Atlas and replace the username, password, and database name. Never commit `.env` or share database credentials.

Start the API:
```bash
npm run dev
```
The backend should report that MongoDB is connected and the API is listening on port 5000.

Optional: in a second backend terminal, insert the sample menu:
```bash
npm run seed
```
The seed script only adds the sample products if the products collection is empty.

### 3. Configure the frontend
Open a new terminal at the project root:
```bash
cd frontend
npm install
```
Create `frontend/.env` from `.env.example`. The default is:
```env
VITE_API_URL=http://localhost:5000/api
```
Start React:
```bash
npm run dev
```
Open the local URL printed by Vite, normally `http://localhost:5173`.

### 4. Run both parts
Keep the backend and frontend terminals running. The React application sends requests to the Express API; Express reads and writes MongoDB data. Recipe searches go from React to the Express recipe endpoint, which retrieves public recipe data from TheMealDB.

## How to test the application
1. Confirm the API is running at `http://localhost:5000/api/health`.
2. Open the React application at `http://localhost:5173`.
3. Add a juice or pastry in the Products section.
4. Confirm the new product appears in the product list after saving.
5. Create an order by selecting products and quantities.
6. Change the order status (Pending → Preparing → Ready → Completed).
7. Open Recipe Ideas and search for a recipe such as `chicken` or `cake`.
8. Refresh the page to confirm products and orders remain in MongoDB.

## Environment variables
### `backend/.env`
| Variable | Purpose |
|---|---|
| `PORT` | Express server port (default 5000) |
| `MONGODB_URI` | MongoDB connection URI (required) |
| `CLIENT_URL` | Allowed frontend origin (default localhost:5173) |

### `frontend/.env`
| Variable | Purpose |
|---|---|
| `VITE_API_URL` | Backend API base URL (default localhost:5000/api) |

## GitHub submission
From the project root:
```bash
git init
git add .
git commit -m "Build LASLOYALE MERN final project"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/it165_fall_26_final_project.git
git push -u origin main
```
If a Git repository already exists, do not run `git init` or add a second remote. Check `git status` and `git remote -v` first.

## Important notes
- This starter project includes the complete application source, but it must be configured with your own MongoDB URI and run locally before it can connect to your database.
- Do not upload `.env` files, passwords, API keys, or MongoDB credentials to GitHub.
- TheMealDB is a public third-party service. Its availability and response data are controlled by that service.
- Before submitting, test all CRUD operations and take screenshots of the running frontend, API health response, product creation, order creation, and recipe search.

## Learning references
- [MongoDB MERN integration guide](https://www.mongodb.com/docs/drivers/node-frameworks/react/)
- [Express 4 API reference](https://expressjs.com/en/4x/api/)
- [React documentation](https://react.dev/learn)
- [Vite documentation](https://vite.dev/guide/)
- [TheMealDB API](https://www.themealdb.com/api.php)
