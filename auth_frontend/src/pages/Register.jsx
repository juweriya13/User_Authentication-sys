import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Country, State, City } from "country-state-city";

import api from "../services/api";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";

export default function Register() {

  const navigate = useNavigate();

  const [countries] = useState(Country.getAllCountries());

  const [states, setStates] = useState([]);

  const [cities, setCities] = useState([]);

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

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
  const { name, value } = e.target;

  let newValue = value;

  // First Name & Last Name
  if (name === "first_name" || name === "last_name") {
    newValue = value.replace(/[^A-Za-z\s]/g, "");
  }

  // Phone Number
  if (name === "phone_number") {
    newValue = value.replace(/\D/g, "").slice(0, 10);
  }

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: "",
  }));

  if (name === "country") {
    const selectedStates = State.getStatesOfCountry(value);

    setStates(selectedStates);

    setCities([]);

    setFormData((prev) => ({
      ...prev,
      country: value,
      state: "",
      city: "",
    }));
  }

  if (name === "state") {
    const selectedCities = City.getCitiesOfState(
      formData.country,
      value
    );

    setCities(selectedCities);

    setFormData((prev) => ({
      ...prev,
      state: value,
      city: "",
    }));
  }
}

  const validate = () => {
    const newErrors = {};

    // First Name
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.first_name)) {
      newErrors.first_name =
        "First Name should contain letters only.";
    }

    // Last Name
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(formData.last_name)) {
      newErrors.last_name =
        "Last Name should contain letters only.";
    }

    // Username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    } else if (!/^[A-Za-z][A-Za-z0-9_]{3,11}$/.test(formData.username)) {
      newErrors.username =
        "Only letters, numbers and underscore (_) are allowed.";
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone Number
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone Number is required.";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "Phone Number must contain 10 digits.";
    }

    // DOB
    if (!formData.date_of_birth) {
      newErrors.date_of_birth =
        "Date of Birth is required.";
    }

    // Gender
    if (!formData.gender) {
      newErrors.gender = "Please select your gender.";
    }

    if (!formData.country) {
    newErrors.country = "Please select a country.";
}

    if (!formData.state) {
        newErrors.state = "Please select a state.";
    }

    if (!formData.city) {
        newErrors.city = "Please select a city.";
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    // Confirm Password
    if (!formData.confirm_password) {
      newErrors.confirm_password =
        "Confirm Password is required.";
    } else if (
      formData.password !== formData.confirm_password
    ) {
      newErrors.confirm_password =
        "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("register/", formData);

      alert("Registration Successful!");

      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      const backendErrors = {};

      if (error.response?.data) {

        Object.keys(error.response.data).forEach((key) => {

          backendErrors[key] = Array.isArray(
            error.response.data[key]
          )
            ? error.response.data[key][0]
            : error.response.data[key];

        });

      }

      setErrors(backendErrors);

    } finally {

      setLoading(false);

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
      noValidate
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
  type="tel"
  name="phone_number"
  value={formData.phone_number}
  onChange={handleChange}
  placeholder="1234xxxxxx"
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
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-gray-300 focus:ring-pink-500 focus:border-pink-500"
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

  {/* Country */}

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Country
    </label>

    <select
      name="country"
      value={formData.country}
      onChange={handleChange}
      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="">Select Country</option>

      {countries.map((country) => (
        <option
          key={country.isoCode}
          value={country.isoCode}
        >
          {country.name}
        </option>
      ))}
    </select>
  </div>

  {/* State */}

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      State
    </label>

    <select
      name="state"
      value={formData.state}
      onChange={handleChange}
      disabled={!formData.country}
      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="">Select State</option>

      {states.map((state) => (
        <option
          key={state.isoCode}
          value={state.isoCode}
        >
          {state.name}
        </option>
      ))}
    </select>
  </div>

  {/* City */}

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      City
    </label>

    <select
      name="city"
      value={formData.city}
      onChange={handleChange}
      disabled={!formData.state}
      className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
      <option value="">Select City</option>

      {cities.map((city) => (
        <option
          key={city.name}
          value={city.name}
        >
          {city.name}
        </option>
      ))}
    </select>
  </div>

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
        placeholder="Re-enter your password"
        required
        error={errors.confirm_password}
      />

      <Button
        type="submit"
        text={loading ? "Creating Account..." : "Create Account"}
        disabled={loading}
      />

    </form>

    <p className="text-center mt-8 text-sm text-gray-600">
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