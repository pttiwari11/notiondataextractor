import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddNotion from "./components/AddNotion";
import NotionList from "./components/NotionList";
import UpdateNotion from "./components/UpdateNotion";
import NotionData from "./components/NotionData";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<NotionList />} />
            <Route path="/add" element={<AddNotion />} />
            <Route path="/update/:id" element={<UpdateNotion />} />
            <Route path="/logout" element={<h1> Logout Component</h1>} />
            <Route path="/notionData" element={<NotionData />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
