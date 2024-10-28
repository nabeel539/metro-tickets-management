import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../utils/firebase"; // Firestore instance
import { auth } from "../utils/firebase"; // Firebase auth instance

const ProfilePage = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setFormData(userDoc.data());
        } else {
          setError("User data not found");
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Update the user data in Firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), formData, { merge: true });
      setSuccess("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode after successful update
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error("Update Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Profile Details</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="w-full p-2 border-2 border-gray-300 rounded-md"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-white p-2 rounded-md">
            Save Changes
          </button>
          <button
            type="button"
            className="mt-2 w-full bg-gray-300 text-gray-700 p-2 rounded-md"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="text-center">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <button
            className="mt-4 bg-cyan-500 text-white p-2 rounded-md"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
