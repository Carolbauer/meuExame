import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Exams from "./pages/Exams/ExamsDetailsPage";
import PriorityInfoPage from "./pages/PriorityInfoPage/PriorityInfoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WaintingListPage from "./pages/WaitingList/WaitingListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/priorityInfo" element={<PriorityInfoPage />} />
        <Route path="/exame/:id" element={<Exams />} />
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/filadeespera" element={<WaintingListPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
