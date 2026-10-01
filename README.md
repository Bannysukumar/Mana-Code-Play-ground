# NXT WAVE - Learning Platform

A production-ready learning platform inspired by NextWave code playground interface. Built with React, Firebase, and Monaco Editor.

[![License](https://img.shields.io/github/license/Bannysukumar/Mana-Code-Play-ground)](https://github.com/Bannysukumar/Mana-Code-Play-ground/blob/main/LICENSE) [![Stars](https://img.shields.io/github/stars/Bannysukumar/Mana-Code-Play-ground)](https://github.com/Bannysukumar/Mana-Code-Play-ground/stargazers) [![Last commit](https://img.shields.io/github/last-commit/Bannysukumar/Mana-Code-Play-ground)](https://github.com/Bannysukumar/Mana-Code-Play-ground/commits/main)

## Overview

A production-ready learning platform inspired by NextWave code playground interface. Built with React, Firebase, and Monaco Editor.


What is actually in the repository: `public/`, `src/`. GitHub reports the primary language as JavaScript.

Published site recorded on the repository: https://mana-code-playground.vercel.app

## Features


- 📚 Step-by-step Learning Content - Read structured lesson content
- 💻 Code Playground - Write HTML, CSS, and JavaScript code with Monaco Editor (VS Code editor)
- 👁️ Live Preview - See output instantly in real-time
- ✅ Progress Tracking - Track lesson completion
- 💾 Auto-save - Code automatically saved to Firebase
- 🔐 Authentication - Secure email/password and Google sign-in
- 📱 Responsive Design - Mobile-first, works on all devices
- Dashboard
- Lesson
- Login
- Output View
- Public Project Page

## Tech Stack

| Technology | Where it shows up |
|---|---|
| React | User interface |
| Vite | Frontend build tool |
| Firebase | Backend services used by this repository |

## Project Architecture

React interface built with Vite → Firebase project files (firestore rules, hosting, or functions) checked into this repository.

## Project Structure

```text
Mana-Code-Play-ground/
├── public/
├── src/
├── .firebaserc
├── FIRESTORE_RULES.md
├── PWA_SETUP.md
├── SETUP.md
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── index.html
├── package-lock.json
├── package.json
├── vercel.json
├── vite.config.js
```

## Getting Started

```bash
git clone https://github.com/Bannysukumar/Mana-Code-Play-ground.git
cd Mana-Code-Play-ground
npm install
npm run dev
```

Scripts defined in package.json:

- `npm run dev` — `vite`
- `npm run build` — `vite build`

## Deployment

- vercel.json is in the repository root.
- firebase.json is in the repository root.
- The repository homepage is https://mana-code-playground.vercel.app.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Licensed under MIT. See [LICENSE](LICENSE).

## Author

[Banny Sukumar](https://github.com/Bannysukumar)

- GitHub: [@Bannysukumar](https://github.com/Bannysukumar)
- Portfolio: [adepu-sukumar.vercel.app](https://adepu-sukumar.vercel.app/)
- LinkedIn: [Adepu Sukumar](https://www.linkedin.com/in/adepu-sukumar-59b423351)
