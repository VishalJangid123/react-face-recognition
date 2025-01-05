import React from "react";
import "./App.css";
import Home from "./components/Home";
import Video from "./components/video";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/video" element={<Video />} />
      </Routes>
    </>
  );
};

export default App;
