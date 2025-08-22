import Form from "../components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useMessage } from "../context/MessageContext";

export default function Login() {
  const { setMessage, setType } = useMessage();
  const { login } = useAuth();
  const BASE_URL = "http://localhost:5000/api";
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/login`, formData, {
        withCredentials: true,
      });
      login(data);
      setMessage("🎉 Logged In successfully!");
    } catch (error) {
      // Ensure error.response exists and handle it properly
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.error || "An error occurred";

        if (status === 401) {
          setMessage("❌ Incorrect email or password. Please try again.");
        } else if ((status === 404)) {
          setMessage("❌ User with email does not exist");
          setFormData({ email: "", password: "" });
        } else {
          setMessage(`❌ ${errorMessage}`);
        }
      } else {
        // Handle network or unexpected errors
        setMessage(
          "❌ Unable to connect to the server. Please try again later."
        );
      }
      setType("error");
      console.error(`Could not Log In: ${error}`);
    }
  };


  useEffect

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
