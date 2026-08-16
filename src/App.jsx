import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public
import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetLinkSent from "./pages/ResetLinkSent";

// Business onboarding
import BusinessRoles from "./pages/BusinessRoles";
import BusinessVerification from "./pages/BusinessVerification";

import CompanyProfile from "./pages/auth/CompanyProfile";
import GSTVerification from "./pages/auth/GSTVerification";
import PANVerification from "./pages/auth/PANVerification";
import UDYAMVerification from "./pages/auth/UDYAMVerification";
import FactoryAddress from "./pages/auth/FactoryAddress";
import AuthorizedPerson from "./pages/auth/AuthorizedPerson";
import ReviewSubmit from "./pages/auth/ReviewSubmit";
import VerificationSubmitted from "./pages/auth/VerificationSubmitted";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// Marketplace
import Marketplace from "./pages/marketplace/Marketplace";
import ToolDetails from "./pages/marketplace/ToolDetails";

// RFQ
import RFQCreate from "./pages/rfq/RFQCreate";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==============================
            HOME
        ============================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />
        <Route
          path="/about"
          element={<About />}
        />

        <Route
         path="/contact"
         element={<Contact />}
        />


        {/* ==============================
            AUTHENTICATION
        ============================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-link-sent"
          element={<ResetLinkSent />}
        />


        {/* ==============================
            ONBOARDING
        ============================== */}

        <Route
          path="/business-roles"
          element={<BusinessRoles />}
        />

        <Route
          path="/business-verification"
          element={<BusinessVerification />}
        />

        <Route
          path="/company-profile"
          element={<CompanyProfile />}
        />

        <Route
          path="/gst-verification"
          element={<GSTVerification />}
        />

        <Route
          path="/pan-verification"
          element={<PANVerification />}
        />

        <Route
          path="/udyam-verification"
          element={<UDYAMVerification />}
        />

        <Route
          path="/factory-address"
          element={<FactoryAddress />}
        />

        <Route
          path="/authorized-person"
          element={<AuthorizedPerson />}
        />

        <Route
          path="/review-submit"
          element={<ReviewSubmit />}
        />

        <Route
          path="/verification-submitted"
          element={<VerificationSubmitted />}
        />


        {/* ==============================
            DASHBOARD
        ============================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ==============================
            MARKETPLACE
        ============================== */}

        <Route
          path="/marketplace"
          element={<Marketplace />}
        />

        <Route
          path="/marketplace/tool/:id"
          element={<ToolDetails />}
        />


        {/* ==============================
            RFQ
        ============================== */}

        <Route
          path="/rfq/create"
          element={<RFQCreate />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;