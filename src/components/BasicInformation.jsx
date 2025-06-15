import React, { useRef } from "react";

const BasicInformation = ({ formData, handleInputChange, errors }) => {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        handleInputChange({
          target: {
            name: "profilePictureError",
            value: "Please upload an image file",
          },
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        handleInputChange({
          target: {
            name: "profilePictureError",
            value: "File size should be less than 5MB",
          },
        });
        return;
      }

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange({
          target: {
            name: "profilePicture",
            value: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Provider Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.name ? "border-red-300" : "border-gray-300"
          }`}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700"
        >
          Profile Bio
        </label>
        <textarea
          name="bio"
          id="bio"
          rows={4}
          value={formData.bio}
          onChange={handleInputChange}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
            errors.bio ? "border-red-300" : "border-gray-300"
          }`}
          required
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <div className="mt-1 flex items-center space-x-4">
          {formData.profilePicture ? (
            <div className="relative">
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  handleInputChange({
                    target: {
                      name: "profilePicture",
                      value: null,
                    },
                  })
                }
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                title="Remove photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={handleImageClick}
              className={`px-4 py-2 border rounded-md text-sm font-medium ${
                errors.profilePicture
                  ? "border-red-300 text-red-700 hover:bg-red-50"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <p className="text-xs text-gray-500">
              Max file size: 5MB. Supported formats: JPG, PNG, GIF
            </p>
          </div>
        </div>
        {errors.profilePicture && (
          <p className="mt-1 text-sm text-red-600">{errors.profilePicture}</p>
        )}
        {formData.profilePictureError && (
          <p className="mt-1 text-sm text-red-600">
            {formData.profilePictureError}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInformation;
