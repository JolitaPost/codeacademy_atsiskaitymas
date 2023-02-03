import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/Pagelayout';
import { Attendees } from './views/Attendees/Attendees';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';

function App() {
  const navigate = useNavigate();
  const [ user, setUser ] = useState(null);

  const handleLoginSuccess = (user) => {
    setUser(user);
    navigate('/');
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout user={user}/>}>
          <Route index element={<Attendees />} />
        </Route>
        <Route path="/login" element={<Login onSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      
    </div>
  )

};

export default App;
