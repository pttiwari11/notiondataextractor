const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");
const Notion = require("./db/Collection");
const express = require("express");
const cors = require("cors");
require("./db/config");
const axios = require("axios");
const app = express();
const notionValue = require("./notionValue");

app.use(express.json());
app.use(cors());


let api_token;
let api_dbid;

/*
const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getDatabase = async () => {
  const databaseId = process.env.NOTION_API_DATABASE_ID;
  const response = await notion.databases.retrieve({ database_id: databaseId });
  console.log(response);
};

getDatabase();
*/




function temp(api_token, api_dbid, api_category) {

const notion = new Client({ auth: api_token });

const getDatabase = async () => {
  const Id = api_dbid;
  
  if(api_category == "database") {
    const response = await notion.databases.retrieve({ database_id: Id });
    console.log(response);
  } else {
    const response = await notion.pages.retrieve({ page_id: Id });
    console.log(response);
  }
  
  console.log(process.env.NOTION_API_KEY, " ", Id);
  console.log(api_token, " ", api_dbid, " ", api_category);
  
};

  console.log(api_token, "aa rhi hai");
  console.log(api_dbid, "ye bhi aa rhi hai");

  getDatabase();
};

module.exports.api_token;
module.exports.api_dbid;
module.exports = { temp };


/*

app.get("/notionDatabase", (req, resp) => {
      const result  = JSON.stringify(response);
      resp.send(result);
      console.log("notionData getting data");
    });

    app.listen(8000);
    app.close();


*/
