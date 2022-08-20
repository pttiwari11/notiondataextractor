import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PORT = process.env.PORT || 5000

const UpdateNotion = () => {
  const [id, setId] = React.useState("");
  const [token, setToken] = React.useState("");
  const [category, setCategory] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNotionDetails();
  }, []);

  const getNotionDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:${PORT}/notion/${params.id}`);
    result = await result.json();
    setId(result.id);
    setToken(result.token);
    setCategory(result.category);
  };

  const updateNotion = async () => {
    console.warn(id, token, category);
    let result = await fetch(`http://localhost:${PORT}/notion/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ id, token, category }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="notion">
      <h1>Update Notion</h1>
      <input
        type="text"
        placeholder="Enter Notion Id"
        className="inputBox"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter integration token"
        className="inputBox"
        value={token}
        onChange={(e) => {
          setToken(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter notion category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <button onClick={updateNotion} className='appButton'>Update Notion</button>

    </div>
  );
};

export default UpdateNotion;
