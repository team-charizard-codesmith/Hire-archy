const express = require("express");
const path = require("path");
const companiesRouter = require("../routes/companiesRouter.js");
const contactsRouter = require("../routes/contactsRouter.js");
const interviewsRouter = require("../routes/interviewsRouter.js");
const jobsRouter = require("../routes/jobsRouter.js");
const offersRouter = require("../routes/offersRouter.js");
const userRouter = require("../routers/userRouter.js");
require("dotenv").config();

const app = express();

app.use(express.json());

//Logs all incoming request
app.use("*", (req, res, next) => {
  console.log(`
  #######\n
  URL: ${req.method} ${req.url}\n
  Params: ${JSON.stringify(req.params)}\n
  Body: ${JSON.stringify(req.body)}
  Req: ${req}
  #######
  `);
  next();
});

// serve everything from the build folder

app.use("/build", express.static(path.join(__dirname, "../client/build")));

app.use(express.static(path.join(__dirname, "../../client/static")));

// serve index.html to any get request on the path '/'
app.get("/", (req, res) =>
  res.status(200).sendFile(path.join(__dirname, "../client/index.html"))
);

// will send any calls to our page through our proxy server
// app.use('/api', apiRouter);
app.use("/api/companies", companiesRouter);
app.use("/api/contacts", contactsRouter);
app.use("/api/interviews", interviewsRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/offers", offersRouter);
/* ROUTE REQUESTS THROUGH userRouter */
app.use("/api/user", userRouter);

// 404 error handler
app.use("/*", (req, res) => {
  res.status(404).send("Error: This page does not exist!");
});

// global error handler
app.use("/", (err, req, res, next) => {
  const defaultErr = {
    log: "Global error handler caught an error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, err };
  res.status(errorObj.status).json(errorObj.message);
});

// Starts the server on port 3000
const server = app.listen(3000, (err) => {
  if (err) console.log("Error setting up server");
  console.log("Hire-archy server running and ready to work :)");
});
