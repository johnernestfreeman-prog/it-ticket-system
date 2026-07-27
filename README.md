# 🎫 IT Help Desk — Ticket Management System
 
A full-stack ticket management system built for IT help desks to track incidents, service requests, and technician assignments in one dashboard.
 
![Tech Stack](https://skillicons.dev/icons?i=js,nodejs,express,mongodb,html,css)
 
---
 
## 📸 Preview
 
<!-- Replace this with your actual dashboard screenshot -->
<!-- Save your screenshot in the repo (e.g. /screenshots/dashboard.png) and update the path below -->
![Dashboard Preview](./screenshots/dashboard.png)
 
---
 
## ✨ Features
 
- 📊 **Live Dashboard** — at-a-glance counts for Open, In Progress, Resolved, and Total tickets
- 🔍 **Search & Filter** — search by Incident ID or employee name, filter by priority, status, and department
- 🎟️ **Ticket Creation** — quickly log new incidents and service requests
- 🔄 **Board Refresh** — real-time refresh of ticket board without a full page reload
- 📤 **Export** — export ticket data for reporting
- ⚙️ **Settings & Theming** — light/dark theme toggle for technician preference
- 📅 **Today's Activity Log** — tracks tickets touched or created that day
- 👤 **Technician Profiles** — assigned technician shown with role and avatar
---
 
## 🛠️ Tech Stack
 
| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express |
| Database | MongoDB |
| Hosting | *(add your deployment platform here)* |
 
---
 
## 🚀 Getting Started
 
### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or a MongoDB Atlas connection string)
### Installation
 
```bash
# Clone the repo
git clone https://github.com/YOUR_GITHUB_USERNAME/it-ticket-system.git
cd it-ticket-system
 
# Install dependencies
npm install
```
 
### Environment Setup
 
Create a `.env` file in the root directory:
 
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
 
### Run the App
 
```bash
npm start
```
 
The app will be available at `http://localhost:5000`.
 
---
 
## 📁 Project Structure
 
```
it-ticket-system/
├── server/
│   ├── models/         # MongoDB schemas (Ticket, User, etc.)
│   ├── routes/         # Express API routes
│   └── server.js       # App entry point
├── public/
│   ├── index.html
│   ├── css/
│   └── js/
├── .env
├── .gitignore
└── package.json
```
 
---
 
## 🎯 Roadmap / What's Next
 
- [ ] Fix remaining accessibility warnings (ARIA labels, contrast)
- [ ] Add technician login/authentication
- [ ] Add ticket history/audit log per incident
- [ ] Email notifications on ticket status change
---
 
## 🔗 Live Demo
 
[🚀 View Live Site](#) <!-- Add your deployed link here -->
 
---
 
## 🏷️ License
 
This project is open source and available under the [MIT License](LICENSE).
 
---
 
<div align="center">
*Built by John Freeman — Always learning. Always building. Always improving.*
 
</div>
