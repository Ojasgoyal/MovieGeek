import Form from "../components/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";

export default function Login() {
  const { setMessage } = useMessage();
  const navigate = useNavigate();
  const { login } = useAuth();
  const BASE_URL = "http://localhost:5000/api";
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      });
      login(data.accessToken);
      setMessage("🎉 Logged In successfully!");
      navigate("/");
    } catch (error) {
      console.error(`Could not Log In : ${error}`);
    }
  };

  return (
    <Form title="Login" onSubmit={handleSubmit}>
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
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button className="bg-[#00BFFF]/80 hover:bg-[#00ACDF]/80 font-bold py-2 text-white rounded-md">
        Login
      </button>
    </Form>
  );
}
