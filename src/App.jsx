import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BaseLayout from "./layouts/baseLayout/BaseLayout";
import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";
import Login from "./pages/AuthPage/Login";
import Register from "./pages/AuthPage/Register";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<BaseLayout />}>
            <Route index={true} element={<HomeDashboard />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="tasks" element={<TaskPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
