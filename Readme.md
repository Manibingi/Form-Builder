# Form Builder Application

This is a **Form Builder Application** that allows users to create, edit, and view forms dynamically. The application supports grouping inputs into sections and provides a drag-and-drop feature for input arrangement.

## Features

- **Create Forms**: Users can create forms with multiple sections and input fields.
- **Edit Forms**: Modify form details, including adding/removing inputs and reordering them.
- **View Forms**: Display a created form with input validation.
- **Drag and Drop**: Allows reordering inputs within sections.
- **Database Storage**: Forms are saved in MongoDB.

## Technologies Used

### **Frontend:**

- React.js
- Tailwind CSS (for styling)

### **Backend:**

- Express.js
- MongoDB

## Installation & Setup

### **1. Clone the Repository**

```bash
git https://github.com/Manibingi/Form-Builder.git
cd Form-Builder
```

### **2. Backend Setup**

```bash
cd server
npm install
```

#### **Environment Variables (.env)**

Create a `.env` file in the `server/` folder and add:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

#### **Run the Backend**

```bash
nodemon index.js
```

### **3. Frontend Setup**

```bash
cd client
npm install
```

#### **Run the Frontend**

```bash
npm run dev
```

## API Endpoints

### **Form Routes**

- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create a new form
- `GET /api/forms/:id` - Get a single form by ID
- `PUT /api/forms/:id` - Update an existing form
- `DELETE /api/forms/:id` - Delete a form

## Usage

- Open `http://localhost:5000` in the browser to access the frontend.
- Create, edit, or view forms using the UI.

-This README.md file provides a clear and concise overview of your project, making it easy for others to understand and contribute. Let me know if you need further assistance! 🚀
