import React, { useState } from "react";
import "./App.css";
import BasicInformation from "./components/BasicInformation";
import ServicesExpertise from "./components/ServicesExpertise";
import ContactAvailability from "./components/ContactAvailability";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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
  });

  const [errors, setErrors] = useState({});

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
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Form Data:", formData);
      alert("Profile saved successfully!");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInformation
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <ServicesExpertise
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <ContactAvailability
            formData={formData}
            handleInputChange={handleInputChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Provider Profile Builder
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div
                className={`w-1/3 text-center ${
                  currentStep >= 1 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                Basic Information
              </div>
              <div
                className={`w-1/3 text-center ${
                  currentStep >= 2 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                Services & Expertise
              </div>
              <div
                className={`w-1/3 text-center ${
                  currentStep >= 3 ? "text-blue-600" : "text-gray-400"
                }`}
              >
                Contact & Availability
              </div>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Save Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
