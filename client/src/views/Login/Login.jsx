import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
//import { FormStyled } from "../../components/Form/Form";
import { Form } from "../../components/Form/Form";
//import { LinkStyled, LoginContainer } from "../../components/StyledComponents/LoginStyled";
import { Input } from "../../components/Input/Input";
import styled from 'styled-components';
import { LOCAL_STORAGE_JWT_TOKEN_KEY } from "../../constants/constants";
import { UserContext } from "../../contexts/UserContextWrapper";

const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    height: 100vh;
    justify-content: center;
    height: 100vh;
`;
const LinkStyled = styled(Link)`
    align-self: center;
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


export const Login = () => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = () => {
        setIsLoading(true);

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
            const { id, email, token } = data;
            localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN_KEY, token);
            setUser({ id, email });
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
                <h1>Events organizer</h1>
                <Input 
                    placeholder="Email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                />
                {error &&<ErrorStyled>{error}</ErrorStyled>}
                <Button>Login</Button>
                <LinkStyled to="/register">Register</LinkStyled>
            </FormStyled>    
        </LoginContainer>   
    );
}