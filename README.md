Factory Task Management System
A modern, full-stack web application designed to help factory teams manage production tasks efficiently. This project features a professional dark-mode UI and provides a seamless user experience for creating, assigning, and tracking tasks.

✨ Features
Full CRUD Functionality: Create, Read, Update, and Delete tasks and users with a clean and intuitive interface.

Modern Dark-Mode UI: A professionally designed interface with a consistent dark theme, featuring:

Color-Coded Status Tags: Instantly identify task status (Pending, In Progress, Completed) with visual cues.

Balanced Layout: A centered, single-column layout provides a clean and focused user experience.

Interactive Edit Modal: A custom-built modal for editing tasks, replacing native browser prompts for a smoother workflow.

Robust User Experience: The application is designed to be resilient and user-friendly, with features like:

Empty State Placeholders: Helpful messages appear when task or user lists are empty.

Error Prevention: Forms are disabled until all necessary data is loaded, preventing submission errors.

🛠️ Technologies Used
This project was built using a modern C# and React tech stack:

Backend (API): C# and ASP.NET Core, Entity Framework Core, SQLite

Frontend (UI): React, TypeScript, Vite, Bulma (with custom styling)

🚀 How to Run the Project
To run this project, you will need the .NET SDK and Node.js installed on your machine.

1. Clone the repository:

Bash
git clone https://github.com/your-username/your-repo-name.git
2. Navigate to the backend directory and run it:

Bash
cd TaskManagerApi
dotnet run
The backend will be listening on http://localhost:5285/.

3. In a new terminal, navigate to the frontend directory and run it:

Bash
cd ../task-manager-ui
npm install
npm run dev
The application will be running at http://localhost:5173/.

🧠 Challenges and Learning
This project was an incredible learning experience. Some of the key challenges I overcame include:

Advanced Frontend Development: I moved beyond basic functionality to build a professional user interface. This involved creating a custom React modal from scratch to replace native browser prompts, managing complex application state, and developing a custom dark-themed design system on top of the Bulma CSS framework.

Full-Stack Integration: I learned to manage the entire data flow between a C# backend and a React frontend, including configuring Cross-Origin Resource Sharing (CORS) and handling asynchronous API requests to ensure the UI updated dynamically.

Database Management & Integrity: I used Entity Framework Core to perform database migrations and seeding. I solved complex backend errors, such as FOREIGN KEY constraint violations, by implementing more robust state handling and error prevention on the frontend.

End-to-End Debugging: I diagnosed and fixed bugs across the entire technology stack, from interpreting C# backend stack traces to debugging network requests and resolving TypeScript errors on the frontend.
