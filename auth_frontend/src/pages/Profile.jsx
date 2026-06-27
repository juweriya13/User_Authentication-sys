import { useEffect, useState } from "react";
import { getProfile } from "../services/profile";

export default function Profile() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const data = await getProfile();
            setUser(data);
        } catch (error) {
            console.error(error);
            alert("Please login first or your session has expired.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <h2>Loading profile...</h2>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>My Profile</h1>

            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone_number}</p>
            <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>State:</strong> {user.state}</p>
            <p><strong>Country:</strong> {user.country}</p>
        </div>
    );
}