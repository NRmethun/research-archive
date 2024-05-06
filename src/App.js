import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './PrivateRoute';

function App() {
  return (

    <Router>
      <div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/admin/edit/:id" element={<PrivateRoute><Admin editMode={true} /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
