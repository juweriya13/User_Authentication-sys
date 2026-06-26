import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../services/api";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    city: "",
    state: "",
    country: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await api.post("register/", formData);

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      alert(JSON.stringify(error.response?.data));

    }
  };

  return (

    <AuthLayout title="Create Account">

      <form onSubmit={handleSubmit}>

        <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} />

        <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} />

        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} />

        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} />

        <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} />

        <InputField label="Date of Birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />

        <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />

        <InputField label="City" name="city" value={formData.city} onChange={handleChange} />

        <InputField label="State" name="state" value={formData.state} onChange={handleChange} />

        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />

        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} />

        <InputField label="Confirm Password" type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />

        <Button type="submit" text="Register" />

      </form>

      <p className="text-center mt-5">
        Already have an account?{" "}
        <Link
          to="/"
          className="text-pink-600 font-semibold"
        >
          Login
        </Link>
      </p>

    </AuthLayout>
  );
}