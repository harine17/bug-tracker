# bug-tracker

Bug/Task Tracker Interface
This project is a web-based Bug/Task Tracker application built using React.js. It features a simple authentication system with role-based access, allowing both developers and managers to view and manage tasks. The application is designed with a clean, intuitive, and responsive user interface.

Features
User Authentication & Role Management:

Simple login system with mock hardcoded credentials.

Redirects users to a role-specific dashboard upon successful login.

Supports two roles: Developer and Manager.

Dashboard:

Developer Dashboard: Displays tasks assigned to the logged-in developer. Provides options to create, edit, delete, and manage task status.

Manager Dashboard: Provides an overview of all tasks (open, pending approval, closed) across all assignees. Includes task summary statistics.

Trend Line Chart (Placeholder): A visual placeholder for a daily trend line of concurrent tasks.

Task/Bug Creation:

Developers can create new tasks with fields such as Title, Description, Priority (High, Medium, Low), Status, Assignee, and Due Date.

Task/Bug Management:

Developers can edit and delete their tasks.

Tasks can be filtered and sorted based on various criteria (Status, Priority, Assignee, Due Date).

Developers can mark a bug as "Pending Approval" to initiate the closure process.

Managers can approve the closure of a bug (setting its status to "Closed") or re-open it (setting status back to "Open").

Time Tracker:

Developers can log time spent on individual tasks, which is then displayed as "Time Spent".

UI/UX:

Clean, intuitive, and user-friendly interface.

Responsive design ensuring compatibility across desktop and mobile devices.

Styling is implemented using inline CSS to mimic popular utility-first CSS frameworks.

Technology Stack
Frontend Framework: React.js

State Management: React's built-in useState, useContext, and useCallback hooks.

Styling: Pure CSS directly embedded in the React component, using custom classes prefixed with bt- to prevent conflicts and organize styles.

Icons: Inline SVG icons for a lightweight and scalable visual elements.

Setup and Running Locally
This project is designed to be easily run in a standard React development environment, such as one set up with Vite.

Prerequisites:

Ensure Node.js and npm (or yarn) are installed on your system. You can download them from nodejs.org.

Visual Studio Code (or any code editor) is recommended.

Create a New React Project (using Vite):

Open your terminal or command prompt.

Navigate to the directory where you want to create your project.

Run the following command to create a new React project. Follow the prompts:

npm create vite@latest

For "project name", you can use bug-tracker-app.

Select React as the framework.

Select JavaScript as the variant.

Navigate into Your Project Directory:

cd bug-tracker-app

Install Dependencies:

Install the necessary npm packages:

npm install

Replace Application Code:

Open the src/App.jsx (or src/App.tsx if you chose TypeScript, then rename it to .jsx or adapt the code) file in your code editor.

Delete all the existing content of src/App.jsx.

Copy the entire code from the bug-tracker-app Canvas document (the React code block).

Paste the copied code into your empty src/App.jsx file.

Start the Development Server:

In your terminal, within the bug-tracker-app directory, run:

npm run dev

Vite will compile the project and provide a local URL (e.g., http://localhost:5173/).

Open your web browser and navigate to this URL to view the application.

User Authentication
The application uses mock hardcoded credentials for demonstration purposes:

Developer Account:

Username: dev

Password: dev

Manager Account:

Username: manager

Password: manager

Assumptions
In-Memory State: All task data and user authentication are handled in the browser's memory using React's state management. There is no persistent backend or database integration. Data will reset upon page refresh.

Client-Side Filtering/Sorting: Filtering and sorting are performed client-side on the in-memory task list.

Placeholder for Trend Line: The "Trend Line Chart" is currently a visual placeholder and does not display dynamic data.

Future Improvements
Backend Integration: Implement a real backend (e.g., Node.js with Express, Firebase, or a similar service) and a database (e.g., MongoDB, PostgreSQL, Firestore) for persistent data storage.

Robust Authentication: Integrate a proper authentication solution (e.g., Firebase Auth, Auth0, JWT) with secure password hashing and user registration.

Advanced Charting: Replace the placeholder trend line with an actual chart using a library like Recharts or Chart.js for data visualization.

Notifications: Add notification features for task assignments, status changes, or due date reminders.

User Profiles: Expand user roles with more granular permissions and individual user profiles.

Search Functionality: Implement a more robust search capability for tasks.

Drag-and-Drop Interface: Enhance task management with drag-and-drop features for changing status or reordering.

Testing: Add unit, integration, and end-to-end tests for better code reliability.
