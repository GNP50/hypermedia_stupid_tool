import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, BrowserRouter, Navigate } from 'react-router-dom';
import MetricComponent from './components/MetricComponent';
import ParentComponent from './components/ParentComponent';
import EvaluationForm from './components/EvaluationForm';

const App = () => {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');
  const [url, setUrl] = useState('');

  // Function to show toast message
  const showToast = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(''), 3000); // Hide the message after 3 seconds
  };

  // Function to handle setting user and url
  const handleSetUserUrl = (newUser, newUrl) => {
    setUser(newUser);
    setUrl(newUrl);
    showToast(`User set to ${newUser} and URL set to ${newUrl}`);
  };

  // Function to check if user and url are set
  const isUserUrlSet = () => {
    return user !== '' && url !== '';
  };

  // Route guard function to block routes if user and url are not set
  const routeGuard = (element) => {
    return isUserUrlSet() ? element : <Navigate to="/" />;
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h1 className="text-xl font-bold mb-4">{user} - {url}</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/survey-responses"
                activeClassName="font-semibold"
                className="text-blue-600 hover:text-blue-800"
              >
                Survey Responses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/continue-insert"
                activeClassName="font-semibold"
                className="text-blue-600 hover:text-blue-800"
              >
                Continue Insert
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Routes>
          <Route path="/survey-responses" element={routeGuard(<MetricComponent user={user} url={url} />)} />
          <Route path="/continue-insert" element={routeGuard(<EvaluationForm user={user} url={url} />)} />
          <Route path="/" element={<ParentComponent onSetUserUrl={handleSetUserUrl} />} />
        </Routes>
      </div>

      {/* Toast Message */}
      {message && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-md shadow-md">
          {message}
        </div>
      )}
    </div>
  );
}

export default App;
