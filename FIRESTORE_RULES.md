# Firestore Security Rules for Published Projects

## Collection: `publishedProjects`

### Security Rules

Add these rules to your Firestore Database > Rules section:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
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
    
    // Published Projects collection
    match /publishedProjects/{projectId} {
      // Anyone can read if the project is public
      allow read: if resource.data.isPublic == true;
      
      // Only authenticated users can create
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.uid &&
        request.resource.data.isPublic == true;
      
      // Only the project owner can update
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.uid;
      
      // Only the project owner can delete
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.uid;
    }
  }
}
```

## Complete Security Rules (All Collections Combined)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Lessons collection
    match /lessons/{lessonId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    
    // Progress collection
    match /progress/{progressId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.uid;
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.uid;
    }
    
    // Published Projects collection
    match /publishedProjects/{projectId} {
      // Public read access for published projects
      allow read: if resource.data.isPublic == true;
      
      // Authenticated users can create their own projects
      allow create: if request.auth != null && 
        request.auth.uid == request.resource.data.uid &&
        request.resource.data.isPublic == true;
      
      // Only project owner can update
      allow update: if request.auth != null && 
        request.auth.uid == resource.data.uid;
      
      // Only project owner can delete
      allow delete: if request.auth != null && 
        request.auth.uid == resource.data.uid;
    }
  }
}
```

## How to Apply These Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** > **Rules**
4. Paste the complete rules above
5. Click **Publish**

## Data Model

The `publishedProjects` collection uses the following structure:

```javascript
{
  projectId: string (auto-generated),
  uid: string (user ID),
  lessonId: string (optional),
  title: string,
  htmlCode: string,
  cssCode: string,
  jsCode: string,
  isPublic: true (boolean),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Security Features

- ✅ Public projects are readable by anyone (no authentication required)
- ✅ Only authenticated users can create projects
- ✅ Only project owners can update or delete their projects
- ✅ Projects must be marked as `isPublic: true` to be readable
- ✅ User ID validation ensures users can only manage their own projects

