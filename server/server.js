const models = require("./models");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const schema = require("./schema/schema");
const expressGraphQL = require("express-graphql");
const cors = require("cors");

const db = require("../config/keys.js").MONGO_URI;

const app = express();

app.use(cors());

// app.use(
//   "/graphql",
//   expressGraphQL {
//       schema,
//       graphiql: true
//     };
//   })
// );
app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;