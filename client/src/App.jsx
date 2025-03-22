// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
import ViewForm from "./components/ViewForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form/create" element={<CreateForm />} />
        <Route path="/form/:id/edit" element={<CreateForm />} />{" "}
        {/* Edit route */}
        <Route path="/form/:id" element={<ViewForm />} />
      </Routes>
    </Router>
  );
};

export default App;
