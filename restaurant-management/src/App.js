import React, { useState, useContext, createContext, useEffect } from 'react';
import UserContext from './components/UserContext';
import {BrowserRouter as Router, Switch, Route, Routes, Navigate, useNavigate, json} from 'react-router-dom';
import './App.css';
import { Home, Inventory } from './pages';

function App() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const data = {
    user,
    isLoading,
    isLoggedIn,
    setUser,
    setIsLoading,
    setIsLoggedIn
  }

  useEffect(() => {
    setIsLoading(true);
    setUser(JSON.parse(sessionStorage.getItem("user")));
    setIsLoading(false);
  }, [])

  return (
    <UserContext.Provider value={data}>
      <Router>
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/inventory' element={<Inventory />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

