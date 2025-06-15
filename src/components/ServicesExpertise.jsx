import React from "react";

const ServicesExpertise = ({ formData, handleInputChange, errors }) => {
  const specializations = [
    "Dyslexia",
    "ADHD",
    "Autism Spectrum",
    "Learning Disabilities",
    "Speech Disorders",
    "Behavioral Issues",
  ];

  const services = [
    "Tutoring",
    "Therapy",
    "Coaching",
    "Assessment",
    "Consultation",
  ];

  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    handleInputChange({
      target: {
        name: field,
        value: isChecked
          ? [...formData[field], value]
          : formData[field].filter((item) => item !== value),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specializations
        </label>
        <div
          className={`grid grid-cols-2 gap-4 p-4 rounded-md ${
            errors.specializations ? "border border-red-300 bg-red-50" : ""
          }`}
        >
          {specializations.map((spec) => (
            <div key={spec} className="flex items-center">
              <input
                type="checkbox"
                id={spec}
                value={spec}
                checked={formData.specializations.includes(spec)}
                onChange={(e) => handleMultiSelect(e, "specializations")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={spec}
                className="ml-2 block text-sm text-gray-700"
              >
                {spec}
              </label>
            </div>
          ))}
        </div>
        {errors.specializations && (
          <p className="mt-1 text-sm text-red-600">{errors.specializations}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Services Offered
        </label>
        <div
          className={`grid grid-cols-2 gap-4 p-4 rounded-md ${
            errors.services ? "border border-red-300 bg-red-50" : ""
          }`}
        >
          {services.map((service) => (
            <div key={service} className="flex items-center">
              <input
                type="checkbox"
                id={service}
                value={service}
                checked={formData.services.includes(service)}
                onChange={(e) => handleMultiSelect(e, "services")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={service}
                className="ml-2 block text-sm text-gray-700"
              >
                {service}
              </label>
            </div>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1 text-sm text-red-600">{errors.services}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="yearsOfExperience"
          className="block text-sm font-medium text-gray-700"
        >
          Years of Experience
        </label>
        <input
          type="number"
          name="yearsOfExperience"
          id="yearsOfExperience"
          min="0"
          value={formData.yearsOfExperience}
          onChange={handleInputChange}
          className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.yearsOfExperience ? "border-red-300" : "border-gray-300"
          }`}
          required
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">
            {errors.yearsOfExperience}
          </p>
        )}
      </div>
    </div>
  );
};

export default ServicesExpertise;
