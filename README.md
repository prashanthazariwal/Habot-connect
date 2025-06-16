# Habot Connect - Provider Profile Builder

A modern React application for building and managing provider profiles with a multi-step form process.

## 🚀 Features

- Multi-step form with smooth transitions
- Form data persistence using localStorage
- Image upload with preview
- Responsive design
- Form validation
- Progress tracking
- Modern UI with animations

## 🛠️ Technologies Used

- React 19.1.0
- React Router DOM 7.6.2
- Vite 6.3.5
- TailwindCSS 4.1.10
- Motion (for animations)
- ESLint for code quality
- Montserrat font for typography

## 📋 Project Structure

```
src/
├── components/
│   ├── BasicInformation.jsx    # Step 1: Basic Info Form
│   ├── ServicesExpertise.jsx   # Step 2: Services Form
│   └── ContactAvailability.jsx # Step 3: Contact Form
├── App.jsx                     # Main Application Component
├── main.jsx                    # Application Entry Point
└── index.css                   # Global Styles
```

## 🔄 Workflow

1. **Basic Information**

   - Provider Name
   - Profile Bio
   - Profile Picture Upload (with preview)
   - File size and type validation

2. **Services & Expertise**

   - Specializations selection
   - Services offered
   - Years of experience

3. **Contact & Availability**
   - Email and Phone
   - Working hours selection
   - Form validation

## 💾 Data Storage

- Form data is stored in localStorage with unique keys:
  - `habotprovider-form`: Current form data
  - `habotprovider-savedProfiles`: All submitted profiles

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## 🔍 Form Validation

- Name and Bio are required
- Profile picture is required (max 5MB)
- At least one specialization and service must be selected
- Valid email format required
- Phone number must be 10 digits
- At least one working day must be selected

## 🎨 UI/UX Features

- Smooth transitions between steps
- Progress bar showing current step
- Responsive design for all screen sizes
- Error messages for invalid inputs
- Success message on form submission
- Image preview with remove option
- Checkbox groups for multiple selections

## 📝 Notes

- All form data is persisted in localStorage
- Console logs show submission details for debugging
- Form state is maintained between page refreshes
- Multiple profiles can be saved and managed

## 🔒 Data Structure

```javascript
{
  name: string,
  bio: string,
  profilePicture: string (base64),
  specializations: string[],
  services: string[],
  yearsOfExperience: number,
  email: string,
  phone: string,
  workingHours: string[],
  id: string,
  submittedAt: string
}
```
