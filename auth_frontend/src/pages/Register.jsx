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
          phone_number: "",
          date_of_birth: "",
          gender: "",
          city: "",
          state: "",
          country: "",
          password: "",
          confirm_password: "",
      });

      const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const validate = () => {
  let newErrors = {};

  if (!formData.first_name.trim())
    newErrors.first_name = "First Name is required.";

  if (!formData.last_name.trim())
    newErrors.last_name = "Last Name is required.";

  if (!formData.username.trim())
    newErrors.username = "Username is required.";

  if (!formData.email.trim())
    newErrors.email = "Email is required.";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Please enter a valid email.";

  if (!formData.phone_number.trim())
    newErrors.phone_number = "Phone Number is required.";
  else if (!/^\d{10}$/.test(formData.phone_number))
    newErrors.phone_number = "Please enter a valid 10-digit phone number.";

  if (!formData.date_of_birth)
    newErrors.date_of_birth = "Date of Birth is required.";

  if (!formData.gender)
    newErrors.gender = "Please select your gender.";

  if (!formData.password)
    newErrors.password = "Password is required.";
  else if (formData.password.length < 8)
    newErrors.password = "Password must be at least 8 characters.";

  if (!formData.confirm_password)
    newErrors.confirm_password = "Confirm Password is required.";
  else if (formData.password !== formData.confirm_password)
    newErrors.confirm_password = "Passwords do not match.";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return;

  try {
    await api.post("register/", formData);

    alert("Registration Successful!");

    navigate("/");

  } catch (error) {

    console.log(error.response?.data);

    setErrors(error.response?.data || {});
  }
};

  return (
  <AuthLayout
    title="Create Account"
    subtitle="Create your account to continue"
  >
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* First Name & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="John"
          required
          error={errors.first_name}
        />

        <InputField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Doe"
          required
          error={errors.last_name}
        />
      </div>

      {/* Username */}
      <InputField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="john_doe"
        required
        error={errors.username}
      />

      {/* Email */}
      <InputField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="john@example.com"
        required
        error={errors.email}
      />

      {/* Phone */}
      <InputField
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        placeholder="phone number"
        required
        error={errors.phone_number}
      />

      {/* DOB + Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <InputField
          label="Date of Birth"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          error={errors.date_of_birth}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
            <span className="text-red-500 ml-1">*</span>
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full rounded-xl border px-4 py-2.5 text-sm bg-white
            ${
              errors.gender
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-pink-500"
            }
            focus:outline-none focus:ring-2`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <p className="text-xs text-red-500 mt-1">
              {errors.gender}
            </p>
          )}
        </div>

      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <InputField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Nagpur"
        />

        <InputField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Maharashtra"
        />

        <InputField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="India"
        />

      </div>

      {/* Password */}
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Minimum 8 characters"
        required
        error={errors.password}
      />

      {/* Confirm Password */}
      <InputField
        label="Confirm Password"
        type="password"
        name="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
        placeholder="Re-enter password"
        required
        error={errors.confirm_password}
      />

      <Button
        type="submit"
        text="Create Account"
      />
    </form>

    <p className="text-center mt-8 text-gray-600 text-sm">
      Already have an account?{" "}
      <Link
        to="/"
        className="font-semibold text-pink-600 hover:text-pink-700"
      >
        Login
      </Link>
    </p>

  </AuthLayout>
);
}