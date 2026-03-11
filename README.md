# Mini Task Manager

A full-stack task management application built with Spring Boot and Next.js.

## Project Overview

Mini Task Manager is a web application that allows users to create, manage, and track their tasks efficiently. It features a responsive dashboard with filtering and sorting capabilities, secure user authentication, and a clean modern UI.

### Key Features
- User Authentication (Register/Login)
- Task Management (CRUD operations)
- Task Filtering (by Status and Priority)
- Task Sorting (by Due Date, Priority, Created Date)
- Responsive Design (Dark/Light Mode support)
- Admin View (Access to all tasks)

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Security**: Spring Security with JWT
- **Database**: PostgreSQL
- **Persistence**: Spring Data JPA
- **Utilities**: Lombok

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation

---

## Setup Instructions

### Prerequisites
- Java Development Kit (JDK) 17 or higher
- Node.js 18 or higher & npm
- PostgreSQL database
- Maven

### Database Configuration

1. Create a PostgreSQL database named `mini_task_manager`.
2. Update the `src/main/resources/application.properties` file in the backend folder with your PostgreSQL credentials:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mini_task_manager
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Steps to Run the Application

#### 1. Backend
1. Navigate to the backend directory:
   ```bash
   cd Backend/mini-task-manager-backend
   ```
2. Build the project:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

#### 2. Frontend
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

---

## Database Schema

### Users Table
| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | BigInt | Primary Key, Auto-increment |
| `full_name` | Varchar | Not Null |
| `email` | Varchar | Unique, Not Null |
| `password` | Varchar | Not Null (Encrypted) |
| `role` | Enum | Not Null (USER, ADMIN) |

### Tasks Table
| Column | Type | Constraints |
| :--- | :--- | :--- |
| `id` | BigInt | Primary Key, Auto-increment |
| `title` | Varchar | Not Null |
| `description` | Text | |
| `status` | Enum | Not Null (TODO, IN_PROGRESS, DONE) |
| `priority` | Enum | Not Null (LOW, MEDIUM, HIGH) |
| `due_date` | Date | |
| `created_at` | Timestamp | |
| `updated_at` | Timestamp | |
| `user_id` | BigInt | Foreign Key (users.id) |

---

## API Documentation

### Authentication
- `POST /api/auth/register` - Create a new account
- `POST /api/auth/login` - Authenticate user and receive JWT token

### Tasks
- `GET /api/tasks` - Get paginated tasks (supports `status`, `priority` filters and `sortBy`, `sortDir` parameters)
- `GET /api/tasks/{id}` - Get details of a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update an existing task
- `PUT /api/tasks/{id}/complete` - Mark a task as completed
---

## Additional Documentation

Detailed documentation and the database schema can be found in the `docs` directory:
- [Database Schema](file:///d:/Protonest/docs/schema.sql)
- [Project Documentation (Word)](file:///d:/Protonest/docs/Mini_Task_Manager_Documentation.docx)
