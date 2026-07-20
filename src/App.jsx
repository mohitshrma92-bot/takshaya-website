import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import CompanyProfile from "./pages/CompanyProfile";
import BusinessRoles from "./pages/BusinessRoles";
import BusinessVerification from "./pages/BusinessVerification";
import GSTVerification from "./pages/auth/GSTVerification";
import PANVerification from "./pages/auth/PANVerification";
import UDYAMVerification from "./pages/UDYAMVerification";
import FactoryAddress from "./pages/FactoryAddress";
import AuthorizedPerson from "./pages/AuthorizedPerson";
import ReviewSubmit from "./pages/ReviewSubmit";
import Dashboard from "./pages/dashboard/Dashboard";
import ThankYou from "./pages/ThankYou";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/company-profile" element={<CompanyProfile />} />
        <Route path="/business-roles" element={<BusinessRoles />} />
        <Route path="/business-verification" element={<BusinessVerification />} />
        <Route path="/gst-verification" element={<GSTVerification />} />
        <Route path="/pan-verification" element={<PANVerification />} />
        <Route path="/udyam-verification" element={<UDYAMVerification />} />
        <Route path="/factory-address" element={<FactoryAddress />} />
        <Route path="/authorized-person" element={<AuthorizedPerson />} />
        <Route path="/review-submit" element={<ReviewSubmit />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;