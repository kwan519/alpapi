import "@babel/polyfill";
import express from "express";
import tickets from "./sql/tickets";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const app = express();

// Set up Global configuration access
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

async function startServer() {
  const server = new ApolloServer({
    modules: [
      require("./graphqL/tickets"), 
      require("./graphqL/users")
    ],
  });
  await server.start();

  server.applyMiddleware({ app });
}

startServer();

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`)
);

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/test", (req, res) => {
  try {
    tickets(3).then( value => {
      res.send(JSON.stringify({id: 1, message: "300", data: value.dataValues}))
    })
  } catch (error) {
     res.send({code: 500, message:"Can't get data from Database "})
  } 
});

app.post("/login", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
  let data = {  
    time: Date(),
    userId: 12
  }

  const token = jwt.sign(data,jwtSecretKey);
  res.send(token)
})
