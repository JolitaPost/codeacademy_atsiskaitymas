import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { FormStyled } from "../../components/Form/Form";
import { Form } from "../../components/Form/Form";
import { LinkStyled, LoginContainer } from "../../components/StyledComponents/LoginStyled";
import { Input } from "../../components/Input/Input";

export const Login = ({ onSuccess }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

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
            onSuccess(data);
            setIsLoading(false);
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
                {error &&<div>{error}</div>}
                <Button>Login</Button>
                <LinkStyled to="/register">Register</LinkStyled>
            </FormStyled>    
        </LoginContainer>   
    );
}