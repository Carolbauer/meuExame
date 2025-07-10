import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Exams from "./pages/Exams/ExamsDetailsPage";
import PriorityInfoPage from "./pages/PriorityInfoPage/PriorityInfoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WaintingListPage from "./pages/WaitingList/WaitingListPage";
import RegisterPatient from "./pages/RegisterPatientPage/RegisterPatient";
import RegisterPatientForms from "./pages/RegisterPatientFormsPage/RegisterPatientForms";
import WaitingListAdmin from "./pages/PatientListPage/PatientList";
import RegisterPatientToList from "./pages/RegisterPatientToListPage/RegisterPatientToList";
import PatientList from "./pages/PatientListPage/PatientList";
import RegisterExamAppointment from "./pages/RegisterExamAppointment/RegisterExamAppointmentPage";
import AppointmentList from "./pages/AppointmentListPage/AppointmentListPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/RegisterPatient" element={<RegisterPatient />} />
        <Route path="/RegisterPatientForms" element={<RegisterPatientForms />} />
        <Route path="/RegisterPatientToList" element={<RegisterPatientToList />} />
        <Route path="/PatientList" element={<PatientList />} />
        <Route path="/RegisterExamAppointment" element={<RegisterExamAppointment />} />
        <Route path="/AppointmentList" element={<AppointmentList />} />
        <Route path="/WaitingListAdmin" element={<WaitingListAdmin />} />
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
