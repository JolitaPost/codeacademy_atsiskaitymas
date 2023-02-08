import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";
import { LoginContainer, LinkStyled, LabelStyled, FormStyled, ErrorStyled, TitleStyled, EventTitleStyled } from "../../components/StyledViews/LoginStyled";

export const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoading("true");

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail,
                userPassword
            })
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Incorrect username or password');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
            
        })
        .then((data) => {
            const { id, userEmail, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, userEmail });
            setIsLoading(false);
            setError('');
            navigate('/');
         })
         .catch((e) => {
            setError(e.message);
            setIsLoading(false);
         })
    }

    return (
        <LoginContainer>
             <FormStyled onSubmit={handleLogin} disabled={isLoading} column>
                <EventTitleStyled>EVENT ORGANIZER</EventTitleStyled>
                <TitleStyled>Login</TitleStyled>
                <LabelStyled htmlFor="email">Email</LabelStyled>
                <Input 
                    placeholder="youremail@gmail.com" required
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <LabelStyled htmlFor="password">Password</LabelStyled>
                <Input
                    placeholder="**********" required
                    type="password" 
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                />
                {error &&<ErrorStyled>{error}</ErrorStyled>}
                <Button>Log In</Button>
                <LinkStyled to="/register">Don't have an account? Register here.</LinkStyled>
            </FormStyled>    
        </LoginContainer>   
    );
}