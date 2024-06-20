const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authenticationRouter = require("./routes/authentication");
const tripsRouter = require("./routes/trips")
const tokenChecker = require("./middleware/tokenChecker");
const toDoRouter = require("./routes/toDo");

const flightRouter = require("./routes/flights")
const itinerariesRouter = require("./routes/itineraries");
const notificationRouter = require("./routes/notification.js");

const budgetRouter = require("./routes/budget");
const expenseRouter = require("./routes/expense")

const app = express();

// Allow requests from any client
// docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
// docs: https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());

// Parse JSON request bodies, made available on `req.body`
app.use(bodyParser.json());

// API Routes
app.use("/users", usersRouter);
app.use("/tokens", authenticationRouter);
app.use("/trips", tripsRouter);
app.use("/toDos", tokenChecker, toDoRouter);

app.use("/itineraries", tokenChecker, itinerariesRouter);
app.use("/notifications", notificationRouter);
app.use("/flights", flightRouter);


app.use("/budget",  tokenChecker, budgetRouter);
app.use("/expense", tokenChecker, expenseRouter)

// 404 Handler
app.use((_req, res) => {
  res.status(404).json({ err: "Error 404: Not Found" });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  if (process.env.NODE_ENV === "development") {
    res.status(500).send(err.message);
  } else {
    res.status(500).json({ err: "Something went wrong with app" });
  }
});

module.exports = app;