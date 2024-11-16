
# Contact Management System

## Project Description

This project is a **Contact Management System** designed to help users store and manage contact information for clients or customers. It enables users to add, view, update, and delete contact information in a clean and efficient manner. This system is useful for businesses that need to keep track of customer details.

### Key Features:
- **Add a new contact** with essential details like name, email, phone number, company, and job title.
- **View all contacts** in a user-friendly table with sorting and pagination.
- **Update contact information** when details change (e.g., phone number or company).
- **Delete outdated or unnecessary contacts** to keep the database clean.

## Tech Stack

- **Frontend**: ReactJS with Material UI (MUI)
- **Backend**: Node.js with Express
- **Database**: PostgreSQL

## Setup Instructions

Follow the steps below to set up the project locally.

### Prerequisites
- **Node.js** & **PostgreSQL** installed

### Clone the Repository

1. First, clone the repository to your local machine:

```bash
git clone https://github.com/YashGangan/erinoAssignment.git
cd erinoAssignment
```

### Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up the PostgreSQL database by running the provided `db.sql` script to create the necessary tables. You can do this by running the following command in your PostgreSQL command-line interface or a SQL client:

```sql
-- db.sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,             
    first_name VARCHAR(50) NOT NULL,   
    last_name VARCHAR(50) NOT NULL,    
    email VARCHAR(100) NOT NULL UNIQUE, 
    phone_number VARCHAR(15) NOT NULL, 
    company VARCHAR(100),              
    job_title VARCHAR(100)
);
```

4. Set up the environment variables in a `.env` file (inside the `backend` folder):

```bash
DB_USER=postgres
DB_HOST=localhost
DB_PASS=yourPassword
DB_NAME=yourDatabaseName
DB_PORT=5432
```

5. Start the backend server:

```bash
npm start
```

The backend server should now be running at `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the frontend server:

```bash
npm run dev
```

The frontend should now be running at `http://localhost:3000`.

## How the App Works

1. **Adding a New Contact**: The user fills in a form with fields for first name, last name, email, phone number, company, and job title. Once submitted, the information is sent to the backend and stored in the PostgreSQL database.

2. **Viewing Contacts**: The `DataGrid` component from Material UI is used to display the contacts in a table. The table includes features like pagination and sorting for easy navigation through large lists.

3. **Editing a Contact**: Each contact row includes an 'Edit' button that allows users to update contact details. The form is pre-filled with the existing contact data, and upon submission, the backend updates the respective record.

4. **Deleting a Contact**: Each contact row also includes a 'Delete' button that removes the contact from the database.

## Major Technical Decisions

- **Database Choice**: PostgreSQL was chosen as the database due to its robustness and support for relational data. The `contacts` table is simple but flexible enough to store essential contact details.
  
- **API Design**: The backend API follows REST principles, providing endpoints for CRUD operations (`GET`, `POST`, `PUT`, `DELETE`).

- **Frontend**: ReactJS was chosen for the frontend to provide a dynamic, component-driven interface. Material UI was used for its ready-made, customizable components, which improvved the development process and ensured a clean UI.

- **Error Handling**: Proper error handling was implemented both on the backend and frontend.
