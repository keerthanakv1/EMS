import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "HR",
    dateOfJoining: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const departments = ["HR", "Engineering", "Marketing", "Sales"];

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.employeeId || formData.employeeId.length > 10) newErrors.employeeId = "Valid Employee ID is required (max 10 characters).";
    if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Valid email is required.";
    if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Valid 10-digit phone number is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.dateOfJoining) newErrors.dateOfJoining = "Date of Joining is required.";
    if (new Date(formData.dateOfJoining) > new Date()) newErrors.dateOfJoining = "Date of Joining cannot be in the future.";
    if (!formData.role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/employees", formData);
      alert("Employee added successfully!");
      handleReset();
    } catch (err) {
      alert("Error adding employee: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      employeeId: "",
      email: "",
      phone: "",
      department: "HR",
      dateOfJoining: "",
      role: "",
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <h1>Employee Management System</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Employee ID:
          <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} maxLength="10" />
          {errors.employeeId && <span className="error">{errors.employeeId}</span>}
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <label>
          Department:
          <select name="department" value={formData.department} onChange={handleChange}>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date of Joining:
          <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
          {errors.dateOfJoining && <span className="error">{errors.dateOfJoining}</span>}
        </label>
        <label>
          Role:
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
          {errors.role && <span className="error">{errors.role}</span>}
        </label>
        <div className="button-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset} className="reset-button">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
