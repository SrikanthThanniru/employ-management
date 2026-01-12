import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Dashboard Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" required
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input placeholder="Password" type="password" required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
