# **Cookie - Restaurant Ordering System**

**Cookie** is a web-based restaurant ordering system that allows customers to place orders through a menu interface, and provides an admin panel to manage orders and product categories.

## **Features**
- **Customer Interface**:
  - A menu to view available products.
  - Ability to place orders with different statuses (e.g., Pending, Preparing, Completed).
  
- **Admin Interface**:
  - Manage orders by changing their statuses (Pending, Preparing, Completed).
  - Manage categories: Add, Edit, Delete product categories.
  - Manage products: Add, Edit, Delete products.
  - Secure authentication for the admin panel to prevent unauthorized access.

---

## **Tech Stack**

- **Frontend**: 
  - **Next.js** (React Framework for Server-Side Rendering)
  - **Tailwind CSS** (Utility-first CSS framework)
  - **TypeScript** (JavaScript with type safety)
  
- **Backend**: 
  - **Node.js with Express** (Server-side runtime and framework)
  - **TypeScript** (JavaScript with type safety)
  - **Prisma ORM** (Database management with PostgreSQL)
  - **PostgreSQL** (Relational database)
  - **Zod** (Type validation)

---

## **Installation and Setup**

### **Prerequisites**
1. **Node.js** (>= v14)
2. **PostgreSQL** database (ensure it's running locally or use a cloud service like Heroku or AWS RDS).
3. **Prisma CLI** for managing your database schema.

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/cookie.git
cd cookie
```
### **2. Install Dependencies**
1. Backend:
Navigate to the backend folder and install the required dependencies:

```bash
cd backend
npm install
```
2. Frontend:
Navigate to the frontend folder and install the required dependencies:

```bash
cd frontend
npm install
```

### **3. Configure the Database**
Set up your PostgreSQL database: You can either use a local PostgreSQL instance or a cloud-based one (e.g., Heroku, AWS RDS).

Configure environment variables:

In the backend folder, create a .env file to store your environment variables:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/cookie?schema=public"
```
Replace USER, PASSWORD, and localhost with your actual PostgreSQL details.

### **4. Set Up Prisma**
Run the following commands to generate the Prisma client and apply migrations:

```bash
cd backend
npx prisma migrate deploy
npx prisma generate
```

### **5. Start the Development Servers**
Start Backend (Node.js with Express):
Navigate to the backend folder and start the backend server:

```bash
cd backend
npm run dev
```
This will start the backend server at http://localhost:3001.

Start Frontend (Next.js):
Navigate to the frontend folder and start the frontend server:

```bash
cd frontend
npm run dev
```
This will start the backend server at http://localhost:3000.
