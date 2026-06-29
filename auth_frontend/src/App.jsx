import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import ChangePassword from "./pages/ChangePassword";
import React from "react";
import Form, {Field} from 'rc-field-form';


// const Input = ({value= '',...props}) => <input value={value} {...props} />;

// const handleFinish = (values) => {
//   if (!values.username || !values.password || !values.email || !values.first_name || !values.last_name) {
//     alert('Please fill in the above fields.');
//   }
// };

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/users" element={<Users />} />
      <Route path="/change-password" element={<ChangePassword />} />
            
    </Routes>
  );
}

export default App;