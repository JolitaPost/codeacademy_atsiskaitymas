import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { FormStyled } from "../../components/Form/Form";
import { LinkStyled, LoginContainer } from "../../components/StyledComponents/LoginStyled";
import { InputStyled } from "../../components/Input/Input";

export const Login = ({ onSuccess }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
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
        .then((res) => res.json())
        .then((data) => {
            onSuccess(data);
            console.log(data);
        })
        .catch((e)=> {
            console.log(e);
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
                />
                <InputStyled
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                />
                <Button>Login</Button>
                <LinkStyled to="/register">Register</LinkStyled>
            </FormStyled>    
        </LoginContainer>   
    );
}