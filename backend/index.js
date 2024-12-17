const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql@123",
  database: "employee_management",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Database connected");
});

app.post("/api/employees", (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } = req.body;

  if (!name || !employeeId || !email || !phone || !department || !dateOfJoining || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkQuery = "SELECT * FROM employees WHERE employeeId = ? OR email = ?";
  db.query(checkQuery, [employeeId, email], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Database error", error: err.message });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Employee ID or Email already exists" });
    }

    const insertQuery = `
      INSERT INTO employees (name, employeeId, email, phone, department, dateOfJoining, role)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [name, employeeId, email, phone, department, dateOfJoining, role], (err) => {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).json({ message: "Database error", error: err.message });
      }
      res.status(200).json({ message: "Employee added successfully" });
    });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
