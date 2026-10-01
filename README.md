<!-- readme-seo: bannysukumar-professional-v4 -->

# Mana Code Playground

Mana Code Playground is a React and Vite learning app. The document title is "Mana Code Playground - Learning Platform", and the meta description says it is an interactive HTML, CSS, and JavaScript playground. The npm package name is `nxt-wave-learning-platform`.

## Overview

The app uses React 18, React Router, Firebase, and Monaco Editor. `index.html` registers a service worker when the browser supports one, and `public/manifest.json` is present. Firebase rules are in `firestore.rules`. The recorded homepage is https://mana-code-playground.vercel.app.

The visible product name is Mana Code Playground. `nxt-wave-learning-platform` is only the package name in `package.json`.

## Features

- React client with Vite
- Monaco Editor dependency for the code editor
- Firebase client dependency and Firestore rules
- Web app manifest and a service-worker registration snippet in `index.html`

## Tech Stack

| Technology | Where it shows up |
|---|---|
| React 18 | `package.json` |
| Vite | `vite.config.js` and the `dev` script |
| Firebase | `package.json`, `firebase.json`, `firestore.rules` |
| Monaco Editor | `@monaco-editor/react` |
| React Router | `react-router-dom` |

## Architecture

Browser → Vite React app → Firebase, using the Firestore rules in this repository.

## Project Structure

```text
Mana-Code-Play-ground/
├── src/
├── public/
├── index.html
├── package.json
├── vite.config.js
├── firebase.json
└── firestore.rules
```

## Prerequisites

- Node.js
- npm

## Installation

```bash
git clone https://github.com/Bannysukumar/Mana-Code-Play-ground.git
cd Mana-Code-Play-ground
npm install
npm run dev
```

`npm run dev` runs Vite.

## Configuration

Firebase project files are `.firebaserc`, `firebase.json`, and `firestore.rules`. Do not commit private Firebase keys. `vercel.json` rewrites requests to `index.html`.

## Usage

Start the dev server and use the playground in the browser. The document describes the app as an interactive HTML, CSS, and JavaScript learning platform.

## Demo

https://mana-code-playground.vercel.app

## Deployment

`vercel.json` and `firebase.json` are in the root. Homepage: https://mana-code-playground.vercel.app.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

Licensed under MIT. See [LICENSE](LICENSE).

## Author

Banny Sukumar

GitHub: https://github.com/Bannysukumar
