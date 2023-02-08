import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import { Button } from '../Button/Button';
import { Header } from "../StyledComponents/HeaderStyled";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';


    

export const PageLayout = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user) {
        return <Navigate to="/login" />
    }

    const handleLogout = () => {
        localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
        setUser(null);
        navigate('/login');
    }

    return (
        <div>
            <Header>
                <img src={process.env.PUBLIC_URL + "/Cute_Cloud.png"} width="60" alt="logo" />
                
                <Button onClick={handleLogout}>Log out</Button>                
            </Header>
            <Outlet />
        </div>
    )
};