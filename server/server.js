if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const morgan = require("morgan"),
  bodyParser = require("body-parser"),
  express = require("express"),
  path = require('path'),
  cors = require("cors"),
  loginRoute = require('./routes/login'),
  registrationRoute = require('./routes/register'),
  todoRoute = require("./routes/todo"),
  app = express()
  .use(cors())
  .use(bodyParser.json());

app.use(express.urlencoded({ extended: false })),
(bodyParser.json()),
(bodyParser.urlencoded({ extended: false })),
(morgan("tiny")),

app.use('/login', loginRoute);
app.use('/register', registrationRoute);
app.use("/todo", todoRoute);

app.use((req,res,next)=>{
  const err = new Error('page not found');
  err.status = 404;
  next(err);
})

app.use((err,req,res,next)=>{
res.status(err.status || 500);
res.send(err.message);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/src/index.html"));
  });
  
app.listen(3000, () => console.log("Server is running at port 3000"));
module.exports = app;