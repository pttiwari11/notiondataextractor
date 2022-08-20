import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PORT = process.env.PORT || 5000

const NotionList = () => {
  const [notions, setNotions] = useState([]);

  useEffect(() => {
    getNotions();
  }, []);

  const getNotions = async () => {
    let result = await fetch(`http://localhost:${PORT}/notions`, {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    console.log(result);
    setNotions(result);
  };

  const deleteNotion = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:${PORT}/notion/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getNotions();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:${PORT}/search/${key}`);
      result = await result.json();
      if (result) {
        setNotions(result);
      }
    } else {
      getNotions();
    }
  };

  const getData = async (id, token, category, uid) => {
    try {
      let result = await fetch(`http://localhost:${PORT}/getData/${uid}`);
      result = await result.json();
      console.log(result.id, result.token, result.category);
    } catch {
      console.log(id, token, category, "nhi jaa rha yrr");
    }
  };


  return (
    <div className="notion-list">
      <h3>Notion List</h3>
      <input
        type=""
        className="search-notion-box"
        placeholder="Search Notion"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No.</li>
        <li className="data">ID</li>
        <li className="data">Token</li>
        <li className="data">Category</li>
        <li>Operation</li>
      </ul>
      {notions.length > 0 ? (
        notions.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.id}</li>
            <li>{item.token}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteNotion(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update </Link>
              <button
                onClick={() => getData(item.id, item.token, item.category, item._id)}
                className="getLink"
              >
                <Link to={"/notionData"}>Get</Link>
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default NotionList;

