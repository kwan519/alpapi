import "@babel/polyfill";
import express from "express";
const bodyParser = require("body-parser");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

async function startServer() {
  const server = new ApolloServer({
    modules: [require("./GraphQL/tickets")],
  });
  await server.start();

  server.applyMiddleware({ app });
}
startServer();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000`)
);
