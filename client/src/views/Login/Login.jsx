import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { FormStyled } from "../../components/Form/Form";
import { LinkStyled, LoginContainer } from "../../components/StyledComponents/LoginStyled";
import { InputStyled } from "../../components/Input/Input";

export const Login = ({ onSuccess }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
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
            if (res.status === 200) {
                return res.json();
            }

            throw new Error('Test error');
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
         })
         .catch((e) => {
            setError(String(e));
            setIsLoading(false);
         })
    }

    return (
        <LoginContainer>
             <FormStyled onSubmit={handleLogin} >
                <h1>Events organizer</h1>
                <InputStyled 
                    placeholder="Email"
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    disabled={isLoading}
                />
                <InputStyled
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                    disabled={isLoading}
                />
                {error &&<div>{error}</div>}
                <Button disabled={isLoading}>Login</Button>
                <LinkStyled to="/register">Register</LinkStyled>
            </FormStyled>    
        </LoginContainer>   
    );
}