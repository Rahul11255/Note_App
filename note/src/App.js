import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from './components/landing/LandingPage';
import Register from './components/Register';
import KeepNotes from './components/notes/KeepNotes';
import Update from './components/notes/Update';
import { useEffect, useState } from 'react';

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedIn'));
    if (loggedInUser) {
      setLoggedIn(true);
      // navigate("/create-note")

    } else {
      setLoggedIn(false);
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/register' element={<Register />} />
        {loggedIn && (
          <>
            <Route path='/create-note' element={<KeepNotes />} />
            <Route path='/update/:id' element={<Update />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
