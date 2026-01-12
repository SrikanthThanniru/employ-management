import { useEffect, useState } from "react";

const states = ["Karnataka", "Telangana", "Tamil Nadu", "Maharashtra"];

const EmployeeForm = ({
  employees,
  updateEmployees,
  editing,
  setEditing,
  onClose,
}) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setForm(editing);
      setErrors({});
    }
  }, [editing]);

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.state) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editing) {
      updateEmployees(
        employees.map((e) => (e.id === editing.id ? form : e))
      );
      setEditing(null);
    } else {
      updateEmployees([...employees, { ...form, id: Date.now() }]);
    }

    onClose();
    setForm({
      name: "",
      gender: "",
      dob: "",
      state: "",
      active: true,
      image: "",
    });
    setErrors({});
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      {/* Name */}
      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      {errors.name && <small className="error">{errors.name}</small>}

      {/* Gender */}
      <select
        value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}
      >
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>
      {errors.gender && <small className="error">{errors.gender}</small>}

      {/* DOB */}
      <input
        type="date"
        value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })}
      />
      {errors.dob && <small className="error">{errors.dob}</small>}

      {/* State */}
      <select
        value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}
      >
        <option value="">State</option>
        {states.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>
      {errors.state && <small className="error">{errors.state}</small>}

      {/* Image */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () => setForm({ ...form, image: reader.result });
          reader.readAsDataURL(e.target.files[0]);
        }}
      />

      {form.image && (
        <img src={form.image} alt="preview" className="preview" />
      )}

      {/* Active Checkbox */}
      <div className="checkbox-group">
        <input
          id="active"
          type="checkbox"
          checked={form.active}
          onChange={(e) => setForm({ ...form, active: e.target.checked })}
        />
        <label htmlFor="active">Active</label>
      </div>

      <button type="submit">
        {editing ? "Update" : "Add"} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
