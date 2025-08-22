Factory Task Management System

This is a full-stack web application designed to help a factory manager and associates manage production tasks. It provides a user-friendly interface to create, read, update, and delete tasks, demonstrating proficiency in modern web development and database management.

Features 

Task Management: Complete CRUD (Create, Read, Update, Delete) functionality for managing tasks.

User Management: A separate interface to add and delete users, and assign tasks to specific team members.

Dynamic UI: The application updates in real-time using asynchronous JavaScript, providing a smooth user experience.

Data Integrity: The backend enforces database constraints, such as ensuring each user has a unique ID.

User Feedback: Provides confirmation messages for all actions (add, update, delete) to improve usability.

Technologies Used 

This project was built using a hybrid C# and React tech stack:

Backend (API)

C# and ASP.NET Core: A high-performance, cross-platform framework for building the RESTful API.

Entity Framework Core: An Object-Relational Mapper (ORM) used to interact with the database.

SQLite: A lightweight, file-based relational database for data storage.

Frontend (User Interface)

React and TypeScript: A modern JavaScript library and a typed superset of JavaScript for building the user interface.

Vite: A fast build tool that provides a seamless development experience.

Bulma: A lightweight CSS framework used for styling the application.

How to Run the Project 

To run this project, you will need the .NET SDK and Node.js installed on your machine.

Clone the repository:

Bash
git clone https://github.com/your-username/your-repo-name.git
Navigate to the backend directory and run it:

Bash
cd TaskManagerApi
dotnet run

In a new terminal, navigate to the frontend directory and run it:

Bash
cd ../task-manager-ui
npm install
npm run dev

The application will be running at http://localhost:5173/ and the backend will be listening on http://localhost:5000/.

Challenges and Learning 

This project was an incredible learning experience. Some of the key challenges I overcame include:

Debugging C# Build Errors: I debugged and resolved several complex C# build errors, including namespace conflicts and issues with Entity Framework Core migrations. This taught me how to read and interpret detailed compiler error messages.

Handling Asynchronous Data Flow: I learned how to manage API requests between a C# backend and a React frontend, ensuring the UI refreshed dynamically without manual reloads.

Database Seeding and Migrations: I implemented database migrations and seeding, a crucial step for setting up a production-ready application with initial data.

CORS Configuration: I learned how to configure Cross-Origin Resource Sharing (CORS) in ASP.NET Core, a common challenge when integrating a frontend and backend on different ports.

Error Handling: I built a robust system to handle errors and provide meaningful feedback to the user, a key part of professional software development.

Feel free to explore the code and the commit history to see my development process.
