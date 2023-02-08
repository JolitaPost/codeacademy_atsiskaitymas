import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { RegisterContainer, FormStyled, EventTitleStyled, LabelStyled, TitleStyled, ErrorStyled, LinkStyled } from "../../components/StyledViews/RegisterStyled";


    export const Register = () => {
    const navigate = useNavigate();
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
            body: JSON.stringify({ userName, userSurname, userEmail, userPassword })
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
                    placeholder="name" required
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}    
                 />
                 <LabelStyled htmlFor="surname">Surname</LabelStyled>
                <Input
                    placeholder="surname" required
                    onChange={(e) => setUserSurname(e.target.value)}
                    value={userSurname}    
                />
                <LabelStyled htmlFor="email">Email</LabelStyled>
                <Input
                    placeholder="youremail@gmail.com" reguired
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                />
                <LabelStyled htmlFor="password">Password</LabelStyled>
                <Input
                    placeholder="********" required
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