import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../components/Button/Button";
import { LinkStyled, RegisterContainer } from "../../components/StyledComponents/RegisterStyled";
import { Form, FormStyled } from "../../components/Form/Form";
import { Link } from "../../components/StyledComponents/LoginStyled";
import { Input } from "../../components/Input/Input";


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
            body: JSON.stringify({
                userName,
                userSurname,
                userEmail,
                userPassword
            })
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
                {error && <div>{error}</div>}       
                <Button>Register</Button>
                <LinkStyled to="/login">Login</LinkStyled>
            </FormStyled>
        </RegisterContainer>
    );
}