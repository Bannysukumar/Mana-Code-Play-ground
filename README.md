# NXT WAVE - Learning Platform

A production-ready learning platform inspired by NextWave code playground interface. Built with React, Firebase, and Monaco Editor.

## Features

- 📚 **Step-by-step Learning Content** - Read structured lesson content
- 💻 **Code Playground** - Write HTML, CSS, and JavaScript code with Monaco Editor (VS Code editor)
- 👁️ **Live Preview** - See output instantly in real-time
- ✅ **Progress Tracking** - Track lesson completion
- 💾 **Auto-save** - Code automatically saved to Firebase
- 🔐 **Authentication** - Secure email/password and Google sign-in
- 📱 **Responsive Design** - Mobile-first, works on all devices

## Tech Stack

- **Frontend:**
  - React 18
  - Vite
  - React Router DOM
  - Monaco Editor (VS Code editor)
  - CSS Modules

- **Backend:**
  - Firebase Authentication (Email + Google)
  - Cloud Firestore
  - Firebase Hosting (optional)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Firebase account

### Installation

1. **Clone or download the project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project (or use existing)
   - Enable Authentication:
     - Go to Authentication > Sign-in method
     - Enable "Email/Password"
     - Enable "Google" (add OAuth consent screen if needed)
   - Create Firestore Database:
     - Go to Firestore Database
     - Create database in test mode (or production with rules below)
   - Get your Firebase config:
     - Go to Project Settings > General
     - Scroll down to "Your apps"
     - Click Web icon (</>) to add web app
     - Copy the config object

4. **Configure Firebase:**

   Edit `src/firebase.js` and replace the placeholder values with your Firebase config:

   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   }
   ```

5. **Set up Firestore Security Rules:**

   Go to Firestore Database > Rules and add:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection - users can only read their own data
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Lessons collection - all authenticated users can read
       match /lessons/{lessonId} {
         allow read: if request.auth != null;
         allow write: if false; // Only admins can write (use Cloud Functions or Admin SDK)
       }
       
       // Progress collection - users can only access their own progress
       match /progress/{progressId} {
         allow read, write: if request.auth != null && 
           request.auth.uid == resource.data.uid;
         allow create: if request.auth != null && 
           request.auth.uid == request.resource.data.uid;
       }
     }
   }
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

7. **Open your browser:**
   - The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── main.jsx                 # Entry point
├── App.jsx                  # Main app component
├── firebase.js              # Firebase configuration
├── routes/
│   └── AppRoutes.jsx       # Route definitions
├── components/
│   ├── Header.jsx          # Fixed header with logo, stats
│   ├── LessonContent.jsx   # Lesson content display
│   ├── CodePlayground.jsx  # Main code editor component
│   ├── EditorTabs.jsx      # HTML/CSS/JS tabs
│   ├── OutputPreview.jsx   # Live preview iframe
│   ├── HelpButton.jsx      # Floating help button
│   └── CompletedBadge.jsx  # Completion indicator
├── pages/
│   ├── Login.jsx           # Authentication page
│   ├── Dashboard.jsx       # Lesson list page
│   └── Lesson.jsx          # Lesson detail page
├── styles/
│   └── *.module.css        # Component styles
└── utils/
    ├── AuthContext.jsx     # Auth context provider
    └── PrivateRoute.jsx    # Protected route wrapper
```

## Firestore Collections

### `users`
```javascript
{
  uid: string,
  email: string,
  name: string,
  createdAt: timestamp
}
```

### `lessons`
```javascript
{
  lessonId: string,
  title: string,
  content: string
}
```

### `progress`
```javascript
{
  uid: string,
  lessonId: string,
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  completed: boolean,
  updatedAt: timestamp
}
```

## Adding Lessons

You can add lessons directly in Firestore Console or use the Admin SDK:

1. Go to Firestore Database in Firebase Console
2. Click "Start collection"
3. Collection ID: `lessons`
4. Document ID: `lesson-1` (or any ID)
5. Add fields:
   - `title` (string): "Your Lesson Title"
   - `content` (string): "• Step 1\n  • Substep\n• Step 2"

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` folder.

### Deploy to Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize hosting:
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Public directory: `dist`
   - Single-page app: Yes
   - Automatic builds: No

4. Deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## Features Overview

### Code Playground
- Monaco Editor (VS Code editor) with syntax highlighting
- Three tabs: HTML, CSS, JavaScript
- Live preview in Output tab
- Auto-save code to Firestore (debounced 1 second)

### Progress Tracking
- Code automatically saved as you type
- Lesson completion status tracked
- Progress synced across devices

### Authentication
- Email/Password sign-up and sign-in
- Google Sign-In
- Protected routes
- User session persistence

## Customization

### Colors
Edit CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-color: #1f4bd8;
  --success-color: #10b981;
  /* ... */
}
```

### Editor Settings
Modify Monaco Editor options in `src/components/CodePlayground.jsx`

## Troubleshooting

### Firebase Connection Issues
- Verify your Firebase config in `src/firebase.js`
- Check Firebase project settings
- Ensure Firestore is enabled

### Authentication Not Working
- Verify Authentication is enabled in Firebase Console
- Check sign-in methods are enabled
- For Google Sign-In, configure OAuth consent screen

### Code Not Saving
- Check Firestore security rules
- Verify user is authenticated
- Check browser console for errors

## License

MIT License - feel free to use this project for learning and development.

## Support

For issues and questions, please check the code comments or refer to Firebase and React documentation.

