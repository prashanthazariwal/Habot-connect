import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import "./App.css";
import BasicInformation from "./components/BasicInformation";
import ServicesExpertise from "./components/ServicesExpertise";
import ContactAvailability from "./components/ContactAvailability";

// Navigation component
const Navigation = ({ currentStep, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { path: "/", label: "Basic Information" },
    { path: "/services", label: "Services & Expertise" },
    { path: "/contact", label: "Contact & Availability" },
  ];

  return (
    <div className="mb-8">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div
            key={step.path}
            className={`w-1/3 text-center ${
              location.pathname === step.path
                ? "text-blue-600"
                : "text-gray-400"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
      <div className="mt-2 h-2 bg-gray-200 rounded-full">
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

// Form Container component
const FormContainer = () => {
  const initialFormData = {
    // Step 1: Basic Information
    name: "",
    bio: "",
    profilePicture: null,

    // Step 2: Services & Expertise
    specializations: [],
    services: [],
    yearsOfExperience: "",

    // Step 3: Contact & Availability
    email: "",
    phone: "",
    workingHours: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("providerProfile");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const getCurrentStep = () => {
    switch (location.pathname) {
      case "/":
        return 1;
      case "/services":
        return 2;
      case "/contact":
        return 3;
      default:
        return 1;
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        }
        if (!formData.bio.trim()) {
          newErrors.bio = "Bio is required";
        }
        if (!formData.profilePicture) {
          newErrors.profilePicture = "Profile picture is required";
        }
        break;

      case 2:
        if (formData.specializations.length === 0) {
          newErrors.specializations =
            "Please select at least one specialization";
        }
        if (formData.services.length === 0) {
          newErrors.services = "Please select at least one service";
        }
        if (!formData.yearsOfExperience) {
          newErrors.yearsOfExperience = "Years of experience is required";
        } else if (formData.yearsOfExperience < 0) {
          newErrors.yearsOfExperience =
            "Years of experience cannot be negative";
        }
        break;

      case 3:
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
        }
        if (formData.workingHours.length === 0) {
          newErrors.workingHours = "Please select at least one working day";
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(getCurrentStep())) {
      switch (location.pathname) {
        case "/":
          navigate("/services");
          break;
        case "/services":
          navigate("/contact");
          break;
        default:
          break;
      }
    }
  };

  const handlePrevious = () => {
    switch (location.pathname) {
      case "/services":
        navigate("/");
        break;
      case "/contact":
        navigate("/services");
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(getCurrentStep())) {
      setIsSubmitting(true);

      try {
        const timestamp = new Date().toISOString();
        const savedProfiles = JSON.parse(
          localStorage.getItem("savedProfiles") || "[]"
        );
        savedProfiles.push({
          ...formData,
          id: timestamp,
          submittedAt: timestamp,
        });
        localStorage.setItem("savedProfiles", JSON.stringify(savedProfiles));

        const successMessage = document.createElement("div");
        successMessage.className =
          "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg";
        successMessage.textContent = "Profile saved successfully!";
        document.body.appendChild(successMessage);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        successMessage.remove();

        setFormData(initialFormData);
        navigate("/");
      } catch (error) {
        console.error("Error saving profile:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Provider Profile Builder
          </h1>

          <Navigation currentStep={getCurrentStep()} totalSteps={3} />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <BasicInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                      />
                    }
                  />
                  <Route
                    path="/services"
                    element={
                      <ServicesExpertise
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                      />
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <ContactAvailability
                        formData={formData}
                        handleInputChange={handleInputChange}
                        errors={errors}
                      />
                    }
                  />
                </Routes>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              {location.pathname !== "/" && (
                <motion.button
                  type="button"
                  onClick={handlePrevious}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </motion.button>
              )}

              {location.pathname !== "/contact" ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Save Profile"}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <FormContainer />
    </Router>
  );
}

export default App;
