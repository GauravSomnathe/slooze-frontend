# Slooze Frontend – Take Home Challenge

## 🚀 Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Apollo Client
- GraphQL
- Role-Based Access Control (RBAC)

## ✨ Features
- Email & Password Authentication
- Role-based access (Manager / Store Keeper)
- Protected Dashboard (Manager only)
- Product listing and management
- Light / Dark theme with persistence
- Role-based UI restrictions

## 🔐 Role Permissions

| Feature        | Manager | Store Keeper |
|---------------|---------|--------------|
| Login         | ✅      | ✅           |
| Dashboard     | ✅      | ❌           |
| View Products | ✅      | ✅           |
| Add/Edit      | ✅      | ✅           |

## 🌓 Theme Handling
Dark mode is implemented using Tailwind’s class-based strategy.  
Theme preference is stored in `localStorage` and applied at the HTML root level before hydration to prevent UI flickering.

## 🛠️ Setup Instructions

```bash
git clone https://github.com/GauravSomnathe/slooze-frontend.git
cd slooze-frontend
npm install
npm run dev
