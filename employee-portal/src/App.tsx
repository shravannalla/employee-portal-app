import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import EmployeeManagement from "./components/pages/EmployeeManagement";
import LoginPage from "./components/pages/Login";
import { useEffect, useState } from "react";
import { logoutEmployee } from "./utils/api";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const cookies = document.cookie;
        if (cookies.includes("token")) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err: any) {
        console.log("Authentication check error: " + err);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutEmployee();
    } catch (err) {
      console.log("Logout error: " + err);
    } finally {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsAuthenticated(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/employeeManagement"
          element={
            isAuthenticated ? <EmployeeManagement handleLogout={handleLogout} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
