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

function App() {
  const { user } = useAuth();
  const { message, showMessage } = useMessage();
  const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" replace />;
  };

  const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    return !user ? children : <Navigate to="/" replace />;
  };
  return (
    <>
      {showMessage && (
        <div className="w-full bg-green-600/80 text-white text-center font-semibold py-3 shadow-md">
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
        <Route path="/:type/:param2" element={<RouteLayout />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
