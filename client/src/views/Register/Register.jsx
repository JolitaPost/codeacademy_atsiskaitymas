import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
//import { LinkStyled, RegisterContainer } from "../../components/StyledComponents/RegisterStyled";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";
import styled from 'styled-components';

const RegisterContainer = styled.div`
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

    export const Register = () => {
    const navigate = useNavigate();
    const [ userName, setUserName ] = useState();
    const [ userSurname, setUserSurname ] = useState();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState;
    const [isLoading, setIsLoading] = useState(false);


    const handleRegister = () => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userEmail, userPassword })
         }) 
            .then((res) => {
                if (res.status === 400) {
                    throw new Error('User already exists');
                }

                if (!res.ok) {
                    throw new Error('Something went wrong');
                }

                return res.json();
            })

            .then((data) => {
                navigate('/login');
                setIsLoading(false);
                setError('');
            })
            .catch((e) => {
                setError(e.message);
                setIsLoading(false);
            })
    };

    return (
        <RegisterContainer>
            <FormStyled onSubmit={handleRegister} disabled={isLoading} column>
                <h1>Register</h1>
                <Input
                    placeholder="Name"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}    
                 />
                <Input
                    placeholder="Surname"
                    onChange={(e) => setUserSurname(e.target.value)}
                    value={userSurname}    
                />
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
                {error && <ErrorStyled>{error}</ErrorStyled>}       
                <Button>Register</Button>
                <LinkStyled to="/login">Login</LinkStyled>
            </FormStyled>
        </RegisterContainer>
    );
}