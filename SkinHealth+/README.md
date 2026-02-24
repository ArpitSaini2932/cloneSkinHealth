# SkinHealth+

SkinHealth+ is a Vite + React application for skin analysis, consultations, and community interaction.

## Tech stack
- React 19 + Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Teachable Machine image model integration
- Appwrite Web SDK (authentication)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
3. Fill `.env` with your Appwrite values:
   - `VITE_APPWRITE_ENDPOINT`
   - `VITE_APPWRITE_PROJECT_ID`
4. Run development server:
   ```bash
   npm run dev
   ```

## Appwrite authentication
- Signup uses `account.create(...)`.
- Login uses `account.createEmailPasswordSession(...)` and `account.get(...)`.
- Configuration lives in `src/lib/appwrite.js`.
