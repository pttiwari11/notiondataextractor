const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Notion = require("./db/Collection");
const Jwt = require("jsonwebtoken");
const jwtKey = "notion";
const app = express();
const notionData = require("./notion");
const dotenv = require("dotenv").config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || "5000";

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send("Something went wrong");
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("Something went wrong");
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No User found" });
    }
  } else {
    resp.send({ result: "No User found" });
  }
});

app.post("/add-notion", async (req, resp) => {
  let notion = new Notion(req.body);
  let result = await notion.save();
  resp.send(result);
});

app.get("/notions", async (req, resp) => {
  const notions = await Notion.find();
  if (notions.length > 0) {
    resp.send(notions);
  } else {
    resp.send({ result: "No Notion found" });
  }
});

app.delete("/notion/:id", async (req, resp) => {
  let result = await Notion.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/notion/:id", async (req, resp) => {
  let result = await Notion.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.get("/getData/:id", async (req, resp) => {
  let result = await Notion.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
    const api_key = result.token;
    const api_id = result.id;
    const api_category = result.category;

    notionData.temp(api_key, api_id, api_category);
  } else {
    resp.send({ result: "No Record Found." });
  }
});

app.put("/notion/:id", async (req, resp) => {
  let result = await Notion.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

/*
app.put("/notion/:id", async (req, resp) => {
  let result = await Notion.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});
*/

app.get("/search/:key", async (req, resp) => {
  let result = await Notion.find({
    $or: [
      {
        id: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});
/*
app.get("/", (req, resp) => {
  resp.send("Backend Running....");
});
*/

app.listen(PORT);
