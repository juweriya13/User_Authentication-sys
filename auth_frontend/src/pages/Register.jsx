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

    <AuthLayout title="Create Account">

   <form onSubmit={handleSubmit}>
        {/* <p className="text-sm text-gray-500 mb-6">Fields marked <span className="text-red-500">*</span> are mandatory.</p> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-5"> */}

        <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required />
         {errors.first_name && (<p className="text-red-500 text-sm mt-1"> {errors.first_name} </p> )}

        <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required />
         {errors.last_name && (<p className="text-red-500 text-sm mt-1"> {errors.last_name} </p> )}


        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
         {errors.username && (<p className="text-red-500 text-sm mt-1"> {errors.username} </p> )}


        <InputField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
         {errors.email && (<p className=""> {errors.email} </p> )}


        <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
         {errors.phone_number && (<p className=""> {errors.phone_number} </p> )}


        <InputField label="Date of Birth" type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required />
         {errors.date_of_birth && (<p className="text-red-500 text-sm mt-1"> {errors.date_of_birth} </p> )}


        <div className="mb-4">
        <label className="block mb-2 font-medium text-gray-700"> Gender <span className="text-red-500">*</span></label>
        <select 
        name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600">
        <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
        </select>
        {errors.gender && ( <p className="text-red-500 text-sm mt-1">{errors.gender}</p> )}
        </div>

        <InputField label="City" name="city" value={formData.city} onChange={handleChange} />

        <InputField label="State" name="state" value={formData.state} onChange={handleChange} />

        <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />

        <InputField label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
         {errors.password && (<p className="text-red-500 text-sm mt-1"> {errors.password} </p> )}

        <InputField label="Confirm Password" type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
         {errors.confirm_password && (<p className="text-red-500 text-sm mt-1"> {errors.confirm_password} </p> )}

        <div className="mt-6"><Button type="submit" text="Create Account"/></div>

      {/* </div> */}

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