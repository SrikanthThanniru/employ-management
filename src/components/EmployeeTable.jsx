const EmployeeTable = ({ employees, updateEmployees, setEditing }) => {
  const deleteEmployee = (id) => {
    if (confirm("Are you sure?")) {
      updateEmployees(employees.filter((e) => e.id !== id));
    }
  };

  const printList = () => {
    window.print();
  };

  return (
    <>
      {employees.length === 0 && <p>No employees found</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>State</th>
            <th>Status</th>
            <th className="no-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                <img src={emp.image} width="40" />
              </td>
              <td>{emp.name}</td>
              <td>{emp.gender}</td>
              <td>{emp.dob}</td>
              <td>{emp.state}</td>
              <td>{emp.active ? "Active" : "Inactive"}</td>
              <td className="no-print">
                <button onClick={() => setEditing(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                <button onClick={printList}>Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTable;
