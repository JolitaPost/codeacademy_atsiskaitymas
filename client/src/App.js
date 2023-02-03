import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PageLayout } from './components/PageLayout/Pagelayout';
import { UserContext} from './contexts/UserContextWrapper';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from './constants/constants';
import { Attendees } from './views/Attendees/Attendees';
import { Login } from './views/Login/Login';
import { Register } from './views/Register/Register';
import { NotFound } from './views/NotFound/NotFound';

function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, email } = data;
          setUser({ id, email });
          navigate('/');
        }
      });
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Attendees />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  )

};

export default App;
