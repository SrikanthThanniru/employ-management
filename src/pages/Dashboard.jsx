import {  useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔽
import { logout } from "../utils/auth"; // 🔽
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import SearchFilter from "../components/SearchFilter";
import Modal from "../components/Modal";
import { getEmployees, saveEmployees } from "../utils/storage";

const Dashboard = () => {
  const [employees, setEmployees] = useState(() => getEmployees());
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", gender: "", status: "" });

  const navigate = useNavigate(); // 🔽

  // 🔽 LOGOUT HANDLER
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const updateEmployees = (data) => {
    setEmployees(data);
    saveEmployees(data);
  };

  const openAddModal = () => {
    setEditing(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee) => {
    setEditing(employee);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setIsModalOpen(false);
  };

  const filteredEmployees = employees.filter(emp => {
    return (
      emp.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.gender ? emp.gender === filters.gender : true) &&
      (filters.status ? emp.active === (filters.status === "active") : true)
    );
  });

  return (
    <div className="dashboard">

      {/* 🔽 HEADER WITH LOGOUT */}
      <div className="dashboard-header">
        <h1>Employee Management</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="summary">
        <div>Total Employees: {employees.length}</div>
        <div>Active: {employees.filter(e => e.active).length}</div>
        <div>Inactive: {employees.filter(e => !e.active).length}</div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <SearchFilter setFilters={setFilters} />
        <button className="add-btn" onClick={openAddModal}>
          + Add Employee
        </button>
      </div>

      <EmployeeTable
        employees={filteredEmployees}
        updateEmployees={updateEmployees}
        setEditing={openEditModal}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editing ? "Edit Employee" : "Add Employee"}
      >
        <EmployeeForm
          employees={employees}
          updateEmployees={updateEmployees}
          editing={editing}
          setEditing={setEditing}
          onClose={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
