import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RouteLayout from "./pages/RouteLayout";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/Navfolder/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import { useMessage } from "./context/MessageContext";
import Profile from "./pages/Profile";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user.accessToken ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return !user.accessToken ? (
    children
  ) : (
    <Navigate to={`/${user.username}`} replace />
  );
};

function App() {
  const { message, showMessage, type } = useMessage();

  return (
    <>
      {showMessage && (
        <div
          className={`fixed z-10 bottom-8 right-4 text-white text-center font-semibold py-2 px-4 rounded-md shadow-md animate-slide-in ${
            type === "error" ? "bg-red-600/80" : "bg-green-600/80"
          }`}
        >
          {message}
        </div>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search/:type" element={<SearchPage />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/:type/:param2" element={<RouteLayout />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
