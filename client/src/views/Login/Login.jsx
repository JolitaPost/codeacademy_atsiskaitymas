import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";

const LoginContainer = styled.div`
    align-items: center;
    background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D );
    display: flex;
    height: 100vh;
    justify-content: center;
    height: 100vh;
`;

const LinkStyled = styled(Link)`
    align-self: center;
    color: white;
    font-size: 18px;
    font-weight: 400;
    padding: 10px;
    text-decoration: none; 
`;

const LabelStyled = styled.label`
    color: white;
    font-size: 16px;
    font-weight: 400;
    padding: 0.25rem 0;
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

const ErrorStyled = styled.div`
    color:red;
    text-align: center;
`;

const TitleStyled = styled.h1`
    color: white;
    align-self: center;
`;

const EventTitleStyled = styled.h1`
    align-self: center;
    color: #7439db;
`;


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
                    placeholder="youremail@gmail.com" 
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <LabelStyled htmlFor="password">Password</LabelStyled>
                <Input
                    placeholder="**********"
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