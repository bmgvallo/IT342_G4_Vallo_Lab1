import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Registration from './registration';
import Dashboard from './dashboard';
import Profile from './profile';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!token || !isLoggedIn) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (token && isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/registration" 
          element={
            <PublicRoute>
              <Registration />
            </PublicRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;