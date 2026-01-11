# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Firebase

1. Create a Firebase project at https://console.firebase.google.com/
2. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Google" (configure OAuth consent screen)
3. Create Firestore Database:
   - Go to Firestore Database
   - Create database (start in test mode for development)
4. Get your config:
   - Project Settings > General > Your apps > Web
   - Copy the config object

5. Update `src/firebase.js` with your config:
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

## Step 3: Set Firestore Security Rules

Go to Firestore Database > Rules and paste:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.uid;
    }
  }
}
```

## Step 4: Run the App

```bash
npm run dev
```

The app will open at http://localhost:3000

## Optional: Add a Lesson

1. Go to Firestore Console
2. Create collection: `lessons`
3. Add document with ID: `lesson-1`
4. Add fields:
   - `title` (string): "Step by Step Process of achieving the Favourite Places Section"
   - `content` (string): Your lesson content

**Note:** The app will work without adding lessons manually - it uses default content if no lessons are found in Firestore.

## Project Features ✅

- ✅ React with Vite
- ✅ React Router DOM
- ✅ Firebase Authentication (Email + Google)
- ✅ Firestore for data persistence
- ✅ Monaco Editor (VS Code editor)
- ✅ Live code preview
- ✅ Auto-save code
- ✅ Progress tracking
- ✅ Responsive design
- ✅ All components built
- ✅ All pages implemented
- ✅ Complete styling

Everything is ready to use!

