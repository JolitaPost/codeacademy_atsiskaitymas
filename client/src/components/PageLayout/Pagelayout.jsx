import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextWrapper";
import { Header } from "../Header/HeaderStyled";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from '../../constants/constants';
import { Image, Icons, LogoutButton } from "../Header/HeaderStyled";
import { FaGithub, FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";

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
                <img src={process.env.PUBLIC_URL + "/Cute_Cloud.png"} width="60"alt="logo" />
                <Icons href="https://renginiai.kasvyksta.lt/kaunas" target="_blank" rel="noreferrer">
                     <Image src={process.env.PUBLIC_URL + "/events.png"} width="120" />
                </Icons>
                <Icons href="https://github.com" target="_blank" rel="noreferrer">
                     <FaGithub size="2em" color="lightblue"/>
                </Icons>
                <Icons href="https://facebook.com" target="_blank" rel="noreferrer">
                     <FaFacebook size="2em" color="lightblue"/>
                </Icons>
                <Icons href="https://instagram.com" target="_blank" rel="noreferrer">
                     <FaInstagram size="2em" color="lightblue"/>
                </Icons>
                <Icons href="https://Tiktok.com" target="_blank" rel="noreferrer">
                     <FaTiktok size="2em" color="lightblue"/>
                </Icons>
                <LogoutButton onClick={handleLogout}>Log out</LogoutButton>                
            </Header>
            <Outlet />
        </div>
    )
};