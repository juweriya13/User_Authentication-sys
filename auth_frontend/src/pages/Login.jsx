import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("login/", formData);

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data);
      alert("Invalid Username or Password");
    }
  };

  return (
    <AuthLayout title="Login">

      <form onSubmit={handleSubmit}>

        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          text="Login"
        />

      </form>

      <p className="text-center mt-6">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-pink-600 font-semibold"
        >
          Register
        </Link>
      </p>

    </AuthLayout>
  );
}