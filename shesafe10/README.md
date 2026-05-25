# SheSafe – Women Safety Assistant

A modern, secure chatbot interface for women's safety assistance built with React and Tailwind CSS.

## Features

- **Glassmorphism UI**: Modern frosted glass design with dark theme
- **Chatbot Interface**: Centered, responsive chat interface
- **Emergency Button**: Always-visible emergency assistance button
- **Smooth Animations**: Micro-interactions and transitions
- **Mobile-First**: Fully responsive design
- **Accessible**: High contrast, large tap targets

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Modern CSS (backdrop-filter for glassmorphism)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Build

```bash
npm run build
```

## Design Specifications

- **Background**: Deep charcoal/near-black gradient
- **Glassmorphism**: Frosted glass effect with backdrop-filter
- **Accent Colors**: Crimson, neon pink, violet (used minimally)
- **Typography**: Inter/Poppins (modern sans-serif)
- **Animations**: Smooth fade/slide transitions
- **Accessibility**: High contrast, large tap targets

## Backend Integration

The chatbot service (`src/services/chatbotService.js`) currently uses mock responses by default. To connect with the Python backend:

1. Install Flask dependencies:
   ```bash
   pip install -r api_requirements.txt
   ```

2. Start the API server:
   ```bash
   python api_server.py
   ```
   The API will run on `http://localhost:5000`

3. Enable API in the frontend:
   - Open `src/services/chatbotService.js`
   - Set `USE_API = true` to use the Python backend
   - The React app will automatically connect to the API

## Emergency Contacts

- **112**: Emergency Services
- **181**: Women Helpline

