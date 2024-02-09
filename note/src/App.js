import './App.css';

import { Routes, Route } from "react-router-dom";
import LandingPage from './components/landing/LandingPage';
import Register from './components/Register';
import KeepNotes from './components/notes/KeepNotes';
import Update from './components/notes/Update';
// import UserlistM from './components/UserlistM';

 

function App() {
 
  return (
    <div className="App">
    <Routes>
       <Route path="/" element={<LandingPage />} />
       <Route path='/register' element={<Register/>}/>
       <Route path='/create-note' element={<KeepNotes/>}/>
       <Route path='/update/:id' element={<Update/>}/>
    </Routes> 
    </div>
  );
}

export default App;