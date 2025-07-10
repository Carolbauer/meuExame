import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Exams from "./pages/Exams/ExamsDetailsPage";
import PriorityInfoPage from "./pages/PriorityInfoPage/PriorityInfoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WaintingListPage from "./pages/WaitingList/WaitingListPage";
import WaitingListAdmin from "./pages/Admin/PatientListPage/PatientList";
import PatientList from "./pages/Admin/PatientListPage/PatientList";
import AppointmentList from "./pages/AppointmentListPage/AppointmentListPage";
import RegisterExamAppointment from "./pages/Admin/RegisterExamAppointment/RegisterExamAppointmentPage";
import RegisterPatientToList from "./pages/Admin/RegisterPatientToListPage/RegisterPatientToList";
import RegisterPatient from "./pages/Admin/RegisterPatientPage/RegisterPatient";
import RegisterPatientForms from "./pages/Admin/RegisterPatientFormsPage/RegisterPatientForms";
import { LoginOptionsPage } from "./pages/Admin/LoginOptionsPage/LoginOptionsPage";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginOptionsPage />} />
        <Route path="/admin/registerPatient" element={<RegisterPatient />} />
        <Route path="/admin/registerPatientForms" element={<RegisterPatientForms />} />
        <Route path="/admin/registerPatientToList" element={<RegisterPatientToList />} />
        <Route path="/patientList" element={<PatientList />} />
        <Route path="/admin/registerExamAppointment" element={<RegisterExamAppointment />} />
        <Route path="/appointmentList" element={<AppointmentList />} />
        <Route path="/admin/waitingListAdmin" element={<WaitingListAdmin />} />
        <Route path="/priorityInfo" element={<PriorityInfoPage />} />
        <Route path="/exame/:id" element={<Exams />} />
        <Route path="*" element={<NotFoundPage/>} />
        <Route path="/waitingLine" element={<WaintingListPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
