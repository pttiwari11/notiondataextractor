import React from "react";

const AddNotion = () => {
  const [id, setId] = React.useState("");
  const [token, setToken] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [error, setError] = React.useState(false);

  const addNotion = async () => {
    if (!id || !token || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-notion", {
      method: "post",
      body: JSON.stringify({ id, token, category, userId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div className="token">
      <h1>Add Notion</h1>
      <input
        type="text"
        placeholder="Enter notion id"
        className="inputBox"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
      {error && !id && (
        <span className="invalid-input">Enter valid id</span>
      )}

      <input
        type="text"
        placeholder="Enter integration token"
        className="inputBox"
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />
      {error && !token && (
        <span className="invalid-input">Enter valid token</span>
      )}

      <input
        type="text"
        placeholder="page or database"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <button onClick={addNotion} className="appButton">
        Add Notion
      </button>
    </div>
  );
};

export default AddNotion;
