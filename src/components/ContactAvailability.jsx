import React from "react";

const ContactAvailability = ({ formData, handleInputChange, errors }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleDayToggle = (day) => {
    const newWorkingHours = formData.workingHours.includes(day)
      ? formData.workingHours.filter((d) => d !== day)
      : [...formData.workingHours, day];

    handleInputChange({
      target: {
        name: "workingHours",
        value: newWorkingHours,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Contact Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.email ? "border-red-300" : "border-gray-300"
          }`}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.phone ? "border-red-300" : "border-gray-300"
          }`}
          required
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Working Hours
        </label>
        <div
          className={`grid grid-cols-2 gap-4 p-4 rounded-md ${
            errors.workingHours ? "border border-red-300 bg-red-50" : ""
          }`}
        >
          {days.map((day) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={formData.workingHours.includes(day)}
                onChange={() => handleDayToggle(day)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={day} className="ml-2 block text-sm text-gray-700">
                {day}
              </label>
            </div>
          ))}
        </div>
        {errors.workingHours && (
          <p className="mt-1 text-sm text-red-600">{errors.workingHours}</p>
        )}
      </div>
    </div>
  );
};

export default ContactAvailability;
