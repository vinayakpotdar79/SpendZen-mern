import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { API } from "./api";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style/style.css";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/expenses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecked(true);
      return;
    }

    try {
      const res = await API.get("/auth/verify", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAuthenticated(true);
      setUser(res.data.user);
      await fetchExpenses();
    } catch (error) {
      console.error("Authentication error:", error);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    } finally {
      setAuthChecked(true);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      await fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    setExpenses([]);
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!authChecked) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };

  if (!authChecked) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
        {isAuthenticated && <Navbar onLogout={handleLogout} user={user} />}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard expenses={expenses} isLoading={isLoading} user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <PrivateRoute>
                  <Expenses
                    expenses={expenses}
                    isLoading={isLoading}
                    onAdd={fetchExpenses}
                    onDelete={deleteExpense}
                    user={user}
                  />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile user={user} />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login
                    setIsAuthenticated={setIsAuthenticated}
                    setUser={setUser}
                    fetchExpenses={fetchExpenses} // ✅ Pass so login can refresh data
                  />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/" replace /> : <Register />
              }
            />
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
          </Routes>
        </main>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}
