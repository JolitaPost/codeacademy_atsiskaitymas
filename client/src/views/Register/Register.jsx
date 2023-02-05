import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";


const RegisterContainer = styled.div`
    align-items: center;
    background-image: linear-gradient(79deg, #7439db, #C66FBC 48%, #F7944D );
    display: flex;
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
    color: red;
    text-align: center;
`;

const TitleStyled = styled.h1`
    align-self: center;
    color: white;   
`;

const EventTitleStyled = styled.h1`
    align-self: center;
    color: #7439db;
`;

    export const Register = () => {
    const navigate = useNavigate('');
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [error, setError] = useState('');
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
                <EventTitleStyled>EVENT ORGANIZER</EventTitleStyled>
                <TitleStyled>Register</TitleStyled> 
                <LabelStyled htmlFor="name">Name</LabelStyled>
                <Input
                    placeholder="name" 
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}    
                 />
                 <LabelStyled htmlFor="surname">Surname</LabelStyled>
                <Input
                    placeholder="surname" 
                    onChange={(e) => setUserSurname(e.target.value)}
                    value={userSurname}    
                />
                <LabelStyled htmlFor="email">Email</LabelStyled>
                <Input
                    placeholder="youremail@gmail.com" 
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <LabelStyled htmlFor="password">Password</LabelStyled>
                <Input
                    placeholder="********"
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                     value={userPassword}
                /> 
                {error && <ErrorStyled>{error}</ErrorStyled>}       
                <Button>Register</Button>
                <LinkStyled to="/login">Already have an account? Login here.</LinkStyled>
            </FormStyled>
        </RegisterContainer>
    );
}