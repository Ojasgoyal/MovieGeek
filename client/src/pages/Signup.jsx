import Form from "../components/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";

export default function Signup() {
  const { setMessage } = useMessage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/api";

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/register`, formData, {
        withCredentials: true,
      });
      login(data.accessToken)

      setMessage("🎉 Account created successfully!")
      navigate("/")
    } catch (error) {
      console.error(`Could not Sign Up : ${error}`);
    }
  };

  return (
    <>
      <Form title="Sign Up" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Full Name"
          className="px-4 py-2 rounded-md bg-gray-400/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Username"
          className="px-4 py-2 rounded-md bg-gray-400/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-md bg-gray-400/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          required
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-md bg-gray-400/40 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="bg-[#00BFFF]/80 hover:bg-[#00ACDF]/80 font-bold py-2 text-white rounded-md">
          Sign Up
        </button>
      </Form>
    </>
  );
}
